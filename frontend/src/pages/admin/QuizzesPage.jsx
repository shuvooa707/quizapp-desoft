import {Link, useOutletContext} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import serverUrl from "../../utils/GetServerLink.jsx";
import {useSelector} from "react-redux";
import {Button} from "@chakra-ui/react";
import Swal from "sweetalert2";

function QuizzesPage() {
    const [setPageTitle] = useOutletContext();
    const {auth} = useSelector(state => state.auth);

    const [quizzes, setQuizzes] = useState([]);

    const loadQuizzes = async () => {
        let res = await axios.get(`${serverUrl}/api/admin/quizzes`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${auth.token}`
            }
        });

        if (res.data.message === "success") {
            setQuizzes(res.data.data.quizzes);
        }
    }

    const handleDelete = async quizId => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                let res = await axios.post(`${serverUrl}/api/admin/quizzes/${quizId}/delete`, {},{
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    }
                });
                console.log(res)
                if (res.data.message === "success") {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    loadQuizzes()
                } else {
                    Swal.fire({
                        title: "Deletion Failed",
                        text: "Your file has Not been deleted.",
                        icon: "error"
                    });
                }
            }
        });
    }

    useEffect(() => {
        loadQuizzes();
        setPageTitle("Quizzes");
    }, []);
    return (
        <>
            <div className="container bg-gray-800 text-white w-full h-screen p-5 rounded">
                <div>
                    <Link className={"p-2 px-5 rounded shadow-xl bg-orange-700 text-white"} to={"/admin/quizzes/create"}>
                        Create New +
                    </Link>
                </div>
                <div className={"mt-5"}>
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
                                Topic
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 dark:border-gray-600 text-left text-xs font-semibold text-gray-900 dark:text-gray-900 uppercase tracking-wider">
                                Questions
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 dark:border-gray-600 text-left text-xs font-semibold text-gray-900 dark:text-gray-900 uppercase tracking-wider">
                                Taken
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 dark:border-gray-600 text-left text-xs font-semibold text-gray-900 dark:text-gray-900 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className={"dark:bg-gray-700"}>
                        {
                            quizzes.map((quiz, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                        {quiz?.id}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                        {quiz?.title}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                        {quiz?.topic?.name}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                        {quiz?.questions.length}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                        {quiz?.takers.length}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                        {
                                            <Button onClick={_ => handleDelete(quiz.id)} className={"p-1.5 px-2 text-orange-700 shadow shadow-gray-800 bg-white rounded"}>
                                                <i className="fas fa-trash"></i>
                                            </Button>
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

export default QuizzesPage;
