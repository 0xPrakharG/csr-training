const RecipeTableHeader = ({ keys }) => {
    return (
        <thead>
            <tr className="table-row">
                {keys.map((key, index) => (
                    <th
                        style={{ border: "1px solid black" }}
                        key={index}
                        className="table-header"
                    >
                        {key}
                    </th>
                ))}
                <th className="table-header">Actions</th>
            </tr>
        </thead>
    );
};

export default RecipeTableHeader;
