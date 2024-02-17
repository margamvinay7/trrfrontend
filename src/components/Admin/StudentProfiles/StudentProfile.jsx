import React from "react";
import "../StudentProfiles/StudentProfile.css";
const StudentProfile = () => {
  return (
    <div className="bg-adminprofile min-h-[79vh] profiles  min-w-[80%] flex  mx-1 flex-col items-center pt-7">
      <h1 className="mb-3">Student Profiles</h1>
      <div className="input">
        <select>
          <option>name</option>
          <option>1</option>
          <option>1</option>
          <option>1</option>
        </select>
        <select>
          <option>name</option>
          <option>1</option>
          <option>1</option>
          <option>1</option>
        </select>
        <button>Upload</button>
      </div>
      <div className="Table">
        <table className="table-auto">
          <thead>
            <tr>
              <th>Roll No.</th>
              <th>Student Name</th>
              <th>Gender</th>
              <th>Mobile</th>

              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>4887346734834 </td>
              <td>sripathi Hari kishan</td>
              <td>Male </td>
              <td>4887346734834 </td>
              <td>Myname@gmail.com </td>
            </tr>
            <tr>
              <td>4887346734834 </td>
              <td>sripathi Hari kishan</td>
              <td>Male </td>
              <td>4887346734834 </td>
              <td>Myname@gmail.com </td>
            </tr>
            <tr>
              <td>4887346734834 </td>
              <td>sripathi Hari kishan</td>
              <td>Male </td>
              <td>4887346734834 </td>
              <td>Myname@gmail.com </td>
            </tr>
            <tr>
              <td>4887346734834 </td>
              <td>sripathi Hari kishan</td>
              <td>Male </td>
              <td>4887346734834 </td>
              <td>Myname@gmail.com </td>
            </tr>
            <tr>
              <td>4887346734834 </td>
              <td>sripathi Hari kishan</td>
              <td>Male </td>
              <td>4887346734834 </td>
              <td>Myname@gmail.com </td>
            </tr>
            <tr>
              <td>4887346734834 </td>
              <td>sripathi Hari kishan</td>
              <td>Male </td>
              <td>4887346734834 </td>
              <td>Myname@gmail.com </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="actions">
        <button>Save</button>
        <button>Edit</button>
      </div>
    </div>
  );
};

export default StudentProfile;
