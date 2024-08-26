import React from 'react';

const ResultQuestion = ({question, answers, ticks}) => {


    return (
        <>
            <div className="my-3 mx-auto text-black">
                {/* Question Text */}
                <h2 className="text-xl py-2 px-2 bg-gray-300 font-semibold text-gray-900 ">
                    {question.title}
                </h2>

                {/* Answer Options */}
                <div className="space-y-2 p-2 bg-gray-200">
                    {
                        answers.map((answer, i) => {
                            console.log(`flex items-center ${answer.is_correct == 1 ? "text-red-600" : "text-gray-700"}`)
                            return (
                                <label key={i} className={`flex items-center ${answer.is_correct == 1 ? "bg-green-200 text-green-600" : "text-gray-700"}`}>
                                    <span className={"mr-2"}>{i + 1}</span>
                                    <input
                                        disabled={true}
                                        checked={ticks.get(question.id) == answer.id}
                                        type={question.type === "single-choice" ? "radio" : "checkbox"}
                                        name={question.id}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2 ">{answer.answer_text}</span>
                                    {
                                        (ticks.get(question.id) == answer.id && answer.is_correct == 1) &&
                                        <span className="ml-2  text-blue-600 italic font-bold ml-10">
                                        Correct Answer
                                    </span>
                                    }
                                    {
                                        (ticks.get(question.id) == answer.id && answer.is_correct == 0) &&
                                        <span className="ml-2 text-red-600 italic font-bold ml-10">
                                        Wrong Answer
                                    </span>
                                    }
                                </label>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
};

export default ResultQuestion;
