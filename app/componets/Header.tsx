import style from "@/app/css/header.module.css"

const Header: React.FC = () => {
    return (
        <header className={style.header}>
            <div className={style.headDiv}>
                <h1>Free Music Streaming App</h1>
                <h3>Dhvanivibe</h3>
            </div>
        </header>
    )
}
export default Header