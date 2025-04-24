function BMIScale({ bmi }) {
    const getPosition = () => {
        if (bmi < 10) return 0;
        if (bmi > 40) return 100;
        return ((bmi - 10) / 30) * 100;
    };

    return (
        <div className="bmi-scale">
            <div className="scale-container">
                <div className="scale">
                    <div className="section underweight">Underweight</div>
                    <div className="section healthy">Healthy</div>
                    <div className="section overweight">Overweight</div>
                    <div className="section obese">Obese</div>
                </div>
                <div className="marker" style={{ left: `${getPosition()}%` }}>
                    <div className="bmi-value">{bmi}</div>
                    <div className="arrow">|</div>
                </div>
            </div>
            <div className="scale-labels">
                <span>10</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>40</span>
            </div>
        </div>
    );
}

export default BMIScale;
