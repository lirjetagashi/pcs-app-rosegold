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
        MuiTableRow: {
            head: {
                background: 'linear-gradient(90deg, #d274a1 0%, #B76E79 40%, #d79d7a 60%, #ffc400 100%)'
            }
        },
        MuiTableSortLabel: {
            root: {
                color: '#121212',
                fontSize: "1.1em",
                '&:hover': {
                    color: '#424242 !important',
                },
                '&.MuiTableSortLabel-active': {
                    color: "#121212"
                },
                "& *": {
                    color: '#2f2f2f !important',
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
        text: {
            dark: "#121212"
        },
        type: 'dark'
    }
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: (count, error) => error.response?.status !== 401 && error.response?.status !== 403 && count < 3
        }
    }
});

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
