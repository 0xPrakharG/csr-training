const ProductTableHeader = ({ keys }) => {
    return (
        <thead>
            <tr className="product-table-row">
                {keys.map((key, index) => (
                    <th
                        style={{ border: "1px solid black" }}
                        key={index}
                        className="product-table-header"
                    >
                        {key}
                    </th>
                ))}
                <th className="product-table-header">Actions</th>
            </tr>
        </thead>
    );
};

export default ProductTableHeader;
