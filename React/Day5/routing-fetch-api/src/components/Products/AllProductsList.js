import { useEffect, useState } from "react";
import ProductsList from "./ProductsList";

const AllProductsList = () => {
    const [productsList, setProductsList] = useState();
    const [keys, setKeys] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllUsers = async () => {
        try {
            const res = await fetch("https://dummyjson.com/products");

            const data = await res.json();
            if (data) {
                setProductsList(data.products);
                setKeys(Object.keys(data?.products[0]));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const flattenObject = (obj) => {
        const result = [];

        const recurse = (value) => {
            if (value === null || value === undefined) return;
            if (typeof value === "object" && !Array.isArray(value)) {
                Object.values(value).forEach(recurse);
            } else if (Array.isArray(value)) {
                value.forEach(recurse);
            } else {
                result.push(value);
            }
        };

        recurse(obj);
        return result.join(", ");
    };

    const formatData = (value) => {
        if (typeof value === "object" && value !== null) {
            return flattenObject(value);
        }
        return value;
    };

    return (
        <div className="products-list">
            {loading ? (
                <div className="loader">Loading Products List...</div>
            ) : (
                <ProductsList
                    productsList={productsList}
                    keys={keys}
                    formatData={formatData}
                />
            )}
        </div>
    );
};

export default AllProductsList;
