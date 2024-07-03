import style from "@/app/css/header.module.css"
interface props {
    topHeight: number
}
const Header: React.FC<props> = ({ topHeight }) => {
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
        </header>
    )
}
export default Header