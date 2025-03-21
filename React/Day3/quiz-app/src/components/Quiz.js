import { useState, useEffect } from "react";
import questions from "../questions.js";
import Question from "./Question.js";
import Choices from "./Choices.js";
import FinalResult from "./FinalResult.js";

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [quizFinished, setQuizFinished] = useState(false);

    useEffect(() => {
        setSelectedAnswer(null);
    }, [currentQuestion]);

    const handleAnswer = (answer) => {
        setSelectedAnswer(answer);
    };

    const nextQuestion = () => {
        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setQuizFinished(true);
        }
    };

    return (
        <div>
            {!quizFinished ? (
                <>
                    <Question question={questions[currentQuestion].question} />
                    <Choices
                        options={questions[currentQuestion].options}
                        selectedAnswer={selectedAnswer}
                        handleAnswer={handleAnswer}
                    />
                    <button onClick={nextQuestion} disabled={!selectedAnswer}>
                        {currentQuestion === questions.length - 1
                            ? "Finish Quiz"
                            : "Next Question"}
                    </button>
                </>
            ) : (
                <FinalResult score={score} total={questions.length} />
            )}
        </div>
    );
};

export default Quiz;
