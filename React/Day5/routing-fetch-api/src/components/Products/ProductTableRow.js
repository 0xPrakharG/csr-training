import React from "react";

const ProductTableRow = ({ product, keys, formatData, onEdit, onDelete }) => {
    return (
        <tr>
            {keys.map((key, index) => (
                <td key={index} className="product-table-data">
                    {key === "images" ? (
                        <img
                            src={product[key]}
                            alt="product"
                            width="40"
                            height="40"
                        />
                    ) : key === "thumbnail" ? (
                        <img
                            src={product[key]}
                            alt="product"
                            width="40"
                            height="40"
                        />
                    ) : product[key] ? (
                        formatData(product[key])
                    ) : (
                        "-"
                    )}
                </td>
            ))}
            <td className="product-table-data">
                <button
                    onClick={() => onEdit(product.id, product.title)}
                    className="edit-btn"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(product.id)}
                    className="del-btn"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default ProductTableRow;
