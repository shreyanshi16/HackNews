import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBimage,
  MDBtext,
  MDBBtn,
  MDBIcon,
  MDBCardTitle,
  MDBCardText,
  MDBContainer,
  MDBTypography
} from "mdb-react-ui-kit";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const News = () => {
  const [news, setNews] = useState();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleNews(true);
    }
  }, [id]);

  const getSingleNews = async () => {
    const config = {
      headers: { "X-Requested-With": "XMLHttpRequest" }
    };
    const response = await axios.get(
      `https://63c6d969d307b76967426ae3.mockapi.io/api/news/${id}`
    );

    if (response.status === 200) {
      setNews(response.data);
    } else {
      toast.error("Something went wrong");
    }
  };

  const styleInfo = {
    display: "inline",
    margination: "5px",
    float: "right",
    marginTop: "7px"
  };
  return (
    <MDBContainer style={{ marginTop: "20px" }}>
      <Link to="/">
        <strong style={{ float: "left", color: "black" }} className="mt-3">
          Go Back
        </strong>
      </Link>
      <br />
      <MDBTypography
        tag="h2"
        className="text-muted mt-2"
        style={{ display: "inline-block", textAlign: "left" }}
      >
        {news && news.title}
      </MDBTypography>
      <div style={{ marginTop: "10px", textAlign: "left" }}>
        <div style={{ height: "50px", background: "#f6f6f6" }}>
          <strong
            style={{ float: "left", marginTop: "12px", marginLeft: "2px" }}
          >
            {news && news.createdAt}
          </strong>
        </div>
        <MDBTypography className="lead md-0" style={{ marginTop: "10px" }}>
          {news && news.description}
        </MDBTypography>
      </div>
    </MDBContainer>
  );
};

export default News;
