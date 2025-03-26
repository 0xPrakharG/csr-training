const Balance = ({ balance }) => {
    return (
        <div style={{ textAlign: "center" }}>
            <h2>Balance: ₹{balance.toFixed(2)}</h2>
        </div>
    );
};

export default Balance;
