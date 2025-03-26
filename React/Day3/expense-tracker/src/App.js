import { useEffect, useState } from "react";
import AddTransaction from "./components/AddTransaction/AddTransaction";
import Balance from "./components/Balance/Balance";
import TransactionList from "./components/TransactionList/TransactionList";

function App() {
    const savedTransaction =
        JSON.parse(localStorage.getItem("transactions")) || [];
    const [transactions, setTransactions] = useState(savedTransaction);
    const [balance, setBalance] = useState(0);

    const addTransaction = (transaction) => {
        setTransactions([...transactions, transaction]);
    };

    const deleteTransaction = (index) => {
        setTransactions(transactions.filter((_, i) => i !== index));
    };

    useEffect(() => {
        const total = transactions.reduce(
            (acc, transaction) =>
                transaction.credit
                    ? acc + transaction.amount
                    : acc - transaction.amount,
            0
        );
        setBalance(total);
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    return (
        <div style={{ marginTop: "20px" }}>
            <h1 style={{ margin: "auto", textAlign: "center" }}>
                Expense Tracker
            </h1>
            <Balance balance={balance} />
            <AddTransaction addTransaction={addTransaction} />
            <TransactionList
                transactions={transactions}
                deleteTransaction={deleteTransaction}
            />
        </div>
    );
}

export default App;
