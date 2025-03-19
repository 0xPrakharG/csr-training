import { useEffect, useState } from "react";

const Count = () => {
    const [num, setNum] = useState(0);

    const increment = () => {
        setNum(num + 1);
        console.log(num);
    };

    useEffect(() => {
        // Mounting phase
        console.log("Mounting");

        // Unmounting Phase
        return () => {
            console.log("Unmounting Phase");
        };
    }, []); // this is called only at the time of load the first time

    useEffect(() => {
        // Updating Phase
        console.log("Updating");
    }, [num]); // it is called everytime the num is updated

    useEffect(() => {
        console.log("Every render");
    }); // this is called evertime there is a change in the page

    return (
        <div>
            Count {num}
            <button onClick={increment}>Increase Count</button>
        </div>
    );
};

export default Count;
