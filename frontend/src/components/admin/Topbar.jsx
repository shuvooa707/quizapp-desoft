import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setAuth,} from "../../stores/slices/AuthSlice.jsx";
import LocalStorageService from "../../services/LocalStorageService.jsx";

function Header() {

    const navigate = useNavigate();
    const {auth,} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
        setLoggedIn(auth != null)
    }, [auth]);


    const logout = () => {
        dispatch(setAuth(null));
        LocalStorageService.remove("desoft_auth")
        navigate('/admin/login');
    }
    return (
        <>
            <nav className="bg-black shadow-gray-950 shadow-xl fixed w-full z-10 top-0 ">
                <div className="container mx-auto px-4 py-3 flex items-center">
                    <div className="text-white text-lg font-bold mr-5">
                        <Link to="/">MyApp</Link>
                    </div>
                    <div className="mx-auto">
                        {
                            loggedIn &&
                            <>
                                <Link to="/admin/login" className="text-white hover:text-gray-200 px-5">Home</Link>
                                <button onClick={logout} className="text-white hover:text-gray-200 px-5">Logout</button>
                            </>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}


export default Header;
