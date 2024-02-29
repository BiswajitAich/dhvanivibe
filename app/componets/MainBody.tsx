import style from "@/app/css/mainBody.module.css"
import SearchSong from "./SearchSong"
const MainBody: React.FC = () => {
    return(
        <main className={style.main}>
            <div className={style.showPice}/>
            <SearchSong />
        </main>
    )
}
export default MainBody