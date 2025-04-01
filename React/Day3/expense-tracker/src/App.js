import { useCallback, useEffect, useMemo, useState } from "react";
import AddTransaction from "./components/AddTransaction/AddTransaction";
import Balance from "./components/Balance/Balance";
import TransactionList from "./components/TransactionList/TransactionList";

function App() {
    const savedTransaction =
        JSON.parse(localStorage.getItem("transactions")) || [];
    const [transactions, setTransactions] = useState(savedTransaction);
    const [balance, setBalance] = useState(0);

    const addTransaction = useCallback(
        (transaction) => {
            setTransactions([...transactions, transaction]);
        },
        [transactions]
    );

    const deleteTransaction = useCallback(
        (index) => {
            setTransactions(transactions.filter((_, i) => i !== index));
        },
        [transactions]
    );

    const calculateTotal = useMemo(() => {
        return transactions.reduce(
            (acc, transaction) =>
                transaction.credit
                    ? acc + transaction.amount
                    : acc - transaction.amount,
            0
        );
    }, [transactions]);

    useEffect(() => {
        setBalance(calculateTotal);
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions, calculateTotal]);

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
