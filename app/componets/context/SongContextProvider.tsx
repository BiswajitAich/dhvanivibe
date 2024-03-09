"use client"
import React, { createContext, ReactNode, useState, Dispatch, SetStateAction } from "react";

interface Song {
  id: string,
  title: string,
  img: string
}

interface SongContextType {
  songData: Song[] | null;
  setSongData: Dispatch<SetStateAction<Song[] | null>>;
  currentSongData: Song | null;
  setCurrentSongData: Dispatch<SetStateAction<Song | null>>;
}

export const SongContext = createContext<SongContextType | null>({
    songData: null,
    setSongData: () => {},
    currentSongData: null,
    setCurrentSongData: () => {},
  });

interface SongContextProviderProps {
  children: ReactNode;
}

export default function SongContextProvider({ children }: SongContextProviderProps): JSX.Element {
    const [songData, setSongData] = useState<Song[] | null>(null);
    const [currentSongData, setCurrentSongData] = useState<Song | null>(null);
  
    return (
      <SongContext.Provider value={{ songData, setSongData, currentSongData, setCurrentSongData }}>
        {children}
      </SongContext.Provider>
    );
  }