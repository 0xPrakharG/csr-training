import ProductTableHeader from "./ProductTableHeader";
import ProductTableRow from "./ProductTableRow";

const ProductsTable = ({
    productsList,
    keys,
    formatData,
    onEdit,
    onDelete,
}) => {
    if (productsList && productsList.length === 0)
        return <p>Loading users...</p>;

    return (
        <table className="products-table">
            <ProductTableHeader keys={keys} />
            <tbody>
                {productsList &&
                    productsList.map((product, index) => (
                        <ProductTableRow
                            key={index}
                            product={product}
                            keys={keys}
                            formatData={formatData}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
            </tbody>
        </table>
    );
};

export default ProductsTable;
