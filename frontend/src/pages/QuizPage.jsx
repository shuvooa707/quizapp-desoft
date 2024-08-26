import React, {useEffect, useState} from "react";
import {Link, useParams, useSearchParams} from "react-router-dom";
import serverUrl from "../utils/GetServerLink.jsx";
import {useSelector} from "react-redux";
import axios from "axios";
import Question from "../components/Question.jsx";
import Overlay from "../layouts/Overlay.jsx";
import ResultQuestion from "../components/ResultQuestion.jsx";

function QuizzesPage() {

    const {quizId} = useParams();
    const {auth} = useSelector(state => state.auth);
    const [searchParams, setSearchParams] = useSearchParams();
    let [goback, setGoback] = useState();

    const [quiz, setQuiz] = useState({});
    const [quizStart, setQuizStart] = useState(false)
    const [showOverlay, setShowOverlay] = useState(false)
    const [ticks, setTicks] = useState(new Map());
    const [showResults, setShowResults] = useState(false);
    const [result, setResult] = useState({});
    const [overlayLabel, setOverlayLabel] = useState("");

    const loadQuiz = async () => {
        return await fetch(`${serverUrl}/api/quizzes/${quizId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${auth.token}`
            }
        }).then(res => res.json());
    }

    const handleStartQuiz = async () => {

        setOverlayLabel("Starting Quiz...");
        setShowOverlay(true)
        setQuizStart(true)
        await axios.get(`${serverUrl}/api/quizzes/${quizId}/start`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${auth.token}`
            }
        })
            // .then(res => res.json())
            .then(res => {
                console.log(res.data.data.quiz)
                if (res.data.message == "success") {
                    setQuiz(res.data.data.quiz);
                    setQuizStart(true)
                    setShowOverlay(false)
                }
            })
            .catch(console.log);
    }

    const handleSubmitQuiz = async () => {
        console.log([...ticks.entries()])
        setQuizStart(true);
        setOverlayLabel("Submitting...");
        setShowOverlay(true)
        await axios.post(`${serverUrl}/api/quizzes/${quizId}/submit`, {
            "answers": [...ticks.entries()]
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${auth.token}`
            }
        })
            // .then(res => res.json())
            .then(res => {
                console.log(res.data.data.quiz)
                if (res.data.message == "success") {
                    // setQuiz(res.data.data.quiz);
                    setQuizStart(false);
                    setShowResults(true);
                    setShowOverlay(false);
                    setResult(res.data.data.result)
                    window.scrollTo(0, 0);
                }
            })
            .catch(console.log);

    }


    const handleTick = (qId, aId) => {
        let ticksTmp = ticks;
        ticksTmp.set(qId, aId);
        setTicks(ticksTmp);
    }


    useEffect(() => {
        setOverlayLabel("Loading Quiz...")
        setShowOverlay(true)
        loadQuiz()
            .then(res => {
                if (res.message === "success") {
                    setQuiz(res.data.quiz);
                    setShowOverlay(false)
                }
            });

        setGoback(searchParams.get("goback"));
        console.log(goback)
    }, [])


    return (
        <>
            {
                showOverlay &&
                <Overlay label={overlayLabel} />
            }
            <div className="min-h-screen pt-20 dark:bg-gray-950">
                {
                    !quizStart && !showResults &&
                    <div className={"w-1/3 mx-auto p-3 bg-gray-100 dark:bg-gray-900"}>
                        <div className={"text-end"}>
                            <Link to={`${ goback ? "/quizzes/" + goback : "/" }`} className={"py-2 px-4 bg-blue-500 text-white"}>
                                Go Back
                                <i className="fa-solid fa-person-walking-arrow-loop-left mx-2"></i>
                            </Link>
                        </div>
                        <h1 className={"text-white w-full text-3xl"}>
                            {quiz.title}
                        </h1>
                        <h1 className={"text-gray-500 w-full text-md"}>
                            {quiz.description}
                        </h1>
                        <h1 className={"mt-3 flex justify-between text-gray-50 w-full text-2xl"}>
                        <span className={"bg-white rounded-sm text-green-600 px-2"}>
                            <i className="fa-solid fa-clipboard-question"></i> {quiz?.questions?.length} Question
                        </span>
                            <button onClick={handleStartQuiz} className={"text-2xl bg-orange-700 text-white py-1 px-4"}>
                                START <i className="fa-solid fa-play"></i>
                            </button>
                        </h1>
                    </div>
                }


                {
                    quizStart &&
                    <div className={""}>
                        <div className="mt-2 w-1/3 mx-auto p-3 bg-gray-100 dark:bg-gray-900">
                            {
                                quiz?.questions?.map((question, i) => {
                                    return (
                                        <Question
                                            key={i}
                                            question={question}
                                            answers={question.answers ?? []}
                                            handleTick={handleTick}
                                        />
                                    )
                                })
                            }
                        </div>
                        <div className="mt-2 w-1/3 mx-auto p-3 bg-gray-100 dark:bg-gray-900">
                            <button onClick={handleSubmitQuiz} className={"bg-orange-600 w-full text-white py-2 px-5"}>SUBMIT</button>
                        </div>
                    </div>
                }
                {
                    showResults &&
                    <div className={"relative"}>
                        {/** Score Pad **/}
                        <div className={"w-1/3 mx-auto text-white p-3 bg-green-100 dark:bg-green-700"}>
                            <h1 className={"text-3xl"}>Score : { result.score.toFixed(0) }%</h1>
                            <h1 className={"text-3xl"}>Correct Answer: { result.correct_answers_count }</h1>
                        </div>
                        <div className={"w-1/3 mx-auto text-white p-3 text-end"}>
                            <Link className={"p-2 bg-orange-700 font-bold text-white"} to={"/leaderboard"}>
                                Check Leader Board
                                <i className="fa-solid fa-gauge mx-2"></i>
                            </Link>
                        </div>
                        <div className="mt-2 w-1/3 mx-auto p-3 bg-gray-100 dark:bg-gray-900 relative">
                            <div className={"w-full h-full bg-white z-10 absolute top-0 left-0 opacity-20"}></div>
                            {
                                quiz?.questions?.map((question, i) => {
                                    return (
                                        <ResultQuestion
                                            key={i}
                                            question={question}
                                            answers={question.answers ?? []}
                                            ticks={ticks}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </>
    )
}


export default QuizzesPage
