import React from "react";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";

const Search = ({ handleSearch, searchValue, onInputChange }) => {
  return (
    <div className="searchForm">
      <form className="d-flex" onSubmit={handleSearch}>
        <MDBInput
          type="search"
          className="form-control"
          placeholder="Search Blog ..."
          value={searchValue}
          onChange={onInputChange}
        ></MDBInput>
        <div>
          <MDBBtn
            type="submit"
            style={{ marginLeft: "25px", background: "#9e4299" }}
          >
            Search
          </MDBBtn>
        </div>
      </form>
    </div>
  );
};

export default Search;
