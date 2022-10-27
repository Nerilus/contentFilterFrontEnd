import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";

const EditContent = ({ contents, updateContent }) => {
  const { id } = useParams();
  const history = useHistory();
  const currentContent = contents.find(
    (content) => content.id === parseInt(id)
  );

  useEffect(() => {
    setUrl(currentContent.url);
    setWord(currentContent.word);
    // setPhone(currentContact.phone);
  }, [currentContent]);

  const [url, setUrl] = useState("");
  const [word, setWord] = useState("");
//   const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkContentUrlExists = contents.filter((content) =>
      content.url === url && content.id !== currentContent.id
        ? content
        : null
    );
    const checkContentWordExists = contents.filter((content) =>
      content.word === word && content.id !== currentContent.id
        ? content
        : null
    );

    if (!url || !word) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkContentUrlExists.length > 0) {
      return toast.error("This email already exists!!");
    }
    if (checkContentWordExists.length > 0) {
      return toast.error("This phone number already exists!!");
    }

    const data = {
      id: currentContent.id,
      url,
      word,
    };

    updateContent(data);
    toast.success("Contact updated successfully!!");
    history.push("/");
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <button
          className="btn btn-dark ml-auto my-5"
          onClick={() => history.push("/")}
        >
          Go back
        </button>
        <div className="col-md-6 mx-auto shadow p-5">
          {currentContent ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  value={url}
                  placeholder={"Url"}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={word}
                  placeholder={"Word"}
                  onChange={(e) => setWord(e.target.value)}
                />
              </div>
              {/* <div className="form-group">
                <input
                  className="form-control"
                  value={phone}
                  placeholder={"Phone"}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div> */}
              <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary">
                  Update Contact
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => history.push("/")}
                >
                  cancel
                </button>
              </div>
            </form>
          ) : (
            <h1 className="text-center">No Contact Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contents: state,
});
const mapDispatchToProps = (dispatch) => ({
  updateContent: (data) => {
    dispatch({ type: "UPDATE_CONTENT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContent);
