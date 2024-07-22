"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
interface SongPageDataInitial {
  songId: string;
  img: string;
  name: string;
  singers: string[];
  size: string;
}
interface PagePathContextType {
  pagePath: string;
  setPagePath: Dispatch<SetStateAction<string>>;
  showBenuBar: boolean | null;
  setShowBenuBar: Dispatch<SetStateAction<boolean | null>>;
  pageDataInitial: SongPageDataInitial[];
  setPageDataInitial: Dispatch<SetStateAction<SongPageDataInitial[]>>;
}

const initialContext: PagePathContextType = {
  pagePath: "",
  setPagePath: () => {},
  showBenuBar: null,
  setShowBenuBar: ()=>{},
  pageDataInitial: [],
  setPageDataInitial: ()=>{}
};

export const PagePathContext = createContext<PagePathContextType>(initialContext);

export default function PathContextProvider({ children }: { children: ReactNode }): JSX.Element {
  const [pagePath, setPagePath] = useState<string>("home");
  const [showBenuBar, setShowBenuBar] = useState<boolean | null>(null);
  const [pageDataInitial, setPageDataInitial] = useState<SongPageDataInitial[]>([]);

  return (
    <PagePathContext.Provider value={{ pagePath, setPagePath, showBenuBar, setShowBenuBar, pageDataInitial, setPageDataInitial }}>
      {children}
    </PagePathContext.Provider>
  );
}
