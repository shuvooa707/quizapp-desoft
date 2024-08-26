import {Link, useOutletContext} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import serverUrl from "../../utils/GetServerLink.jsx";
import {useSelector} from "react-redux";

function EditQuizPage() {
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

    useEffect(()=>{
        loadQuizzes();
        setPageTitle("Quizzes");
    },[]);
    return (
        <>
            <div className="container bg-gray-800 text-white w-full h-screen p-5 rounded">
                <div>
                    <Link className={"p-2 px-5 rounded shadow-xl bg-blue-700 text-white"} to={"/admin/quizzes"}>
                        Back
                    </Link>
                </div>
                <div className={"mt-5"}>

                </div>
            </div>
        </>
    )
}

export default EditQuizPage;
