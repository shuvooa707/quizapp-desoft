import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import Overlay from "../layouts/Overlay.jsx";
import axios from "axios";
import serverUrl from "../utils/GetServerLink.jsx";

function LeaderboardPage() {

    const {quizId} = useParams();
    const {auth} = useSelector(state => state.auth);

    const [overlayLabel, setOverlayLabel] = useState("");
    const [showOverlay, setShowOverlay] = useState(false);
    const [performers, setPerformers] = useState([
        {rank: 903, name: "Anik", "average_score": 21, quiz_taken: 21}
        // Add more rows as needed
    ]);

    const loadPerformers = async () => {
        await axios.get(`${serverUrl}/api/leaderboard`, {
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
                    setShowOverlay(false);
                }
            })
            .catch(console.log);
    }

    useEffect(() => {
        loadPerformers();
        console.log(auth)
    }, [])


    return (
        <>
            {
                showOverlay &&
                <Overlay label={overlayLabel}/>
            }
            <div className="min-h-screen pt-10 dark:bg-gray-950">
                <div className="overflow-x-auto mt-10 mx-auto w-2/3">
                    <table className="min-w-full bg-white">
                        <thead className={"bg-gray-800"}>
                        <tr className={"bg-gray-800"}>
                            <th className="bg-gray-800 px-6 py-3 border-b-2 border-gray-300 dark:border-gray-600 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                RanK
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 dark:border-gray-600 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                Performer
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 dark:border-gray-600 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                Average Score
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 dark:border-gray-600 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                Quiz Taken
                            </th>
                        </tr>
                        </thead>
                        <tbody className={"dark:bg-gray-700"}>
                        {
                            performers.map((performer, index) => (
                            <tr key={index} className={`${performer?.user?.id == auth?.profile?.id ? 'bg-blue-400 text-white' : ''  } `}>
                                <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                    <span className={"p-2 py-1 rounded bg-white text-gray-950"}>
                                        {performer?.rank}
                                    </span>
                                </td>
                                <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                    <span className={"p-2 py-1 rounded bg-white text-indigo-950"}>
                                        {performer?.user?.id == auth?.profile?.id ? "You" : performer?.user?.name }
                                    </span>
                                </td>
                                <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                    <span className={"p-2 py-1 rounded bg-white text-blue-950"}>
                                    { Math.floor(performer?.avg_score) }
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


export default LeaderboardPage
