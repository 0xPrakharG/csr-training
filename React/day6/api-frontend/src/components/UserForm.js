import { useState, useEffect } from "react";

const UserForm = ({ selectedUser, onSubmitSuccess }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        maidenName: "",
        age: "",
        gender: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        birthDate: "",
    });

    useEffect(() => {
        if (selectedUser) {
            setFormData(selectedUser);
        }
    }, [selectedUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = selectedUser
            ? `http://localhost:3008/users/${selectedUser.id}`
            : "http://localhost:3008/users";

        const method = selectedUser ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                onSubmitSuccess();
                setFormData({
                    firstName: "",
                    lastName: "",
                    maidenName: "",
                    age: "",
                    gender: "",
                    email: "",
                    phone: "",
                    username: "",
                    password: "",
                    birthDate: "",
                });
            } else {
                console.error("Failed to save user");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to submit user data.");
        }
    };

    return (
        <form className="user-form" onSubmit={handleSubmit}>
            <h2 className="user-form-header">
                {selectedUser ? "Edit" : "Add"} User
            </h2>
            {Object.keys(formData)
                .slice(0, 10)
                .map((key) => (
                    <input
                        key={key}
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        placeholder={key}
                        type={
                            key === "email"
                                ? "email"
                                : key === "password"
                                ? "password"
                                : key === "phone"
                                ? "tel"
                                : key === "birthDate"
                                ? "date"
                                : key === "age"
                                ? "number"
                                : "text"
                        }
                    />
                ))}
            <button type="submit" className="submit-btn">
                {selectedUser ? "Update" : "Add"} User
            </button>
        </form>
    );
};

export default UserForm;
