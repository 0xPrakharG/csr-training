const Buttons = ({ start, setStart, resetTimer }) => {
    return (
        <div className="buttons">
            <button
                onClick={() => setStart((prev) => !prev)}
                style={
                    !start
                        ? {
                              backgroundColor: "#c0fac3",
                              color: "#38ba38",
                              borderColor: "#38ba38",
                          }
                        : {
                              backgroundColor: "#fac0c0",
                              color: "#ff2929",
                              borderColor: "#ff2929",
                          }
                }
            >
                {!start ? "Start" : "Pause"}
            </button>
            <button onClick={resetTimer}>Reset</button>
        </div>
    );
};

export default Buttons;
