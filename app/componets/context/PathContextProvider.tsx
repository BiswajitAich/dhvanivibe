"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface PagePathContextType {
  pagePath: string | null;
  setPagePath: Dispatch<SetStateAction<string | null>>;
  showBenuBar: boolean | null;
  setShowBenuBar: Dispatch<SetStateAction<boolean | null>>;
}

const initialContext: PagePathContextType = {
  pagePath: null,
  setPagePath: () => {},
  showBenuBar: null,
  setShowBenuBar: ()=>{},
};

export const PagePathContext = createContext<PagePathContextType>(initialContext);

export default function PathContextProvider({ children }: { children: ReactNode }): JSX.Element {
  const [pagePath, setPagePath] = useState<string | null>(null);
  const [showBenuBar, setShowBenuBar] = useState<boolean | null>(null);

  return (
    <PagePathContext.Provider value={{ pagePath, setPagePath, showBenuBar, setShowBenuBar }}>
      {children}
    </PagePathContext.Provider>
  );
}
