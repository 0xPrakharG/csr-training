const Timer = ({ seconds, minutes, hours, miliseconds }) => {
    return (
        <div className="timer">
            <div className="timer-count">
                {hours >= 10 ? <p>{hours}</p> : <p>0{hours}</p>}
                <p>Hours</p>
            </div>
            <p style={{ marginBottom: "85px" }}>:</p>
            <div className="timer-count">
                {minutes >= 10 ? <p>{minutes}</p> : <p>0{minutes}</p>}
                <p>Minutes</p>
            </div>
            <p style={{ marginBottom: "85px" }}>:</p>
            <div className="timer-count">
                {seconds >= 10 ? <p>{seconds}</p> : <p>0{seconds}</p>}
                <p>Seconds</p>
            </div>
        </div>
    );
};

export default Timer;
