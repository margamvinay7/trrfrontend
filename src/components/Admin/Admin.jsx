import React from "react";

import "./Admin.css";

import { Link } from "react-router-dom";
const Admin = () => {
  //   const isActive = useLocation().pathname == path;

  //   const handlePath = (path) => {
  //     if (isActive == path) {
  //       return true;
  //     }
  //     return false;
  //   };
  return (
    <div className="Admin">
      <div className="custom-heading">
        <h1>Admin Login</h1>
      </div>
      <div className="custom-nav">
        <button>
          <Link to="/">Attendence</Link>
        </button>
        <button>
          <Link to="/results">Results</Link>
        </button>
        <button>
          <Link to="/profiles">Student Profiles</Link>
        </button>
        <button>
          <Link to="/timetable">Time Table</Link>
        </button>
        <button>
          <Link to="/logout">Log out</Link>
        </button>
      </div>
    </div>
  );
};

export default Admin;
