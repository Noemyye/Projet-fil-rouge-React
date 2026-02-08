import Home from '../assets/home.svg'

export default function Panel_Right() {
    

    return (
        <section className="h-150 w-100 flex justify-start px-10">
            <div className='flex flex-col gap-3'>
                <a className="w-60 h-11 flex items-center bg-white hover:bg-rose-100 gap-6 hover:text-rose-400 rounded-sm px-3 transition-colors">
                    <img src={Home} className="h-6 w-6 "/>
                    Home
                </a>
                <a className="w-60 h-11 flex items-center bg-white hover:bg-rose-100 gap-6 hover:text-rose-400 rounded-sm px-3 transition-colors">
                    <img src={Home} className="h-6 w-6 "/>
                    Collaborate
                </a>
                <a className="w-60 h-11 flex items-center bg-white hover:bg-rose-100 gap-6 hover:text-rose-400 rounded-sm px-3 transition-colors">
                    <img src={Home} className="h-6 w-6 "/>
                    Shows
                </a>
                <a className="w-60 h-11 flex items-center bg-white hover:bg-rose-100 gap-6 hover:text-rose-400 rounded-sm px-3 transition-colors">
                    <img src={Home} className="h-6 w-6 "/>
                    Subscriptions
                </a>
                <a className="w-60 h-11 flex items-center bg-white hover:bg-rose-100 gap-6 hover:text-rose-400 rounded-sm px-3 transition-colors">
                    <img src={Home} className="h-6 w-6 "/>
                    Bookmarks
                </a>
            </div>
            <div>
                
            </div>
            <div>
                
            </div>
        </section>
    )
}

