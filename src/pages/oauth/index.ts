export const prerender = false;

export async function GET({ request, redirect, cookies }) {
    const clientId = import.meta.env.OAUTH_GITHUB_CLIENT_ID || process.env.OAUTH_GITHUB_CLIENT_ID;
    
    if (!clientId) {
        return new Response("Missing OAUTH_GITHUB_CLIENT_ID", { status: 500 });
    }

    const state = crypto.randomUUID();
    cookies.set('oauth_state', state, {
        path: '/',
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: 'lax',
        maxAge: 60 * 10 // 10 minutos
    });

    const url = new URL(request.url);
    const host = url.origin;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user&redirect_uri=${host}/oauth/callback&state=${state}`;
    
    return redirect(githubAuthUrl);
}
