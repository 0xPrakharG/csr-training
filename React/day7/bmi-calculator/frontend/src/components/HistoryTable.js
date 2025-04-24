function HistoryTable({ data }) {
    if (!data || data.length === 0) return null;

    return (
        <div className="history-table">
            <h3>Previous Entries</h3>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Weight (kg)</th>
                        <th>Height (cm)</th>
                        <th>BMI</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {data.slice(0, 10).map((entry, index) => (
                        <tr key={index} className={entry.category}>
                            <td>
                                {new Date(
                                    entry.created_at || Date.now()
                                ).toLocaleString()}
                            </td>
                            <td>{entry.weight_kg}</td>
                            <td>{entry.height_cm}</td>
                            <td>{entry.bmi}</td>
                            <td>
                                {entry.category.charAt(0).toUpperCase() +
                                    entry.category.slice(1)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HistoryTable;
