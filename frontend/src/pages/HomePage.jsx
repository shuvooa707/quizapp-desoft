import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import serverUrl from "../utils/GetServerLink.jsx";

function HomePage() {

    const loadHomePageData = async () => {
        return  await fetch(`${serverUrl}/api/init`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(res => res.json());
    }

    const [topics, setTopics] = useState(["tech", "pet"]);

    useEffect(() => {
        loadHomePageData()
            .then(res => {
                if (res.message === "success") {
                    setTopics(res.data.topics);
                }
            });
    },[])


    return (
        <>
            <div className="min-h-screen pt-20 dark:bg-gray-950">
                <div className={"flex w-2/3 mx-auto p-3 bg-gray-100 dark:bg-gray-900"}>
                    <h1 className={"text-white w-full text-center text-3xl"}>Choose A Quiz Topic</h1>
                </div>
                <div className=" w-2/3 mx-auto p-3 bg-gray-100 dark:bg-gray-900">
                    {
                        topics.map((topic, i) => {
                            return (
                                <Link to={`/quizzes/${topic.id}`} key={i} className={"inline-block p-2 px-1 m-4 min-w-52 max-w-52 text-center rounded-md dark:bg-gray-800 border border-gray-200 shadow-lg text-white"}>
                                    <i className="fa-solid fa-list mx-3"></i>
                                    {topic.name}
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}


export default HomePage
