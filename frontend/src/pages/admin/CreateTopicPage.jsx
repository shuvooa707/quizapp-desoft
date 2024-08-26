import {useEffect, useState} from 'react';
import axios from "axios";
import serverUrl from "../../utils/GetServerLink.jsx";
import {useSelector} from "react-redux";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const QuizCreationForm = () => {
    const navigate = useNavigate();

    const {auth} = useSelector(state => state.auth);

    const [quizTitle, setQuizTitle] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [questions, setQuestions] = useState([{question: '', options: ['', ''], correctOption: null}]);

    const handleAddQuestion = () => {
        setQuestions([...questions, {question: '', options: ['', ''], correctOption: null}]);
    };

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions);
    };

    const handleAddOption = (qIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options.push('');
        setQuestions(newQuestions);
    };

    const handleRemoveOption = (qIndex, oIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options.splice(oIndex, 1);
        setQuestions(newQuestions);
    };

    const handleCorrectOptionChange = (qIndex, oIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].correctOption = oIndex;
        setQuestions(newQuestions);
    };

    const [topics, setTopics] = useState([]);
    const [quizCategory, setQuizCategory] = useState('');

    const loadCreatePageData = async () => {
        let res = await axios.get(`${serverUrl}/api/admin/quizzes/create/init`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${auth.token}`
            }
        });

        if (res.data.message === "success") {
            console.log(res.data.data.topics)
            setTopics(res.data.data.topics);
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        let res = await axios.post(`${serverUrl}/api/admin/topics/store`, {
            title: quizTitle
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${auth.token}`
            }
        });

        console.log({quizTitle, quizDescription, questions});
        if (res.data.message === "success") {
            Swal.fire({
                title: "Successful",
                text: "Quiz Created Successfully",
                icon: "success"
            });
            navigate("/admin/quizzes");
        }
        // Add your form submission logic here
    };


    useEffect(() => {
        loadCreatePageData();
    },[])

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-6">Create a New Quiz</h1>
            <form onSubmit={handleSubmit}>
                {/* Quiz Title */}
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="quizTitle">
                        Quiz Title
                    </label>
                    <input
                        type="text"
                        id="quizTitle"
                        value={quizTitle}
                        onChange={(e) => setQuizTitle(e.target.value)}
                        className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        placeholder="Enter quiz title"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Create Topic
                    </button>
                </div>
            </form>
        </div>
    );
};

export default QuizCreationForm;
