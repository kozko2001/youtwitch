import type { NextPage } from 'next'

// https://dev.twitch.tv/docs/authentication/getting-tokens-oauth#oauth-implicit-code-flow
// https://blog.twitch.tv/en/2019/11/06/twitch-authentication-understanding-which-protocol-and-flow-is-right-for-you/

const clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
const redirectUrl = process.env.NEXT_PUBLIC_TWITCH_REDIRECT_URL;
const scope = "user:read:follows"

const Login: NextPage = () => {
    const url = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=token&scope=${scope}`;
    return (
        <a href={url} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"> Get started </a>
    )
}

export default Login
