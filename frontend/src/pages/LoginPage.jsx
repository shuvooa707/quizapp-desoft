import React, {useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import "../index.css";
import serverUrl from "../utils/GetServerLink.jsx";
import {useDispatch} from "react-redux";
import {setAuth} from "../stores/slices/AuthSlice.jsx";
import LocalStorageService from "../services/LocalStorageService.jsx";


const LoginPage = () => {
    const username = useRef('');
    const password = useRef('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();
        let res = null;
        try {
            res = await fetch(`${serverUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    email: username.current.value,
                    password: password.current.value
                })
            }).then(res => res.json());
        } catch (err) {
            return;
        }

        if (res.message === "success") {
            // console.log("-------res.user")
            // console.log(res.user)
            // console.log("-------res.user")

            let auth = {
                "profile": res.data.profile,
                "token": res.data.token
            };
            dispatch(setAuth(auth));
            // save locally
            console.log("saving locally ")
            LocalStorageService.save("desoft_auth", JSON.stringify(auth));


            setError(false);
            navigate("/profile");
        } else {
            setError(true);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-8 mb-[500px]">
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                    <form className="mt-8">
                        <div className="mb-4">
                            {
                                error &&
                                <h5 className={"text-red-700 font-bold"}>*Wrong Credentials</h5>
                            }
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Email
                            </label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                                type="email"
                                id="username"
                                defaultValue={"u@u.u"}
                                placeholder="Enter your email"
                                ref={username}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                                type="password"
                                id="password"
                                desoft_auth={"Pa$$w0rd!"}
                                placeholder="Enter your password"
                                ref={password}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={handleSubmit}
                            >
                                Sign In
                            </button>
                            <Link
                                to={"/register"}
                                className=" hover:underline text-blue-700 font-bold py-2 px-4 rounded"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
