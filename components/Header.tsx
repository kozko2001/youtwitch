import logo from '../../logo.png'
import Image from 'next/image'

const Header = () => {
    return (
        <nav className="grid gap-4 grid-cols-6 items-center justify-between bg-teal p-6">
            <div className=" text-gray-800 mr-6 text-4xl">
                <span className="font-mono font-extrabold" style={{color: '#c4302b'}}>You</span>
                <span className="font-sans font-extrabold" style={{color: '#6441A4'}}>Twitch</span>
            </div>
            <div className="col-start-6 justify-self-end">
                <a href="https://github.com/kozko2001/youtwitch" className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0">GitHub</a>
            </div>
        </nav>
    )
}

export default Header