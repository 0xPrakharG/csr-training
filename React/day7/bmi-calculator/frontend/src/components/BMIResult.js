import React from "react";
import BMIScale from "./BMIScale";

const BMIResult = ({ result }) => {
    return (
        <div className="bmi-result">
            <div className="bmi-value-display">
                <span className="value">{result.bmi}</span>
                <span className={`category ${result.category}`}>
                    {result.category.charAt(0).toUpperCase() +
                        result.category.slice(1)}
                </span>
            </div>

            <BMIScale bmi={parseFloat(result.bmi)} />

            <div className="result-details">
                <p>Height: {result.height_cm}cm</p>
                <p>Weight: {result.weight_kg}kg</p>
            </div>

            {/* <div className="bmi-explanation">
                <h3>What does your BMI mean?</h3>
                {result.category === "underweight" && (
                    <p>
                        A BMI under 18.5 indicates you are underweight. This may
                        suggest insufficient nutrition or other health issues.
                        Consider consulting a healthcare professional.
                    </p>
                )}
                {result.category === "healthy" && (
                    <p>
                        A BMI between 18.5 and 24.9 indicates a healthy weight
                        for your height. Maintaining a healthy weight may lower
                        your risk of developing health problems.
                    </p>
                )}
                {result.category === "overweight" && (
                    <p>
                        A BMI between 25 and 29.9 indicates you are overweight.
                        This may increase your risk of health problems. Consider
                        healthy lifestyle changes.
                    </p>
                )}
                {result.category === "obese" && (
                    <p>
                        A BMI of 30 or higher indicates obesity. This increases
                        your risk of several health conditions. It's advisable
                        to consult with healthcare professionals.
                    </p>
                )}
            </div> */}
        </div>
    );
};

export default BMIResult;
