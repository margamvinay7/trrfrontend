import "./App.css";
import { useState } from "react";
import Admin from "./components/Admin/Admin";
import { Routes, Route, useLocation } from "react-router";
import Attendence from "./components/Admin/Attendence/Attendence";
import Results from "./components/Admin/Results/Results";
import StudentProfile from "./components/Admin/StudentProfiles/StudentProfile";
import TimeTable from "./components/Admin/TimeTable/TimeTable";
import Logout from "./components/Admin/Logout";
import StudentAttendence from "./components/Student/Attendence/StudentAttendence";
import Profile from "./components/Student/Profile/Profile";
import Student from "./components/Student/Student";
import StudentResults from "./components/Student/Results/StudentResults";
import DateWise from "./components/Student/Attendence/DateWise";
import CreateTimetable from "./components/Admin/TimeTable/CreateTimetable";

function App() {
  const path = useLocation().pathname;
  const pathArray = path.split("/");

  const [route, setRoute] = useState(pathArray.includes("student"));

  return (
    <>
      {route ? <Student /> : <Admin />}
      <Routes>
        <Route path="/" element={<Attendence />} />
        <Route path="/results" element={<Results />} />
        <Route path="/profiles" element={<StudentProfile />} />
        <Route path="/timetable" element={<TimeTable />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/createtimetable" element={<CreateTimetable />} />

        <Route path="/student/profile" element={<Profile />} />
        <Route
          path="/student"
          DateWise={DateWise}
          element={<StudentAttendence />}
        />

        <Route path="/student/results" element={<StudentResults />} />
      </Routes>
    </>
  );
}

export default App;
