"use client"
import React, { useContext, useEffect } from 'react';
import style from './sidebar.module.css'
import { PagePathContext } from '../context/PathContextProvider';
interface Props {
    view: (view: string) => void
    handleGrid: (showBenuBar: boolean) => void
}
const SideBar: React.FC<Props> = ({ view, handleGrid }) => {
    const { showBenuBar, setShowBenuBar } = useContext<any>(PagePathContext)
    useEffect(() => {
        handleGrid(showBenuBar)
    }, [showBenuBar])
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
                <button onClick={() => view("home")}>Home</button>
                <button onClick={() => view("saved-songs")}>Saved Songs</button>
                <button >.....</button>
            </div>
        </div>
    );
}

export default SideBar;