import {useContext, useEffect} from "react";
import UserContext from "../context/UserContext";

export default function useUser() {
    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    useEffect(() => {
        const userInLocalStorage = localStorage.getItem("user");
        if (userInLocalStorage && !user) {
            setUser(JSON.parse(userInLocalStorage));
        }
    }, [])

    return {user, setUser};
}