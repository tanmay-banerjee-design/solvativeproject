import React from "react";
import "../assets/styles/table.css";
import { getImage } from "../../utils/generics";

const Table = ({ suggestions, loading, error }) => {
  const data = [
    { id: 1, first: "Mark", last: "Otto", handle: "@mdo" },
    { id: 2, first: "Jacob", last: "Thornton", handle: "@fat" },
    { id: 3, first: "Larry the Bird", last: "", handle: "@twitter" },
  ];

  return (
    <table className="table-container">
      <thead>
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {suggestions?.length > 0 &&
          suggestions?.map((n, index) => (
            <tr key={n.id}>
              <td>{index + 1}</td>
              <td>{n?.name}</td>
              <td>
                <span>
                  {" "}
                  <img
                    src={getImage(n?.countryCode)}
                    alt="flag"
                    width="20px"
                    height="20px"
                  />
                  {"  "}
                  {n.country}
                </span>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
