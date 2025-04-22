import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const UserForm = ({ selectedUser, onSubmitSuccess }) => {
    const initialFormState = {
        firstname: "",
        lastname: "",
        maidenname: "",
        age: "",
        gender: "",
        email: "",
        // phone: "",
        // username: "",
        // password: "",
        // birthDate: "",
    };

    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (selectedUser) {
            setFormData(selectedUser);
        } else {
            setFormData(initialFormState);
        }
    }, [selectedUser]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstname.trim())
            newErrors.firstname = "First name is required";
        if (!formData.lastname.trim())
            newErrors.lastname = "Last name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        // if (!formData.username.trim())
        //     newErrors.username = "Username is required";
        // if (!formData.password.trim()) {
        //     newErrors.password = "Password is required";
        // } else if (formData.password.length < 8) {
        //     newErrors.password = "Password must be at least 8 characters";
        // } else if (
        //     !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/.test(
        //         formData.password
        //     )
        // ) {
        //     newErrors.password =
        //         "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character";
        // }
        if (formData.age && (isNaN(formData.age) || formData.age < 0)) {
            newErrors.age = "Age must be a positive number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        const url = selectedUser
            ? `http://localhost:3008/${selectedUser.id}`
            : "http://localhost:3008/";

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
                toast.success(
                    selectedUser
                        ? "User updated successfully!"
                        : "User added successfully!"
                );
                onSubmitSuccess();
                if (!selectedUser) {
                    setFormData(initialFormState);
                }
            } else {
                const errorData = await res.json();
                toast.error(errorData.message || "Failed to save user");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Failed to submit user data.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="card">
            <form className="user-form" onSubmit={handleSubmit}>
                <h2 className="form-title">
                    {selectedUser ? "Edit" : "Add"} User
                </h2>

                <div>
                    <div className="form-group">
                        <label htmlFor="firstname">First Name</label>
                        <input
                            id="firstname"
                            name="firstname"
                            type="text"
                            value={formData.firstname}
                            onChange={handleChange}
                            placeholder="Enter First Name"
                            className={errors.firstname ? "input-error" : ""}
                        />
                        {errors.firstname && (
                            <span className="error-message">
                                {errors.firstname}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastname">Last Name</label>
                        <input
                            id="lastname"
                            name="lastname"
                            type="text"
                            value={formData.lastname}
                            onChange={handleChange}
                            placeholder="Enter Last Name"
                            className={errors.lastname ? "input-error" : ""}
                        />
                        {errors.lastname && (
                            <span className="error-message">
                                {errors.lastname}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="maidenname">Maiden Name</label>
                        <input
                            id="maidenname"
                            name="maidenname"
                            type="text"
                            value={formData.maidenname}
                            onChange={handleChange}
                            placeholder="Enter Maiden Name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                            id="age"
                            name="age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Enter Age"
                            className={errors.age ? "input-error" : ""}
                        />
                        {errors.age && (
                            <span className="error-message">{errors.age}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                            className={errors.email ? "input-error" : ""}
                        />
                        {errors.email && (
                            <span className="error-message">
                                {errors.email}
                            </span>
                        )}
                    </div>

                    {/* <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter Phone"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter Username"
                            className={errors.username ? "input-error" : ""}
                        />
                        {errors.username && (
                            <span className="error-message">
                                {errors.username}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            className={errors.password ? "input-error" : ""}
                        />
                        {errors.password && (
                            <span className="error-message">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="birthDate">Birth Date</label>
                        <input
                            id="birthDate"
                            name="birthDate"
                            type="date"
                            value={formData.birthDate}
                            onChange={handleChange}
                        />
                    </div> */}
                </div>

                <div className="form-actions">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="loading-spinner"></span>
                        ) : selectedUser ? (
                            "Update User"
                        ) : (
                            "Add User"
                        )}
                    </button>
                    {selectedUser && (
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                                setFormData(initialFormState);
                                onSubmitSuccess();
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default UserForm;
