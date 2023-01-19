import React from "react";
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
  MDBCardGroup,
  MDBRow
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const Blogs = ({
  title,
  description,
  id,
  excerpt,
  handleDelete,
  publishedBy
}) => {
  return (
    <MDBCol size={4} style={{ marginBottom: "25px" }}>
      <MDBCard
        className="h-100 mt-2"
        style={{ maxWidth: "26rem", background: "#DEE6F2" }}
      >
        <MDBCardBody>
          <MDBCardTitle style={{ textAlign: "left" }}>{title}</MDBCardTitle>
          <MDBCardText style={{ textAlign: "left" }}>
            {excerpt(description)}
            <Link to={`/news/${id}`}>Read More</Link>
          </MDBCardText>{" "}
          <span>
            <MDBBtn
              className="mt-1"
              tag="a"
              style={{ color: "#fff", marginLeft: "10px" }}
              onClick={() => handleDelete(id)}
              color="danger"
            >
              Delete
            </MDBBtn>

            <Link to={`/editNews/${id}`}>
              <MDBBtn
                color="info"
                className="mt-1"
                tag="a"
                style={{ color: "#fff", marginLeft: "10px" }}
              >
                Edit
              </MDBBtn>
            </Link>
          </span>
          <span>
            <MDBCardText
              style={{ textAlign: "Left", fontSize: "15px", marginTop: "10px" }}
            >
              Published By {publishedBy}
            </MDBCardText>
          </span>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default Blogs;
