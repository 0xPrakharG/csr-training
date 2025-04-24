import { useEffect, useState } from "react";
import BMIForm from "./components/BMIForm";
import Header from "./components/Header";
import BMIResult from "./components/BMIResult";
import UserHistory from "./components/UserHistory";
import TrendsSection from "./components/TrendsSection";

function App() {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        height_cm: "",
        weight_kg: "",
    });
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [allRecords, setAllRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const calculateBMI = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (
                !formData.name.trim() ||
                !formData.age.trim() ||
                !formData.height_cm.trim() ||
                !formData.weight_kg.trim()
            ) {
                throw new Error("Please fill all required fields");
            }

            const response = await fetch(
                "http://localhost:3008/bmi/calculated",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            const data = await response.json();
            if (data.status) {
                setResult(data.data[0]);
                fetchUserHistory(formData.name);
            } else {
                throw new Error(data.message || "Error calculating BMI");
            }
        } catch (err) {
            setError(err.message);
            console.error("Error:", err);
        } finally {
            setFormData({
                name: "",
                age: "",
                gender: "",
                height_cm: "",
                weight_kg: "",
            });
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const fetchUserHistory = async (name) => {
        try {
            const response = await fetch(`http://localhost:3008/bmi/${name}`);
            const data = await response.json();
            if (data.status) {
                setHistory(data.data);
            }
        } catch (err) {
            console.error("Error fetching history:", err);
        }
    };

    const fetchAllRecords = async () => {
        try {
            const response = await fetch("http://localhost:3008/bmi");

            const data = await response.json();
            if (data.status) {
                setAllRecords(data.data);
            }
        } catch (err) {
            console.error("Error fetching all records:", err);
        }
    };

    useEffect(() => {
        fetchAllRecords();

        // const interval = setInterval(fetchAllRecords, 30000);
        // return () => clearInterval(interval);
    }, []);

    return (
        <div className="App">
            <Header />

            <main>
                <section className="calculator-section">
                    <BMIForm
                        formData={formData}
                        handleChange={handleChange}
                        calculateBMI={calculateBMI}
                        loading={loading}
                        error={error}
                    />
                </section>

                <section className="results-section">
                    <h2>Your BMI Results</h2>
                    {result ? (
                        <BMIResult result={result} />
                    ) : (
                        <p className="no-data">
                            Fill the form above to see your BMI data
                        </p>
                    )}
                </section>

                <section className="history-section">
                    <h2>Your BMI History</h2>
                    {history.length > 0 ? (
                        <UserHistory history={history} />
                    ) : (
                        <p className="no-data">
                            Fill the form above to see the history of your
                            records
                        </p>
                    )}
                </section>

                {/* <section className="trends-section">
                    <h2>BMI Trends</h2>
                    {allRecords.length > 0 ? (
                        <TrendsSection data={allRecords} />
                    ) : (
                        <p className="no-data">
                            There are no records in the database
                        </p>
                    )}
                </section> */}
            </main>
        </div>
    );
}

export default App;
