import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {useEffect} from "react";

const PrivateRoute = ({children}) => {
    const navigate = useNavigate();
    const token = Cookies.get('token-scanner')

    useEffect(() => {
        const isLogin = localStorage.getItem("isLogin");

        if (token === undefined || isLogin === "0") {
            navigate('/login', {replace: true})
        }
    },[navigate, token])

    return children
};

export default PrivateRoute;