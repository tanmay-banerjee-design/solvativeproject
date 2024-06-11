import axios from "axios";
import React from "react";
import SearchBox from "./Components/SearchBox";
import "./App.css";

const apiUrl = import.meta.env.REACT_APP_API_URL;
const apiKey = import.meta.env.REACT_APP_API_KEY;
// const apiHost = import.meta.env.REACT_APP_API_HOST_KEY;
const apiHost = import.meta.env.REACT_APP_API_KEY;

function App() {
  // const staticData = [
  //   "apple",
  //   "banana",
  //   "berrl",
  //   "orange",
  //   "grape",
  //   "mango",
  //   "melon",
  //   "berry",
  //   "peach",
  //   "cherry",
  //   "plum",
  // ];

  const fetchCities = async (namePrefix) => {
    const options = {
      method: "GET",
      url: apiUrl || "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
      params: { countryIds: "IN", namePrefix: `${namePrefix}`, limit: "5" },
      headers: {
        "x-rapidapi-host": apiHost || "wft-geo-db.p.rapidapi.com",
        "x-rapidapi-key":
          apiKey || "4d35f6fb8emshcaf6f5d90be8d67p1919cejsn8dfd8cf9cd8f",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data.data;
    } catch (error) {
      throw new Error("Response is not ok");
    }
  };

  return (
    <main>
      <h1>Search your cities</h1>
      <SearchBox
        placeholder={"Search places..."}
        // staticData={staticData}
        fetchCities={fetchCities}
        dataKey={"city"}
        onSelect={(res) => console.log()}
        onChange={(input) => {}}
        onBlur={(e) => {}}
        onFocus={(e) => {}}
        customStyles={{}}
      />
    </main>
  );
}

export default App;
