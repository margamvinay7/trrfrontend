import React from "react";
import "../Results/Results.css";
const StudentResults = () => {
  return (
    <div className="studentResults">
      <div className="exam">
        <h4>Select Exam</h4>
        <select>
          <option>I-Internal Assessment</option>
          <option>I-Internal Assessment</option>
          <option>I-Internal Assessment</option>
          <option>I-Internal Assessment</option>
        </select>
      </div>
      <div className="Table">
        <div>I-Internal Assessment</div>
        <table className="table-auto">
          <thead>
            <th>Department</th>
            <th>Theory 100 Marks</th>
            <th>Practical 100 Marks</th>
          </thead>
          <tbody>
            <tr>
              <td>botony</td>
              <td>100</td>
              <td>100</td>
            </tr>
            <tr>
              <td>botony</td>
              <td>100</td>
              <td>100</td>
            </tr>
            <tr>
              <td>botony</td>
              <td>100</td>
              <td>100</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentResults;
