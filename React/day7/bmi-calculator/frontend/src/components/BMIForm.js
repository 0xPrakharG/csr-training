const BMIForm = ({ formData, handleChange, calculateBMI, loading, error }) => {
    return (
        <form onSubmit={calculateBMI} className="bmi-form">
            <div className="form-group">
                <label for="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name..."
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label for="age">Age:</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    min="1"
                    max="120"
                    placeholder="Enter your age..."
                    value={formData.age}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label for="gender">Gender:</label>
                <select
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div className="form-group">
                <label for="height_cm">Height(in cms):</label>
                <input
                    type="number"
                    id="height_cm"
                    name="height_cm"
                    min="50"
                    max="200"
                    placeholder="Enter your height in cms..."
                    value={formData.height_cm}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label for="weight_kg">Weight(in kgs):</label>
                <input
                    type="number"
                    id="weight_kg"
                    name="weight_kg"
                    min="1"
                    max="150"
                    step="0.1"
                    placeholder="Enter your weight in kgs..."
                    value={formData.weight_kg}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? "Calculating..." : "Calculate BMI"}
            </button>
            {error && <div className="error-message">{error}</div>}
        </form>
    );
};

export default BMIForm;
