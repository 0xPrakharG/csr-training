import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProfileForm = () => {
    const navigate = useNavigate();
    const { error: authError } = useAuth(navigate);

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "male",
        country_id: "",
        state_id: "",
        city_id: "",
        address: "",
        image: null,
    });
    const [image, setImage] = useState(null);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchCountries = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await fetch("http://localhost:3008/countries", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data.status) {
                setCountries(data.data[0]);
            } else {
                setError("Failed to fetch countries");
            }
        } catch (err) {
            setError("Error fetching countries: " + err.message);
        }
    };

    const fetchUserProfile = async () => {
        if (countries.length === 0) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await fetch("http://localhost:3008/getProfile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            console.log(data);
            if (data.status && data.data) {
                const foundCountry = countries.find(
                    (country) => country.name === data.data.country
                );

                if (foundCountry) {
                    const countryId = parseInt(foundCountry.id);

                    setFormData((prev) => ({
                        ...prev,
                        name: data.data.name || "",
                        age: data.data.age || "",
                        gender: data.data.gender || "male",
                        image: data.data.image || null,
                        country_id: countryId,
                        address: data.data.address || "",
                    }));

                    const statesResponse = await fetch(
                        `http://localhost:3008/states?country_id=${countryId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const statesData = await statesResponse.json();

                    if (statesData.status) {
                        const statesList = statesData.data[0];
                        setStates(statesList);

                        const foundState = statesList.find(
                            (state) => state.name === data.data.state
                        );

                        if (foundState) {
                            const stateId = parseInt(foundState.id);

                            setFormData((prev) => ({
                                ...prev,
                                state_id: stateId,
                            }));

                            const citiesResponse = await fetch(
                                `http://localhost:3008/cities?state_id=${stateId}`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            );
                            const citiesData = await citiesResponse.json();

                            if (citiesData.status) {
                                const citiesList = citiesData.data[0];
                                setCities(citiesList);

                                const foundCity = citiesList.find(
                                    (city) => city.name === data.data.city
                                );

                                if (foundCity) {
                                    setFormData((prev) => ({
                                        ...prev,
                                        city_id: parseInt(foundCity.id),
                                    }));
                                }
                            }
                        }
                    }
                }
            }
        } catch (err) {
            console.error("Error fetching profile:", err);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        fetchUserProfile();
    }, [countries]);

    useEffect(() => {
        if (!formData.country_id) {
            setStates([]);
            setCities([]);
            return;
        }

        const fetchStates = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;
                const response = await fetch(
                    `http://localhost:3008/states?country_id=${formData.country_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();
                if (data.status) {
                    setStates(data.data[0]);
                    setFormData((prev) => ({
                        ...prev,
                        state_id: "",
                        city_id: "",
                    }));
                } else {
                    setError("Failed to fetch states");
                }
            } catch (err) {
                setError("Error fetching states: " + err.message);
            }
        };

        fetchStates();
    }, [formData.country_id]);

    useEffect(() => {
        if (!formData.state_id) {
            setCities([]);
            return;
        }

        const fetchCities = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await fetch(
                    `http://localhost:3008/cities?state_id=${formData.state_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();
                if (data.status) {
                    setCities(data.data[0]);

                    setFormData((prev) => ({
                        ...prev,
                        city_id: "",
                    }));
                } else {
                    setError("Failed to fetch cities");
                }
            } catch (err) {
                setError("Error fetching cities: " + err.message);
            }
        };

        fetchCities();
    }, [formData.state_id]);

    const previewImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImage(reader.result);
            setFormData((prev) => ({
                ...prev,
                image: reader.result,
            }));
        };
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            previewImage(files[0]);
        } else if (
            name === "country_id" ||
            name === "state_id" ||
            name === "city_id"
        ) {
            setFormData((prev) => ({
                ...prev,
                [name]: value ? parseInt(value) : "",
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        if (!formData.name.trim()) {
            setError("Name is required");
            setLoading(false);
            return;
        }

        if (formData.name.length < 2 || formData.name.length > 30) {
            setError("Name should have 2-30 characters");
            setLoading(false);
            return;
        }

        if (!formData.age || formData.age < 1 || formData.age > 120) {
            setError("Valid age is required (1-120)");
            setLoading(false);
            return;
        }

        if (!formData.country_id) {
            setError("Country is required");
            setLoading(false);
            return;
        }

        if (!formData.state_id) {
            setError("State is required");
            setLoading(false);
            return;
        }

        if (!formData.city_id) {
            setError("City is required");
            setLoading(false);
            return;
        }

        if (!formData.address.trim()) {
            setError("Address is required");
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const dataToSubmit = {
                ...formData,
                country_id: parseInt(formData.country_id),
                state_id: parseInt(formData.state_id),
                city_id: parseInt(formData.city_id),
                age: parseInt(formData.age),
            };

            const response = await fetch(
                "http://localhost:3008/saveProfileInfo",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(dataToSubmit),
                }
            );
            console.log(dataToSubmit);

            const data = await response.json();

            if (data.status) {
                setSuccess("Profile updated successfully!");
                navigate("/profile");
            } else {
                setError(data.message || "Failed to update profile");
            }
        } catch (err) {
            setError("Error updating profile: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    if (authError) {
        return <p className="error">{authError}</p>;
    }

    return (
        <div className="profile-form-container">
            <h2>Update Your Profile</h2>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group image-upload-container">
                    <label>Profile Image</label>
                    <div>
                        {formData.image ? (
                            <img
                                src={formData.image}
                                alt="Profile preview"
                                className="profile-image-preview"
                            />
                        ) : (
                            <div className="profile-image-preview placeholder">
                                No image selected
                            </div>
                        )}
                    </div>
                    <input
                        id="image"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg"
                        name="image"
                        onChange={handleChange}
                        className="file-input"
                    />
                    <label
                        htmlFor="image"
                        className="custom-file-upload"
                        style={{ color: "#FFFFFF" }}
                    >
                        Choose Profile Picture
                    </label>
                    {formData.image && (
                        <span className="file-name">Image selected</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                        id="age"
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        min="1"
                        max="120"
                        placeholder="Enter your age"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="country_id">Country</label>
                    <select
                        id="country_id"
                        name="country_id"
                        value={formData.country_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">--Select Country--</option>
                        {countries.map((country) => (
                            <option
                                key={country.id}
                                value={parseInt(country.id)}
                            >
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="state_id">State</label>
                    <select
                        id="state_id"
                        name="state_id"
                        value={formData.state_id}
                        onChange={handleChange}
                        required
                        disabled={!formData.country_id}
                    >
                        <option value="">--Select State--</option>
                        {states.map((state) => (
                            <option key={state.id} value={parseInt(state.id)}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="city_id">City</label>
                    <select
                        id="city_id"
                        name="city_id"
                        value={formData.city_id}
                        onChange={handleChange}
                        required
                        disabled={!formData.state_id}
                    >
                        <option value="">--Select City--</option>
                        {cities.map((city) => (
                            <option key={city.id} value={parseInt(city.id)}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full address"
                        rows="3"
                    />
                </div>

                <button
                    type="submit"
                    className="submit-button"
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save Profile"}
                </button>
            </form>
        </div>
    );
};

export default ProfileForm;
