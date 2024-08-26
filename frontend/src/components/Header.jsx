import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setAuth,} from "../stores/slices/AuthSlice.jsx";
import LocalStorageService from "../services/LocalStorageService.jsx";

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
        navigate('/login');
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
                                <Link to="/" className="text-white hover:text-gray-200 px-5">Home</Link>
                                <Link to="/profile" className="text-white hover:text-gray-200 px-5">Profile</Link>
                                <Link to="/leaderboard" className="text-white hover:text-gray-200 px-5">Leader Board</Link>
                                <button onClick={logout} className="text-white hover:text-gray-200 px-5">Logout</button>
                            </>
                        }
                        {
                            !loggedIn &&
                            <>
                                <Link to="/login" className="text-white hover:text-gray-200 px-5">Login</Link>
                                <Link to="/register" className="text-white hover:text-gray-200 px-5">Register</Link>
                            </>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}


export default Header;
