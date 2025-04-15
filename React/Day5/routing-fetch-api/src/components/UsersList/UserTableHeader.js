const UserTableHeader = ({ keys }) => {
    return (
        <thead>
            <tr className="user-table-row">
                {keys.map((key, index) => (
                    <th
                        style={{ border: "1px solid black" }}
                        key={index}
                        className="user-table-header"
                    >
                        {key}
                    </th>
                ))}
                <th className="user-table-header">Actions</th>
            </tr>
        </thead>
    );
};

export default UserTableHeader;
