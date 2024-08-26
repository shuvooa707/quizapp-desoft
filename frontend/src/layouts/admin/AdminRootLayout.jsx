import {Outlet, useNavigate} from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar.jsx";
import Header from "../../components/admin/Header.jsx";
import {useEffect, useState} from "react";
import Topbar from "../../components/admin/Topbar.jsx";
import {useDispatch, useSelector} from "react-redux";

function AdminRootLayout() {

    const navigate = useNavigate();
    const {auth,} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
        setLoggedIn(auth != null)
    }, [auth]);



    const [pageTitle, setPageTitle] = useState("Dashboard");
    return (
        <>
            <Topbar />
            <div className="mt-15 flex min-h-screen bg-gray-100 dark:bg-gray-900">
                {/* Sidebar */}
                {
                    loggedIn &&
                    <Sidebar />
                }

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <Header pageTitle={pageTitle} />

                    <main>
                        <Outlet context={[setPageTitle]} />
                    </main>
                </div>
            </div>
        </>
    )
}


export default AdminRootLayout
