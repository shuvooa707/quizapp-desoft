import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import serverUrl from "../utils/GetServerLink.jsx";
import {useSelector} from "react-redux";

function QuizzesPage() {

    const {topicId} = useParams();
    const {auth} = useSelector(state => state.auth);

    const [quizzes, setQuizzes] = useState([]);


    const loadQuizzes = async () => {
        return await fetch(`${serverUrl}/api/quizzes?topicId=${topicId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${auth.token}`
            }
        }).then(res => res.json());
    }


    useEffect(() => {
        loadQuizzes()
            .then(res => {
                if (res.message === "success") {
                    setQuizzes(res.data.quizzes);
                }
            });
    }, [])


    return (
        <>
            <div className="min-h-screen pt-20 dark:bg-gray-950">
                <div className={"flex w-2/3 mx-auto p-3 bg-gray-100 dark:bg-gray-900"}>
                    <h1 className={"text-white w-full text-center text-3xl"}>Take a Quiz</h1>
                </div>
                <div className="w-2/3 mx-auto p-3 bg-gray-100 dark:bg-gray-900">
                    {
                        quizzes.map((quiz, i) => {
                            return (
                                <Link title={"Click to take quiz"} to={`/quizzes/${quiz.id}/start?goback=${topicId}`} key={i} className={" inline-block min-w-56 max-w-56 m-3 rounded bg-gray-800 border border-gray-600 shadow-lg shadow-gray-800 text-white"}>
                                    <div className={"p-2 bg-gray-700"}>
                                        <i className="fa-solid fa-layer-group"></i> {quiz.title}
                                    </div>
                                    <div className={"p-2 "}>
                                        <div>
                                            { quiz.description.substring(0, 30) }...
                                        </div>
                                        <button className="mt-3 py-1 px-2 text-sm font-bold rounded-md bg-orange-600 text-white hover:shadow-2xl hover:shadow-black">
                                            Take This Quiz
                                            <i className="fa-solid fa-right-long ml-2"></i>
                                        </button>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}


export default QuizzesPage
