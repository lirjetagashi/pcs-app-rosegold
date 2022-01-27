import {useContext} from "react";
import DarkMode from "../context/DarkMode";

export default function useDarkMode() {

    const {theme, setTheme} = useContext(DarkMode);
    const type = theme.palette?.type;

    return () => {
        setTheme({
            ...theme,
            palette: {
                ...theme.palette,
                type: type === 'light' ? 'dark' : 'light'
            }
        })
    }
};