import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import { setAuth } from "../stores/slices/AuthSlice.jsx";
import LocalStorageService from "../services/LocalStorageService.jsx";

const RequiredAuth = ({children}) => {
    const { auth } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("-2-")
        // load auth from localStorage
        let desoft_authString = null;
        try {
            if (!auth) {
                desoft_authString = JSON.parse(JSON.parse(LocalStorageService.get("desoft_auth")));
                dispatch(setAuth(desoft_authString));

            }
        } catch (e) {
            console.log(e)
            dispatch(setAuth(null));
        }

        if ( auth && auth.profile.role !== "admin" ) {
            dispatch(setAuth(null));
            LocalStorageService.remove("desoft_auth")
            navigate('/admin/login');
        }

        if ( auth == null && (desoft_authString == null || desoft_authString.length == 0 )) {
            navigate('/admin/login');
        }
    })

    return children;
}


export default RequiredAuth;
