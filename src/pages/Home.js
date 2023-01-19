import axios from "axios";
import React, { useState, useEffect } from "react";
import { MDBRow, MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import Blogs from "../components/Detail";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

const Home = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(12);

  useEffect(() => {
    loadBlogsData();
  }, []);

  const loadBlogsData = async () => {
    const response = await axios.get(
      "https://63c6d969d307b76967426ae3.mockapi.io/api/news"
    );
    if (response.status === 200) {
      setData(response.data);
    } else {
      toast.error("Something went wrong");
    }
  };

  console.log("data", data);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure that you to delete the blog?")) {
      const response = await axios.delete(
        `https://63c6d969d307b76967426ae3.mockapi.io/api/news/${id}`
      );
      if (response.status === 200) {
        toast.success("blog Deleted Successfully");
        loadBlogsData();
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const excerpt = (str) => {
    if (str?.length > 100) {
      str = str.substring(0, 100) + " ... ";
    }
    return str;
  };

  const onInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://63c6d969d307b76967426ae3.mockapi.io/api/news?search=${searchValue}`
    );
    if (response.status === 200) {
      setData(response.data);
    } else {
      toast.error("Something went wrong");
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // Records to be displayed on the current page
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage);

  return (
    <div>
      <Search
        searchValue={searchValue}
        onInputChange={onInputChange}
        handleSearch={handleSearch}
      />
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <MDBRow>
        {data.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Blog Found
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow>
              {currentRecords &&
                currentRecords.map((item, index) => (
                  <Blogs
                    key={index}
                    {...item}
                    npm
                    excerpt={excerpt}
                    handleDelete={handleDelete}
                  />
                ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;
