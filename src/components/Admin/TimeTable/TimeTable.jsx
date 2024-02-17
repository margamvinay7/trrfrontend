import React from "react";
import "../TimeTable/TimeTable.css";
const TimeTable = () => {
  return (
    <div className="bg-admintimeorange min-h-[79vh] timetable  min-w-[80%] flex  mx-1 flex-col items-center pt-7">
      <h1 className="mb-3">Time Table</h1>
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
        <button>Create New</button>
      </div>
      <div className="mt-5 text-xl">MBBS</div>
      <div className="Table">
        <table className="table-auto">
          <thead>
            <tr>
              <th>Day</th>
              <th>9am-11am</th>
              <th>11am-12noon</th>
              <th>12pm-1pm</th>
              <th>2pm-4pm</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Monday</td>
              <td>Anatomy Dissection</td>
              <td>Anatomy</td>
              <td>Biochemistry</td>
              <td>Histology</td>
            </tr>
            <tr>
              <td>Monday</td>
              <td>Anatomy Dissection</td>
              <td>Anatomy</td>
              <td>Biochemistry</td>
              <td>Histology</td>
            </tr>
            <tr>
              <td>Monday</td>
              <td>Anatomy Dissection</td>
              <td>Anatomy</td>
              <td>Biochemistry</td>
              <td>Histology</td>
            </tr>
            <tr>
              <td>Monday</td>
              <td>Anatomy Dissection</td>
              <td>Anatomy</td>
              <td>Biochemistry</td>
              <td>Histology</td>
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

export default TimeTable;
