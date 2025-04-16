import { useEffect, useState } from "react";

const EditProductForm = ({ productId, initialName, onUpdate, onCancel }) => {
    const [productTitle, setProductTitle] = useState(initialName);

    useEffect(() => {
        console.log(productId);
        setProductTitle(initialName);
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [initialName]);

    return (
        <div className="modal-overlay">
            <div className="edit-modal-container">
                <h3 className="edit-modal-title">Edit Product</h3>
                <table className="edit-table">
                    <thead>
                        <tr className="edit-table-row">
                            <th className="edit-table-header">ID</th>
                            <th className="edit-table-header">Product Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="edit-table-row">
                            <td className="edit-table-data">{productId}</td>
                            <td className="edit-table-data">
                                <input
                                    type="text"
                                    value={productTitle}
                                    onChange={(e) =>
                                        setProductTitle(e.target.value)
                                    }
                                    className="edit-input"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="edit-actions">
                    <button className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                    <button
                        className="update-btn"
                        onClick={() => onUpdate(productId, productTitle)}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProductForm;
