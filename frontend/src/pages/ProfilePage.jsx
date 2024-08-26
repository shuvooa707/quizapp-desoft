import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import moment from "moment";

const ProfilePage = () => {

    const {auth} = useSelector(state => state.auth);
    const [profile, setProfile] = useState(auth?.profile);

    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        setQuizzes(profile?.quizzes ?? [])
    }, [auth]);

    return (
        <div className="min-h-screen p-6  bg-gray-100 dark:bg-gray-900">
            {/* Profile Section  */}
            <div className="bg-white mx-auto mt-16 dark:bg-gray-800 shadow-xl rounded-lg w-full max-w-3xl p-8">
                <div className="flex justify-between">
                    <div>
                        <img
                            className="w-32 h-32 rounded-full shadow-md"
                            src={profile?.image ?? "https://via.placeholder.com/150"}
                            alt="Profile"
                        />
                        <h2 className="my-3 text-3xl font-semibold text-gray-800 dark:text-gray-200">
                            {profile?.name}
                        </h2>
                    </div>
                    <div className={""}>
                        <div className="flex justify-center items-center w-36 h-36 rounded-full border-[1em] border-orange-800 bg-white">
                            <strong className={"text-3xl text-blue-900"}>
                                {profile?.score}%
                            </strong>
                        </div>
                        <div className={"mt-2 text-gray-400 font-bold text-center"}>
                            Score
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">Profile Details</h3>
                    <div className="mt-4">
                        <div className="flex justify-between text-gray-700 dark:text-gray-300">
                            <span className="font-medium">Email:</span>
                            <span>{profile?.email}</span>
                        </div>
                        <div className="flex justify-between text-gray-700 dark:text-gray-300 mt-2">
                            <span className="font-medium">Joined:</span>
                            <span>{profile?.created_at}</span>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <button
                        className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
            {/* End Profile Section  */}

            <div className={"bg-white mx-auto mt-5 p-5 dark:bg-gray-800 text-white shadow-xl rounded-lg w-full max-w-3xl"}>
                <h3 className={"text-2xl font-bold"}>
                    Quiz Taken
                    <span className={"inline-block bg-red-700 text-white mx-2 text-xs mr-2 px-2 py-1 rounded"}>
                        {quizzes.length}
                    </span>
                </h3>

                {
                    quizzes.map((quiz, i) => {
                        return (
                            <div key={i} className={"mt-2 text-gray-400 font-bold"}>
                                <div className="rounded-md overflow-hidden my-3 shadow-lg bg-white dark:bg-gray-700">
                                    <div className="p-3">
                                        <div className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-200">
                                            {quiz.title}
                                        </div>
                                        <div className={""}>
                                            <div className={"w-full m-1"}>
                                                <div className="m-1 inline-block bg-red-700 text-white text-xs px-2.5 py-1 rounded">
                                                    Score: {quiz.pivot.score}%
                                                </div>
                                                <div className="m-1 inline-block bg-green-700 text-white text-xs px-2.5 py-1 rounded">
                                                    Correct: {quiz.pivot.correct_answers_count}/{quiz.pivot.questions_count}
                                                </div>
                                            </div>
                                            <div className="inline-block bg-blue-800 text-white text-xs mr-2 px-2.5 py-1 rounded">
                                                Taken At: {moment(quiz.pivot.created_at).format("MMMM Do YYYY, h:mm:ss a")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    );
};

export default ProfilePage;
