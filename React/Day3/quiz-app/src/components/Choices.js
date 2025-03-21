const Choices = ({ options, selectedAnswer, handleAnswer }) => {
    return (
        <div>
            {options.map((option, index) => (
                <button
                    key={index}
                    style={{
                        backgroundColor:
                            selectedAnswer === option ? "#007bff" : "#f8f9fa",
                        color: selectedAnswer === option ? "white" : "black",
                    }}
                    onClick={() => handleAnswer(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    );
};

export default Choices;
