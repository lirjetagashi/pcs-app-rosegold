import useUser from "../../hooks/useUser";

export default function BookPage({}) {

    const{user, setUser} = useUser()

    return (
        <>
            {user && user.role === "MEMBER" ?
                <p>
                    Book here! You are a member.
                </p>
                :
                <p>This page is authorized for members only. Please sign up in order to book our services.</p>
            }
        </>
    );
}