import {ThemeProvider} from "@material-ui/core/styles";
import createTheme from "@material-ui/core/styles/createTheme";
import {useState} from "react";
import DarkMode from "./context/DarkMode";
import Layout from "./component/layout/Layout";

const customTheme = {
    palette: {
        primary: {
            main: '#d274a1',
            mainGradient: 'linear-gradient(90deg, #d274a1 0%, #B76E79 40%, #d79d7a 60%, #ffc400 100%)'
        },
        secondary: {
            main: '#ffc400',
        },
        type: 'dark'
    }
}

export default function App() {

    const [theme, setTheme] = useState(customTheme);

    return (
        <ThemeProvider theme={createTheme(theme)}>
            <DarkMode.Provider value={{theme, setTheme}}>
                <Layout/>
            </DarkMode.Provider>
        </ThemeProvider>
    );
}
