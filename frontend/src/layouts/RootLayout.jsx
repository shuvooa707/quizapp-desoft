import {Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Header from "../components/Header.jsx";
import Overlay from "./Overlay.jsx"
import Preloader from "../components/Preloader.jsx";
import {useDispatch, useSelector} from "react-redux";
import "../assets/custom.css";
import {setAuth} from "../stores/slices/AuthSlice.jsx"
import LocalStorageService from "../services/LocalStorageService.jsx";

function RootLayout() {

    const [overlay, showOverlay] = useState(false);
    const [showPreloader, setShowPreloader] = useState(false);
    const [showSettings, setShowSettings] = useState(true);
    const [darkMode, setDarkMode] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {auth} = useSelector((state) => state.auth);

    const darkModeHandler = () => {
        if (!darkMode) {
            setDarkMode(true)
            document.body.classList.add('dark');
        } else {
            setDarkMode(false)
            document.body.classList.remove('dark');
        }
    }

    useEffect(() => {
        // load auth from localStorage
        try {
            if (!auth) {
                let desoft_authString = JSON.parse(JSON.parse(LocalStorageService.get("desoft_auth")));
                dispatch(setAuth(desoft_authString));
            }
        } catch (e) {
            console.log(e)
            dispatch(setAuth(null));
        }
    }, [auth]);

    return (
        <>
            {
                showPreloader && <Preloader/>
            }

            {
                overlay && (
                    <Overlay/>
                )
            }

            <div className={`${showSettings ? 'right-[-275px]' : 'right-[-0px]'} transition-all fixed top-60 right-0 w-[300px] h-[250px] rounded shadow overflow-visible`}>
				<span onClick={_ => {
                    setShowSettings(!showSettings)
                }} className={" cursor-pointer p-4 bg-black absolute top-[50%] left-[-20px] "} style={{transform: "translateY(-50%)"}}>
					{
                        !showSettings &&
                        <i className="fas fa-gear text-white shadow-gray-500 z-[99] rotate-forever "></i>
                    }
                    {
                        showSettings &&
                        <i className="fas fa-times text-white shadow-gray-500 z-[99]"></i>
                    }
				</span>
                <div className={"bg-[#121212] text-white absolute left-[25px] p-4 h-full w-full"}>
                    <div className={"text-2xl"}>
                        Mode
                    </div>
                    <div className={"text-white w-full"}>
                        <button onClick={darkModeHandler} className={"bg-[#2b2b2f] p-2 px-9 mr-2"}>LIGHT</button>
                        <button onClick={darkModeHandler} className={"bg-[#2b2b2f] p-2 px-9"}>DARK</button>
                    </div>
                </div>
            </div>

            <Header/>
            <Outlet context={{showOverlay}}/>
        </>
    )
}


export default RootLayout;
