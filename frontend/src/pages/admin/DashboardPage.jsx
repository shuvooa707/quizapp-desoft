import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import serverUrl from "../../utils/GetServerLink.jsx";

function DashboardPage() {

    const {auth} = useSelector(state => state.auth);

    const [overlayLabel, setOverlayLabel] = useState("");
    const [showOverlay, setShowOverlay] = useState(false);
    const [performers, setPerformers] = useState([
        {rank: 903, name: "Anik", "average_score": 21, quiz_taken: 21}
        // Add more rows as needed
    ]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalQuizzes, setTotalQuizzes] = useState(0);
    const [totalTopics, setTotalTopics] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [totalQuizzesTaken, setTotalQuizzesTaken] = useState(0);

    const dashboardInit = async () => {
        await axios.get(`${serverUrl}/api/admin/dashboard/init`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${auth.token}`
            }
        })
            // .then(res => res.json())
            .then(res => {

                if (res.data.message == "success") {
                    // setQuiz(res.data.data.quiz);
                    setPerformers(res.data.data.performers)
                    setTotalUsers(res.data.data.totalUsers)
                    setTotalQuizzes(res.data.data.totalQuizzes)
                    setTotalTopics(res.data.data.totalTopics)
                    setTotalQuestions(res.data.data.totalQuestions)
                    setTotalQuizzesTaken(res.data.data.totalQuizzesTaken)
                    setShowOverlay(false);
                }
            })
            .catch(console.log);
    }

    useEffect(() => {
        dashboardInit();
        console.log(auth)
    }, [])


    return (
        <>
            <div className="container bg-gray-800 text-white w-full h-min-screen p-5 rounded">
                <div className="flex items-center justify-around">
                    <div className="w-56 p-2 rounded bg-gray-200 text-black">
                        <span className={"text-xl"}>Total Users</span> <br/>
                        <strong className={"text-3xl"}>
                            { totalUsers }
                        </strong>
                    </div>
                    <div className="w-56 p-2 rounded bg-gray-200 text-black">
                        <span className={"text-xl"}>Total Quizzes </span> <br/>
                        <strong className={"text-3xl"}>
                            { totalQuizzes }
                        </strong>
                    </div>
                    <div className="w-56 p-2 rounded bg-gray-200 text-black">
                        <span className={"text-xl"}>Total Topics </span> <br/>
                        <strong className={"text-3xl"}>
                            { totalTopics }
                        </strong>
                    </div>
                    <div className="w-56 p-2 rounded bg-gray-200 text-black">
                        <span className={"text-xl"}>Total Questions </span> <br/>
                        <strong className={"text-3xl"}>
                            { totalQuestions }
                        </strong>
                    </div>
                    <div className="w-56 p-2 rounded bg-gray-200 text-black">
                        <span className={"text-xl"}>Total Quizzes Taken</span> <br/>
                        <strong className={"text-3xl"}>
                            { totalQuizzesTaken }
                        </strong>
                    </div>
                </div>

                <div className={"bg-gray-900  mt-10"}>
                    <span className={"p-3 inline-block text-3xl bg-black text-white"}>Leader Board</span>
                    <table className="min-w-full bg-white">
                        <thead className={"bg-gray-800"}>
                        <tr className={"bg-gray-100"}>
                            <th className="px-6 py-3 border-b-2 border-gray-300 dark:border-gray-600 text-left text-xs font-semibold text-gray-900 dark:text-gray-900 uppercase tracking-wider">
                                Rank
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 dark:border-gray-600 text-left text-xs font-semibold text-gray-900 dark:text-gray-900 uppercase tracking-wider">
                                Performer
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 dark:border-gray-600 text-left text-xs font-semibold text-gray-900 dark:text-gray-900 uppercase tracking-wider">
                                Average Score
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 dark:border-gray-600 text-left text-xs font-semibold text-gray-900 dark:text-gray-900 uppercase tracking-wider">
                                Quiz Taken
                            </th>
                        </tr>
                        </thead>
                        <tbody className={"dark:bg-gray-700"}>
                        {
                            performers.map((performer, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                    <span className={"p-2 py-1 rounded bg-white text-gray-950"}>
                                        {performer?.rank}
                                    </span>
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                    <span className={"p-2 py-1 rounded bg-white text-indigo-950"}>
                                        {performer?.user?.id == auth?.profile?.id ? "You" : performer?.user?.name}
                                    </span>
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                    <span className={"p-2 py-1 rounded bg-white text-blue-950"}>
                                    {Math.floor(performer?.avg_score)}
                                    </span>
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                    <span className={"p-2 py-1 rounded bg-white text-red-950"}>
                                    {performer?.count}
                                    </span>
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

export default DashboardPage;
