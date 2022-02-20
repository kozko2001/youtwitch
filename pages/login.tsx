import type { NextPage } from 'next'

// https://dev.twitch.tv/docs/authentication/getting-tokens-oauth#oauth-implicit-code-flow
// https://blog.twitch.tv/en/2019/11/06/twitch-authentication-understanding-which-protocol-and-flow-is-right-for-you/

const clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
const redirectUrl = process.env.NEXT_PUBLIC_TWITCH_REDIRECT_URL;
const scope = "user:read:follows"
import Header from '../components/Header'

const Login: NextPage = () => {
    const url = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=token&scope=${scope}`;
    return (
        <div className='container mx-auto'>
            <Header />
            <div className="grid gap-4 grid-cols-6 items-center justify-between bg-teal p-6">
                <div className='col-start-2 col-end-6 py-10'>
                    <p>
                        YouTwitch is a experiment webpage. You can see all the videous of the streamers you followed as a list. To load the data we need you to log-in into Twitch. You can take a look to the whole 
                    </p>
                </div>

                <a href={url} className="w-full col-start-3 col-end-5 text-center items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">Login into twitch</a>
            </div>
        </div>
    )
}

export default Login
