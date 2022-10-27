import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Home = ({ contents, deleteContent }) => {
  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <Link to="/add" className="btn btn-outline-dark my-5 ml-auto ">
         Add Content
        </Link>
        <div className="col-md-10 mx-auto my-4">
          <table className="table table-hover">
            <thead className="table-header bg-dark text-white">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {contents.length > 0 ? (
                contents.map((content, id) => (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{content.url}</td>
                    <td>{content.word}</td>
                    {/* <td>{contact.phone}</td> */}
                    <td>
                      <Link
                        to={`/edit/${content.id}`}
                        className="btn btn-sm btn-primary mr-1"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => deleteContent(content.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th>No contacts found</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contents: state,
});

const mapDispatchToProps = (dispatch) => ({
  deleteContent: (id) => {
    dispatch({ type: "DELETE_CONTENT", payload: id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
