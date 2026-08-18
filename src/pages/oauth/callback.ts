export const prerender = false;

export async function GET({ request, cookies }) {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    
    const storedState = cookies.get('oauth_state')?.value;
    
    let token = null;
    let error = null;
    
    if (!state || !storedState || state !== storedState) {
        error = 'Invalid state parameter. CSRF validation failed.';
    } else {
        const clientId = import.meta.env.OAUTH_GITHUB_CLIENT_ID || process.env.OAUTH_GITHUB_CLIENT_ID;
        const clientSecret = import.meta.env.OAUTH_GITHUB_CLIENT_SECRET || process.env.OAUTH_GITHUB_CLIENT_SECRET;
        
        if (code) {
            try {
                const response = await fetch('https://github.com/login/oauth/access_token', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        client_id: clientId,
                        client_secret: clientSecret,
                        code,
                    })
                });
                const data = await response.json();
                if (data.access_token) {
                    token = data.access_token;
                } else {
                    error = data.error || data.error_description || 'Failed to get token';
                }
            } catch (e) {
                error = e.message;
            }
        } else {
            error = 'No code provided';
        }
    }
    
    const msgType = error ? 'authorization:github:error' : 'authorization:github:success';
    const payloadObj = error ? { message: error } : { provider: 'github', token };
    const fullMessage = `${msgType}:${JSON.stringify(payloadObj)}`;
    const safeMessageLiteral = JSON.stringify(fullMessage).replace(/</g, '\\u003c');
    
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Authorizing...</title>
    </head>
    <body>
      <script>
        const receiveMessage = (message) => {
          if (message.data === 'authorizing:github') {
            window.opener.postMessage(
              ${safeMessageLiteral},
              message.origin
            );
            window.removeEventListener('message', receiveMessage, false);
          }
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      </script>
    </body>
    </html>
    `;
    
    return new Response(html, {
        headers: {
            'Content-Type': 'text/html'
        }
    });
}
