import {ThemeProvider} from "@material-ui/core/styles";
import { ReactQueryDevtools } from 'react-query/devtools'
import createTheme from "@material-ui/core/styles/createTheme";
import {useState} from "react";
import DarkMode from "./context/DarkMode";
import Layout from "./component/Layout";
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import {QueryClient, QueryClientProvider} from "react-query";
import UserContext from "./context/UserContext";

const customTheme = {
    overrides: {
        ".MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active .MuiTableSortLabel-icon": {
            color: "RED !important"
        },
        MuiTableSortLabel: {
            root: {
                "& > *": {
                    color: 'BLACK !important',
                }
            }
        },
    },
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

const queryClient = new QueryClient()

export default function App() {

    const [theme, setTheme] = useState(customTheme);
    const [user, setUser] = useState();

    return (
        <UserContext.Provider value={{user, setUser}}>
            <QueryClientProvider client={queryClient}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <ThemeProvider theme={createTheme(theme)}>
                        <DarkMode.Provider value={{theme, setTheme}}>
                            <Layout/>
                            <ReactQueryDevtools initialIsOpen={false} />
                        </DarkMode.Provider>
                    </ThemeProvider>
                </MuiPickersUtilsProvider>
            </QueryClientProvider>
        </UserContext.Provider>
    );
}
