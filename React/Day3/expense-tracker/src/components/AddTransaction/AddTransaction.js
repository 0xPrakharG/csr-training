import { useState } from "react";
import "./AddTransaction.css";

const AddTransaction = ({ addTransaction }) => {
    const [text, setText] = useState("");
    const [amount, setAmount] = useState("");
    const [credit, setCredit] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text || !amount) return;

        addTransaction({ text, amount: parseFloat(amount), credit });
        setText("");
        setAmount("");
        setCredit(false);
    };

    return (
        <div style={{ maxWidth: "70%", margin: "0 auto" }}>
            <h2 className="header">Add Transaction</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Description"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="input"
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="input"
                />
                <label for="">
                    <input
                        type="checkbox"
                        checked={credit}
                        onChange={(e) => {
                            setCredit(e.target.checked);
                        }}
                    />
                    Credited
                </label>
                <button type="submit" className="button">
                    Add Transaction
                </button>
            </form>
        </div>
    );
};

export default AddTransaction;
