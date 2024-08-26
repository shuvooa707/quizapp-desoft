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
        let res = await axios.post(`${serverUrl}/api/admin/quizzes/store`, {
            title: quizTitle,
            description: quizDescription,
            topic_id: quizCategory,
            questions: questions
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

                {/* Quiz Description */}
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="quizDescription">
                        Quiz Description
                    </label>
                    <textarea
                        id="quizDescription"
                        value={quizDescription}
                        onChange={(e) => setQuizDescription(e.target.value)}
                        className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        placeholder="Enter quiz description"
                        rows="3"
                        required
                    />
                </div>

                {/* Quiz Category */}
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="quizCategory">
                        Quiz Topic
                    </label>
                    <select
                        id="quizCategory"
                        value={quizCategory}
                        onChange={(e) => setQuizCategory(e.target.value)}
                        className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        required
                    >
                        <option value="" disabled>Select a Topic</option>
                        {
                            topics.map((topic, i) => {
                                return (
                                    <option key={i} value={topic.id}>{ topic.name }</option>
                                )
                            })
                        }
                        {/* Add more categories as needed */}
                    </select>
                </div>

                {/* Questions */}
                {questions.map((question, qIndex) => (
                    <div key={qIndex} className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-2">
                            Question {qIndex + 1}
                        </h2>
                        <input
                            type="text"
                            value={question.question}
                            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                            className="w-full p-3 mb-4 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            placeholder="Enter question text"
                            required
                        />
                        {question.options.map((option, oIndex) => (
                            <div key={oIndex} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                    className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                    placeholder={`Enter option ${oIndex + 1}`}
                                    required
                                />
                                <input
                                    type="radio"
                                    name={`correctOption-${qIndex}`}
                                    checked={question.correctOption === oIndex}
                                    onChange={() => handleCorrectOptionChange(qIndex, oIndex)}
                                    className="ml-4"
                                />
                                <span className="ml-2 text-gray-700 dark:text-gray-300">Correct</span>
                                {question.options.length > 2 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveOption(qIndex, oIndex)}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => handleAddOption(qIndex)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                        >
                            Add Option
                        </button>
                    </div>
                ))}

                {/* Add Question Button */}
                <div className="mb-6">
                    <button
                        type="button"
                        onClick={handleAddQuestion}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Another Question
                    </button>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Create Quiz
                    </button>
                </div>
            </form>
        </div>
    );
};

export default QuizCreationForm;
