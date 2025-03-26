import { useState } from "react";

const SearchBar = ({ setCity }) => {
    const [inputCity, setInputCity] = useState("");

    const handleSearch = () => {
        if (inputCity.trim() !== "") {
            setCity(inputCity);
        }
    };

    return (
        <div className="search-box">
            <input
                type="text"
                placeholder="Enter the city..."
                value={inputCity}
                onChange={(e) => setInputCity(e.target.value)}
                className="input"
            />
            <button onClick={handleSearch} className="button">
                Search
            </button>
        </div>
    );
};

export default SearchBar;
