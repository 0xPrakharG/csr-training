import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProfileForm = () => {
    const navigate = useNavigate();
    const { user, error: authError } = useAuth(navigate);

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "male",
        country_id: "",
        state_id: "",
        city_id: "",
        address: "",
    });

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch countries on component mount
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch("http://localhost:3008/countries");
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

        fetchCountries();
    }, []);

    // Fetch user profile data after countries are loaded
    useEffect(() => {
        const fetchUserProfile = async () => {
            if (countries.length === 0) return;

            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await fetch(
                    "http://localhost:3008/getProfile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (data.status && data.data) {
                    // Find the country ID based on country name
                    const foundCountry = countries.find(
                        (country) => country.name === data.data.country
                    );

                    if (foundCountry) {
                        const countryId = parseInt(foundCountry.id);

                        // First set country_id
                        setFormData((prev) => ({
                            ...prev,
                            name: data.data.name || "",
                            age: data.data.age || "",
                            gender: data.data.gender || "male",
                            country_id: countryId,
                            address: data.data.address || "",
                        }));

                        // Fetch states for this country
                        const statesResponse = await fetch(
                            `http://localhost:3008/states?country_id=${countryId}`
                        );
                        const statesData = await statesResponse.json();

                        if (statesData.status) {
                            const statesList = statesData.data[0];
                            setStates(statesList);

                            // Find the state ID based on state name
                            const foundState = statesList.find(
                                (state) => state.name === data.data.state
                            );

                            if (foundState) {
                                const stateId = parseInt(foundState.id);

                                // Set state_id
                                setFormData((prev) => ({
                                    ...prev,
                                    state_id: stateId,
                                }));

                                // Fetch cities for this state
                                const citiesResponse = await fetch(
                                    `http://localhost:3008/cities?state_id=${stateId}`
                                );
                                const citiesData = await citiesResponse.json();

                                if (citiesData.status) {
                                    const citiesList = citiesData.data[0];
                                    setCities(citiesList);

                                    // Find the city ID based on city name
                                    const foundCity = citiesList.find(
                                        (city) => city.name === data.data.city
                                    );

                                    if (foundCity) {
                                        // Set city_id
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
                // Don't set error state here to avoid confusing the user if profile doesn't exist yet
            }
        };

        fetchUserProfile();
    }, [countries]);

    // Fetch states when country changes
    useEffect(() => {
        if (!formData.country_id) {
            setStates([]);
            return;
        }

        const fetchStates = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3008/states?country_id=${formData.country_id}`
                );
                const data = await response.json();
                if (data.status) {
                    setStates(data.data[0]);
                    // Clear state and city selection when country changes
                    if (!cities.length) {
                        setFormData((prev) => ({
                            ...prev,
                            state_id: "",
                            city_id: "",
                        }));
                    }
                } else {
                    setError("Failed to fetch states");
                }
            } catch (err) {
                setError("Error fetching states: " + err.message);
            }
        };

        fetchStates();
    }, [formData.country_id]);

    // Fetch cities when state changes
    useEffect(() => {
        if (!formData.state_id) {
            setCities([]);
            return;
        }

        const fetchCities = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3008/cities?state_id=${formData.state_id}`
                );
                const data = await response.json();
                if (data.status) {
                    setCities(data.data[0]);
                    // Clear city selection when state changes
                    if (!cities.length) {
                        setFormData((prev) => ({
                            ...prev,
                            city_id: "",
                        }));
                    }
                } else {
                    setError("Failed to fetch cities");
                }
            } catch (err) {
                setError("Error fetching cities: " + err.message);
            }
        };

        fetchCities();
    }, [formData.state_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Convert ID fields to integers
        if (
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

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            // Make sure all ID fields are integers before submitting
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

            const data = await response.json();

            if (data.status) {
                setSuccess("Profile updated successfully!");
            } else {
                setError(data.message || "Failed to update profile");
            }
        } catch (err) {
            setError("Error updating profile: " + err.message);
        } finally {
            setLoading(false);
            navigate("/profile");
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
                        <option value="">Select Country</option>
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
                        <option value="">Select State</option>
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
                        <option value="">Select City</option>
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
