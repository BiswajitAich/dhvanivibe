import { useContext } from "react";
import { CustomNavigationContext } from "../componets/context/CustomNavigationContextProvider";

type NavigationDirection = "back" | "forth" | "";

const useCustomNavigation = () => {
    const { navStack, setNavStack } = useContext(CustomNavigationContext);

    const getLastComponent = () => {
        return navStack[navStack.length - 1];
    };

    const navigate = (toAndFro: NavigationDirection, comp?: string) => {
        if (toAndFro === "forth" && comp) {
            setNavStack((prevStack: string[]) => {
                // Update state and history
                window.history.pushState(null, "");
                return [...prevStack, comp];
            });
        } else if (toAndFro === "back") {
            setNavStack((prevStack: string[]) => {
                // Update state and history
                if (prevStack.length > 1) {
                    window.history.back();
                    return prevStack.slice(0, -1);
                }
                return prevStack;
            });
        } else if (toAndFro === "") {
            setNavStack((prevStack: string[]) => {
                // Remove last element from stack
                if (prevStack.length > 1) {
                    return prevStack.slice(0, -1);
                }
                return prevStack;
            });
        }
    };

    return { navigate, lastComponent: getLastComponent() };
};

export default useCustomNavigation;
