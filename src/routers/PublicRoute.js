import { useContext } from "react";
import { AuthContext } from "../utils/Auth/authContext";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({children}) => {
    const { user } = useContext(AuthContext);

    return user.logged
    ?
    <Navigate to = "/validation"/>
    :
    children
}
