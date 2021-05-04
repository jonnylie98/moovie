import React from "react";
import useForm from "../hooks/useForm";
import axios from "axios";
import "./Form.css";

const Form = ({ addPlaylist, setPlaylistAdded }) => {
  const [values, handleChange, resetValues] = useForm({
    name: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPlaylist();
    setPlaylistAdded((currAdded) => !currAdded);
    resetValues();
  };

  const createPlaylist = () => {
    axios
      .post("http://localhost:3001/create-playlist", {
        values,
      })
      .then((res) => {
        addPlaylist(res.data.playlists);
      });
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          className="input-text"
          value={values.name}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          className="input-text"
          value={values.description}
          onChange={handleChange}
        />
        <input type="submit" value="SUBMIT" className="submit-btn" />
      </form>
    </div>
  );
};

export default Form;
