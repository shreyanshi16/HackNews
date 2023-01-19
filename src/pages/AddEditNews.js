import React, { useEffect, useState } from "react";
import { MDBValidation, MDBInput, MDBBtn, MDBTextArea } from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  description: "",
  // imageUrl: "",
  publishedBy: ""
};

const AddEditNews = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const { title, description, publishedBy } = formValue;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      getSingleBlog(id);
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id]);

  const getSingleBlog = async (id) => {
    const singleBlog = await axios.get(
      `https://63c6d969d307b76967426ae3.mockapi.io/api/news/${id}`
    );
    if (singleBlog.status === 200) {
      setFormValue({ ...singleBlog.data });
    } else {
      toast.error("Something went wrong");
    }
    setFormValue({ ...singleBlog.data });
  };

  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description && publishedBy) {
      const currentData = getDate();
      if (!editMode) {
        const updatednewsData = { ...formValue, date: currentData };
        const response = await axios.post(
          "https://63c6d969d307b76967426ae3.mockapi.io/api/news",
          updatednewsData
        );
        if (response.status === 201) {
          toast.success("News Created Successfully");
        } else {
          toast.error("Something went wrong");
        }
      } else {
        const response = await axios.put(
          `https://63c6d969d307b76967426ae3.mockapi.io/api/news/${id}`,
          formValue
        );
        if (response.status === 200) {
          toast.success("Blog Updated Successfully");
        } else {
          toast.error("Something went wrong");
        }
      }

      setFormValue({ title: "", description: "", publishedBy: "" });
      navigate("/");
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  //const onUploadImage = (file) => {

  //console.log("file", file);
  //const formData = new FormData();
  //formData.append("file", file);

  //axios.post("https://63c6d969d307b76967426ae3.mockapi.io/api/news", formData)
  // .then((res) => {
  // toast.info("Image Uploaded Successful");
  // console.log("Response",res);
  // setFormValue({...formValue,imageUrl: res.data.url})
  //    }).catch((err)=>{
  //       toast.error("Something went wrong");
  //    });
  // };
  return (
    <MDBValidation
      className="row g-3 sm"
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="fs-2 fw-bold">
        {editMode ? "Update Blog ✏️" : "ADD BLOG 📜"}
      </p>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center"
        }}
      >
        <MDBInput
          value={title}
          name="title"
          type="text"
          onChange={onInputChange}
          required
          label="Title"
          validation="Please provide a title"
          invalid
        />
        <br />
        <MDBTextArea
          value={description}
          name="description"
          type="text"
          onChange={onInputChange}
          required
          label="Description"
          validation="Please provide a description"
          textarea
          rows={4}
          invalid
          maxLength={2000}
        />
        <br />
        <MDBInput
          value={publishedBy}
          name="publishedBy"
          type="text"
          onChange={onInputChange}
          required
          label="PublishedBy"
          validation="Please provide author name"
          invalid
        />
        <br />
        <MDBBtn type="submit" style={{ marginRight: "10px" }}>
          {editMode ? "Update" : "Add"}
        </MDBBtn>
        <MDBBtn
          color="danger"
          style={{ marginRight: "10px" }}
          onClick={() => navigate("/")}
        >
          Go Back
        </MDBBtn>
      </div>
    </MDBValidation>
  );
};

export default AddEditNews;
