"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface CustomNavigationContextType {
    navStack: string[];
    setNavStack: Dispatch<SetStateAction<string[]>>;
}

const initialContext: CustomNavigationContextType = {
    navStack: [],
    setNavStack: () => {},
};

export const CustomNavigationContext = createContext<CustomNavigationContextType>(initialContext);

export default function CustomNavigationContextProvider({ children }: { children: ReactNode }): JSX.Element {
    const [navStack, setNavStack] = useState<string[]>(["home"]);

    return (
        <CustomNavigationContext.Provider value={{ navStack, setNavStack }}>
            {children}
        </CustomNavigationContext.Provider>
    );
}
