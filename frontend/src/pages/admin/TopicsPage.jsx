import React, {useEffect, useState} from "react";
import axios from "axios";
import serverUrl from "../../utils/GetServerLink.jsx";
import {Link, useOutletContext} from "react-router-dom";
import {useSelector} from "react-redux";

function TopicsPage() {
    const {auth} = useSelector(state => state.auth);

    const [topics, setTopics] = useState([]);
    const [setPageTitle] = useOutletContext();

    const loadTopics = async () => {
        let res = await axios.get(`${serverUrl}/api/admin/topics`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${auth.token}`
            }
        });

        if (res.data.message === "success") {
            setTopics(res.data.data.topics);
        }
    }


    useEffect(() => {
        setPageTitle("Users");
        loadTopics();
    }, [])

    return (
        <>
            <div className="container bg-gray-800 text-white w-full h-min-screen  overflow-h-auto p-5 rounded">
                <div>
                    <Link to={"/admin/topics/create"} className={"p-2 px-5 rounded shadow-xl bg-orange-700 text-white"}>
                        Create New +
                    </Link>
                </div>
                <div className="overflow-x-auto mt-10 mx-auto w-2/3 overflow-hidden">
                    <div>
                        Total: {topics.length}
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
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className={"dark:bg-gray-700"}>
                        {
                            topics.map((topic, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                        {topic?.id}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                        {topic?.name}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                        {
                                            topic.status == "active" &&
                                            <button className={"p-2 rounded bg-green-500 text-white"}>
                                                Suspend
                                            </button>
                                        }
                                        {
                                            topic.status == "inactive" &&
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

export default TopicsPage;
