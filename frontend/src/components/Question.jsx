import React from 'react';

const Question = ({ question, answers, handleTick }) => {


    return (
        <div className="my-3 mx-auto text-black">
            {/* Question Text */}
            <h2 className="text-xl py-2 px-2 bg-gray-300 font-semibold text-gray-900 ">
                {question.title}
            </h2>

            {/* Answer Options */}
            <div className="space-y-2 p-2  bg-gray-200">
                {
                    answers.map((answer, i) => (
                        <label key={i} className="flex items-center">
                            <span className={"mr-2"}>{ i+1 }</span>
                            <input
                                onInput={e => handleTick(question.id, answer.id)}
                                type={ question.type === "single-choice" ? "radio" : "checkbox" }
                                name={question.id}
                                className="form-checkbox text-blue-600 dark:text-blue-400"
                            />
                            <span className="ml-2 text-gray-700 ">{answer.answer_text}</span>
                        </label>
                    ))
                }
            </div>
        </div>
    );
};

export default Question;
