export { renderers } from '../renderers.mjs';

const prerender = false;
async function GET({ request, redirect, cookies }) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) {
    return new Response("Missing OAUTH_GITHUB_CLIENT_ID", { status: 500 });
  }
  const state = crypto.randomUUID();
  cookies.set("oauth_state", state, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 10
    // 10 minutos
  });
  const url = new URL(request.url);
  const host = url.origin;
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user&redirect_uri=${host}/oauth/callback/&state=${state}`;
  return redirect(githubAuthUrl);
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
