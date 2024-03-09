import React, { createContext } from "react";
export const SongContext = createContext(null)
export default function SongContextProvuder({ children }:{children: any}) {
    const [songData, setSongData] = React.useState<[] | any | null>([]);
    const [currentSongData, setCurrentSongData] = React.useState<{} | any | null>({});

    return (
        <SongContext.Provider value={{ songData, setSongData , currentSongData, setCurrentSongData}}>
            {children}
        </SongContext.Provider>
    )
}