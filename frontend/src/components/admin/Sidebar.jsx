import {Link, useLocation} from "react-router-dom";

function Sidebar() {
    const {pathname} = useLocation();

    return (
        <aside className="w-64 bg-white dark:bg-gray-800 p-6">
            <div className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-6">
                De Quiz
            </div>
            <nav>
                <ul>
                    <li className={` ${pathname === "/admin/dashboard" ? "bg-gray-500" : "" } mb-2`}>
                        <Link to="/admin/dashboard" className="block p-3 rounded text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                            Dashboard
                        </Link>
                    </li>
                    <li className={` ${pathname === "/admin/users" ? "bg-gray-500" : "" } mb-2`}>
                        <Link to="/admin/users" className="block p-3 rounded text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                            Users
                        </Link>
                    </li>
                    <li className={` ${pathname === "/admin/quizzes" ? "bg-gray-500" : "" } mb-2`}>
                        <Link to="/admin/quizzes" className="block p-3 rounded text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                            Quizzes
                        </Link>
                    </li>
                    <li  className={` ${pathname === "/admin/topics" ? "bg-gray-500" : "" } mb-2`}>
                        <Link to="/admin/topics" className="block p-3 rounded text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                            Topics
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar;
