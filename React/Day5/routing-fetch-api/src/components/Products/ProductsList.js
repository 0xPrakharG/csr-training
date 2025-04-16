import { useEffect, useState } from "react";
import ProductsTable from "./ProductsTable";
import EditProductForm from "./EditProductForm";
import AddProductForm from "./AddProductForm";

const ProductsList = ({ keys, productsList, formatData }) => {
    const [allProducts, setAllProducts] = useState(productsList);
    const [addingProduct, setAddingProduct] = useState(false);
    const [editing, setEditing] = useState(false);
    const [productId, setProductId] = useState("");
    const [productTitle, setProductTitle] = useState("");

    const addProduct = (title) => {
        fetch("https://dummyjson.com/users/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setAddingProduct(false);
            });
    };

    const getEditProduct = (id, productTitle) => {
        console.log(id);
        setEditing(true);
        setProductId(id);
        setProductTitle(productTitle);
    };

    const editProduct = (id, title) => {
        fetch(`https://dummyjson.com/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setEditing(false);
            });
    };

    const deleteProduct = (id) => {
        fetch(`https://dummyjson.com/products/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((json) => console.log(json));
    };

    useEffect(() => {
        setAllProducts(productsList);
    }, [productsList]);

    return (
        <div className="container product-table-container">
            <button className="add-btn" onClick={() => setAddingProduct(true)}>
                Add Product
            </button>

            {addingProduct && <AddProductForm onAddProduct={addProduct} />}
            <h3>All Products</h3>
            <ProductsTable
                productsList={allProducts}
                keys={keys}
                formatData={formatData}
                onEdit={getEditProduct}
                onDelete={deleteProduct}
            />
            {editing && (
                <EditProductForm
                    productId={productId}
                    initialName={productTitle}
                    onCancel={() => setEditing(false)}
                    onUpdate={editProduct}
                />
            )}
        </div>
    );
};

export default ProductsList;
