import { useEffect, useRef, useState } from "react";
import Buttons from "./Buttons";
import Timer from "./Timer";

const Stopwatch = () => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [start, setStart] = useState(false);

    const secondsInterval = useRef(null);
    const minutesInterval = useRef(null);
    const hoursInterval = useRef(null);

    const countSeconds = () => {
        setSeconds((prevSeconds) => {
            if (prevSeconds < 59) {
                return prevSeconds + 1;
            } else {
                return 0;
            }
        });
    };

    const countMinutes = () => {
        setMinutes((prevMinutes) => {
            if (prevMinutes < 59) {
                return prevMinutes + 1;
            } else {
                return 0;
            }
        });
    };

    const countHours = () => {
        setHours((prevHours) => prevHours + 1);
    };

    const resetTimer = () => {
        clearInterval(secondsInterval.current);
        clearInterval(minutesInterval.current);
        clearInterval(hoursInterval.current);

        setSeconds(0);
        setMinutes(0);
        setHours(0);
        setStart(false);
    };

    useEffect(() => {
        if (start) {
            secondsInterval.current = setInterval(countSeconds, 1000);
            minutesInterval.current = setInterval(countMinutes, 60000);
            hoursInterval.current = setInterval(countHours, 3600000);
        } else {
            clearInterval(secondsInterval.current);
            clearInterval(minutesInterval.current);
            clearInterval(hoursInterval.current);
        }

        return () => {
            clearInterval(secondsInterval.current);
            clearInterval(minutesInterval.current);
            clearInterval(hoursInterval.current);
        };
    }, [start]);

    return (
        <div className="stopwatch">
            <Timer seconds={seconds} minutes={minutes} hours={hours} />
            <Buttons
                start={start}
                setStart={setStart}
                resetTimer={resetTimer}
            />
        </div>
    );
};

export default Stopwatch;
