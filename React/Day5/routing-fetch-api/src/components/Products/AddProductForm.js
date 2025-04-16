import { useState } from "react";

const AddProductForm = ({ onAddProduct }) => {
    const [addProductTitle, setAddProductTitle] = useState("");

    const handleSubmit = () => {
        onAddProduct(addProductTitle);
        setAddProductTitle("");
    };

    return (
        <div className="add-container">
            <input
                type="text"
                value={addProductTitle}
                onChange={(e) => setAddProductTitle(e.target.value)}
                className="add-input"
                placeholder="Enter Product Name"
            />
            <button className="add-btn" onClick={handleSubmit}>
                Add
            </button>
        </div>
    );
};

export default AddProductForm;
