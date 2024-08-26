import React, {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";
import serverUrl from "../../utils/GetServerLink.jsx";
import axios from "axios";
import {useSelector} from "react-redux";

function UserPage() {
    const {auth} = useSelector(state => state.auth);

    const [users, setUsers] = useState([]);
    const [paginationLinks, setPaginationLinks] = useState([]);
    const [setPageTitle] = useOutletContext();
    const [page, setPage] = useState(0);


    const loadUsers = async () => {
        let res = await axios.get(`${serverUrl}/api/admin/users`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${auth.token}`
            }
        });

        if (res.data.message === "success") {
            setUsers(res.data.data.users);
        }
    }

    const fetchNextPrevTasks = (link) => {
        const url = new URL(link);
        setPage(url.searchParams.get('page'));
        loadUsers()
    }

    useEffect(() => {
        setPageTitle("Users");
        loadUsers();
    }, [])
    return (
        <>
            <div className="container bg-gray-800 text-white w-full h-min-screen  overflow-h-auto p-5 rounded">
                <div className="overflow-x-auto mt-10 mx-auto w-2/3 overflow-hidden">
                    <div>
                        Total: { users.length }
                    </div>
                    <table className="min-w-full bg-white  overflow-h-auto">
                        <thead className={"bg-gray-100"}>
                        <tr className={"bg-gray-100"}>
                            <th className="px-6 py-3 border-b-2 border-gray-300 dark:border-gray-600 text-left text-xs font-semibold text-gray-900 dark:text-gray-900 uppercase tracking-wider">
                                #ID
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 dark:border-gray-600 text-left text-xs font-semibold text-gray-900 dark:text-gray-900 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 dark:border-gray-600 text-left text-xs font-semibold text-gray-900 dark:text-gray-900 uppercase tracking-wider">
                                Average Score
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 dark:border-gray-600 text-left text-xs font-semibold text-gray-900 dark:text-gray-900 uppercase tracking-wider">
                                Quiz Taken
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 dark:border-gray-600 text-left text-xs font-semibold text-gray-900 dark:text-gray-900 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className={"dark:bg-gray-700"}>
                        {
                            users.map((user, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                        {user?.id}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                        {user?.name}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                        { user?.scores?.reduce((total, e) => {return total + e.score}, 0) / user?.scores.length ?? 1 }
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                        { user?.scores.length }
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                        {
                                            user.status == "active" &&
                                            <button className={"p-2 rounded bg-green-500 text-white"}>
                                                Suspend
                                            </button>
                                        }
                                        {
                                            user.status == "inactive" &&
                                            <button className={"p-2 rounded bg-green-500 text-white"}>
                                                Activate
                                            </button>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default UserPage;
