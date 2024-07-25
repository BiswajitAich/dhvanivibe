"use client"
import React, { useContext } from 'react';
import style from './sidebar.module.css'
import { PagePathContext } from '../context/PathContextProvider';
import useCustomNavigation from '@/app/js/useCustomNavigation';
// interface Props {
// view: (view: string) => void
// handleGrid: (showBenuBar: boolean) => void
// }
const SideBar = () => {
    // const SideBar: React.FC<Props> = ({ handleGrid }) => {
    const { showBenuBar, setShowBenuBar } = useContext<any>(PagePathContext)
    const { navigate } = useCustomNavigation();

    // useEffect(() => {
    //     handleGrid(showBenuBar)
    // }, [showBenuBar, handleGrid])

    const handleDisplayMenuBar = () => {
        setShowBenuBar(false);
    };

    return (
        <div className={`${style.sideBar} ${showBenuBar ? style.slideIn : style.slideOut}`}>
            <div className={style.container}>
                <button className={style.close} onClick={handleDisplayMenuBar}
                    style={{
                        borderRadius: "40px",
                        background: "transparent",
                        border: "2px solid #007f63"
                    }}><span>&#10148;</span>CLOSE</button>
                <button onClick={() => navigate("forth", "home")}>Home</button>
                <button onClick={() => navigate("forth", "saved-songs")}>Saved Songs</button>
                <button >.....</button>
            </div>
        </div>
    );
}

export default SideBar;