"use client"
import React from "react"
import style from "@/app/css/search.module.css"
import DisplaySearchedSong from "./DisplaySearchedSong"
import Player from "./Player"
const SearchSong: React.FC = () => {
    const [searching, setSearching] = React.useState<boolean>(false)
    const [processing, setProcessing] = React.useState<boolean>(false);
    const [dataSearching, setDataSearching] = React.useState<boolean>(false);
    const [inputValue, setInputValue] = React.useState<string>("");
    const [title, setTitle] = React.useState<string>("");
    const [errorFound, setErrorFound] = React.useState<boolean>(false);
    const [songData, setSongData] = React.useState<[] | null>(null);
    const [receivedData, setReceivedData] = React.useState<string | null>(null);


    React.useEffect(() => {
        const fetchData = async () => {
            setDataSearching(true)
            try {
                setSongData((prev) => prev = null)
                const base = window.location.origin;
                const res = await fetch(`${base}/api/searchSongId?searchSong=${inputValue}`)
                const data = await res.json()
                setSongData(data)
                console.log(data)
            } catch (error) {
                setErrorFound(true)
            } finally {
                setDataSearching(false)
                setInputValue("")
            }
        }

        if (inputValue != "") fetchData()
    }, [inputValue])

    const handleSearch = () => {
        if (processing) return;
        setSearching(prev => !prev)
        setProcessing(prev => !prev)
        setTimeout(() => {
            setProcessing(prev => !prev);
        }, 500);
    }

    const handleSearchText = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (dataSearching) return

        let inputText = (e.target as HTMLTextAreaElement).value;
        inputText = inputText.replace(/\s+/g, '');
        if (inputText != "") {
            setInputValue(inputText);
            setSearching(false)
        }

    }
    const handleDataFromChild = (data: string) => {
        setReceivedData(data);
    };
    const handelTitle = (title: string) => {
        setTitle(title);
    };
    const handleclearSongData = () => {
        setSongData(null);
    };


    return (
        <div>
            {errorFound ? (
                <div><p>Error occured while fetching data</p></div>
            ) : null}
            <div
                className={`${style.searchDiv} ${searching ? style.show : ''}`}
                style={{ minWidth: searching ? '50%' : '' }}>
                {searching ? (
                    <textarea
                        placeholder="Enter Song to Search..."
                        className={style.input}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearchText(e)
                        }}
                        maxLength={30}
                        autoFocus
                    />
                ) : null}

                {searching ? (
                    <button
                        className={style.searchIcon}
                        style={{ color: "black" }}
                        onClick={handleSearch}
                        disabled={processing}
                    >
                        X
                    </button>
                ) : (
                    <button
                        className={style.searchIcon}
                        onClick={handleSearch}
                        disabled={processing}
                    >
                        &#128269;
                    </button>
                )}
            </div>
            {songData ? (
                <DisplaySearchedSong 
                songData={songData} 
                sendSource={handleDataFromChild}
                sendTitle={handelTitle}
                clearSongData={handleclearSongData}
                />
            ) : null}
            <Player source={receivedData} title={title}/>

        </div>
    )
}
export default SearchSong