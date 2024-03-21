import {Outlet, Navigate, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {useEffect} from "react";

const PrivateRoute = ({children}) => {
    const navigate = useNavigate();
    const token = Cookies.get('token-scanner')
    useEffect(() => {
        if (token === undefined) {
            navigate('/login', {replace: true})
        }
        console.log(navigate.name, 'navigate')
    },[navigate, token])

    return children
};

export default PrivateRoute;
