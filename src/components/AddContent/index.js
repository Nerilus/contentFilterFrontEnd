import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const addWord = ({ contents, addContent }) => {
  const [url, setUrl] = useState("");
  const [word, setWord] = useState("");
//   const [phone, setPhone] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkContentUrlExists = contents.filter((content) =>
      content.url === url ? content : null
    );
    const checkContentWordExists = contents.filter((content) =>
      content.word === word ? content : null
    );

    if (!word || !url) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkContentUrlExists.length > 0) {
      return toast.error("This email already exists!!");
    }
    if (checkContentWordExists.length > 0) {
      return toast.error("This phone number already exists!!");
    }

    const data = {
      id: contents.length > 0 ? contents[contents.length - 1].id + 1 : 0,
      url,
      word,
    };

    addContent(data);
    toast.success("Contact added successfully!!");
    history.push("/");
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center text-dark py-3 display-2">ADD url</h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="form-group">
              <textarea name="textarea"
                className="form-control"
                type="email"
                placeholder="Word"
                value={word}
                onChange={(e) => setWord(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="Add Content"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contents: state,
});
const mapDispatchToProps = (dispatch) => ({
  addContent: (data) => {
    dispatch({ type: "ADD_CONTENT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(addWord);
