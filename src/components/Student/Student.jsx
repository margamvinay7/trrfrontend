import { Link } from "react-router-dom";
import "./Student.css";
const Student = () => {
  return (
    <div className="student">
      <div className="custom-heading">
        <h1>Student Info</h1>
      </div>
      <div className=" bg-studentgray">
        <div className="info">
          <div>
            Full Name&nbsp;&nbsp;&nbsp; : &nbsp;
            <strong className="text-nowrap">Sripathi Hari Kishan</strong>
          </div>
          <div>
            Roll No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :
            &nbsp;42060867665
          </div>
          <div>
            Year&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            : &nbsp;I-Year MBBS
          </div>
          <div>Acad. year&nbsp;&nbsp; : &nbsp;2024-25</div>
        </div>
      </div>
      <div className="years">
        <button>I-Year</button>
        <button>II-Year</button>
        <button>III-Year</button>
        <button>IV-Year</button>
      </div>
      <div className="custom-nav">
        <button className=" bg-studentattendenceblue1">
          <Link to="/student">Attendence</Link>
        </button>
        <button className=" bg-studentresult">
          <Link to="/student/results">Results</Link>
        </button>
        <button className=" bg-studentresult">
          <Link to="/student/profile"> Profiles</Link>
        </button>

        <button className=" bg-red-600">
          <Link to="/logout">Log out</Link>
        </button>
      </div>
    </div>
  );
};

export default Student;
