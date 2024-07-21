import style from "@/app/css/header.module.css"
import Image from "next/image"
import menuBar from "@/public/menu-bar.png"
import { useContext, useEffect } from "react"
import { PagePathContext } from "./context/PathContextProvider"
interface props {
    topHeight: number
}

const Header: React.FC<props> = ({ topHeight }) => {
    const { showBenuBar, setShowBenuBar } = useContext<any>(PagePathContext)
    const handleDisplayMenuBar = () => {
        setShowBenuBar((prev: boolean) => !prev)
    }
    useEffect(() => {
        const handleResize = () => {
            setShowBenuBar(window.innerWidth > 600);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className={style.header}>
            {topHeight < 40 ?
                <div className={style.headDiv}
                    style={{
                        transform: `scale(calc(${1 + (topHeight / 80)}))`
                    }}
                >
                    <h1>Free Music Streaming App</h1>
                    <h3>Dhvanivibe</h3>
                </div>
                :
                <div className={style.headDiv2}>
                    <h3>Dhvanivibe</h3>
                </div>
            }
            {/* {showBenuBar ? */}
                <button className={style.menuBar} onClick={handleDisplayMenuBar}>
                    <Image src={menuBar} alt="Navigate" height={32} width={32} />
                </button>
                {/* : null */}
            {/* } */}
        </header>
    )
}
export default Header