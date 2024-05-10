import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const SearchComponent = ({ setSearchTerm, textData }) => {
  const [searchInput, setSearchInput] = useState("");
  console.log(textData);
  console.log(textData);
  const handleInputChange = (event, value) => {
    setSearchInput(value);
  };

  const allTasks = [
    ...(textData["High"] || []),
    ...(textData["Medium"] || []),
    ...(textData["Low"] || []),
  ].map((task) => task.name);
  console.log(allTasks);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(searchInput);
  };

  return (
    <form className="rounded-3xl" onSubmit={handleSubmit}>
      <label
        htmlFor="default-search"
        className="mb-2 text-xl font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <Autocomplete
        className="rounded-3xl"
        freeSolo
        options={allTasks} // Add your options here if you have predefined search suggestions
        value={searchInput}
        onChange={handleInputChange}
        sx={{ width: 300, borderRadius: "2rem" }}
        renderInput={(params) => (
          <TextField
            {...params}
            id="default-search"
            className=" p-4 ps-10 text-sm text-gray-600  bg-gray-600  dark:bg-gray-100   "
            placeholder="Search tasks.."
            required
          />
        )}
      />
    </form>
  );
};

export default SearchComponent;
