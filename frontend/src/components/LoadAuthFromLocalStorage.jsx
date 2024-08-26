import {useEffect} from "react";
import LocalStorageService from "../services/LocalStorageService.jsx";
import {setAuth} from "../stores/slices/AuthSlice.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function LoadAuthFromLocalStorage({children}) {
    const {auth} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        // load auth from localStorage
        try {
            let desoft_authString = JSON.parse(JSON.parse(LocalStorageService.get("desoft_auth")));
            dispatch(setAuth(desoft_authString));
            console.log("-1-")
        } catch (e) {
            console.info(e)
            dispatch(setAuth(null));
        }
    }, []);
    return children;
}


export default LoadAuthFromLocalStorage;
