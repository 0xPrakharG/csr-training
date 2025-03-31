import { useEffect, useRef, useState } from "react";
import Buttons from "./Buttons";
import Timer from "./Timer";

const Stopwatch = () => {
    const [seconds, setSeconds] = useState(0);
    const [start, setStart] = useState(false);

    const secondsInterval = useRef(null);

    const resetTimer = () => {
        clearInterval(secondsInterval.current);
        setSeconds(0);
        setStart(false);
    };

    useEffect(() => {
        if (start) {
            secondsInterval.current = setInterval(() => {
                setSeconds((prevSecond) => prevSecond + 1);
            }, 1000);
        }

        return () => {
            clearInterval(secondsInterval.current);
        };
    }, [start]);

    return (
        <div className="stopwatch">
            <Timer
                seconds={seconds % 60}
                minutes={Math.floor((seconds % 3600) / 60)}
                hours={Math.floor(seconds / 3600)}
            />
            <Buttons
                start={start}
                setStart={setStart}
                resetTimer={resetTimer}
            />
        </div>
    );
};

export default Stopwatch;
