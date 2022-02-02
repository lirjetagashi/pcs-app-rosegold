import {useContext, useEffect} from "react";
import UserContext from "../context/UserContext";
import {useNavigate} from "react-router-dom";

export default function useUser() {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else if (localStorage.getItem("user")) {
            localStorage.removeItem("user");
            navigate("/sign-in");
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