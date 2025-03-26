import "./TransactionList.css";

const TransactionList = ({ transactions, deleteTransaction }) => {
    return (
        <div className="transaction-list">
            <h2 style={{ textAlign: "center" }}>Transactions</h2>
            <table className="list">
                <thead>
                    <tr className="header-row">
                        <th>Description</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                </thead>
                {transactions.length > 0 ? (
                    <tbody>
                        {transactions.map((transaction, index) => (
                            <tr
                                key={index}
                                className="transaction"
                                style={{
                                    color: transaction.credit ? "green" : "red",
                                }}
                            >
                                <td>{transaction.text}</td>
                                <td>{transaction.amount}</td>
                                <td>
                                    <button
                                        onClick={() => deleteTransaction(index)}
                                        className="delButton"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <p
                        style={{
                            background: "aliceblue",
                            color: "#00000097",
                            textAlign: "center",
                            padding: "20px",
                            borderRadius: "10px",
                        }}
                    >
                        There are no transactions to display.
                    </p>
                )}
            </table>
        </div>
    );
};

export default TransactionList;
