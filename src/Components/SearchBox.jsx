import React, { useCallback, useEffect, useState } from "react";
import Table from "./Table";
import "../assets/styles/searchbox.css";
import { debounce } from "lodash";

const SearchBox = ({
  staticData,
  fetchCities,
  placeholder = "",
  customloading = "Loading...",
  // caching = true,
  onSelect = () => {},
  onBlur = () => {},
  onFocus = () => {},
  onChange = () => {},
  customStyles = {},
  dataKey = "",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  const getSuggestions = async (query) => {
    console.log("query", query);
    setError(null);
    setLoading(true);
    try {
      let result;
      if (staticData) {
        result = staticData.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });
      } else if (fetchCities) {
        result = await fetchCities(query);
      }
      // setCache(query, result);
      setSuggestions(result);
    } catch (err) {
      setError("Failed to fetch suggestions");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };
  const getSuggestionsDebounced = useCallback(
    debounce(getSuggestions, 300),
    []
  );
  useEffect(() => {
    if (inputValue.length > 1) {
      getSuggestionsDebounced(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  return (
    <div>
      <div className="input-container">
        <input
          type="text"
          className="search-input"
          value={inputValue}
          placeholder={placeholder}
          style={customStyles}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={handleInputChange}
        />
        <div className="shortcut-hint">Ctrl + /</div>
      </div>
      {loading ? (
        <h2>Loading.....</h2>
      ) : (
        <Table suggestions={suggestions} loading={loading} error={error} />
      )}
    </div>
  );
};

export default SearchBox;
