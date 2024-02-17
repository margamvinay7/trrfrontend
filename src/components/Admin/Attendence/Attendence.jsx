import React from "react";
import "../Attendence/Attendence.css";
const Attendence = () => {
  return (
    <div className=" bg-adminAttendence attendence min-h-[79vh] containerattendence min-w-[80%] flex  mx-1 flex-col items-center pt-7">
      <h1 className="mb-3 text-xl text-adminyellow">Attendence</h1>
      <div className="input">
        <select className="">
          <option>name</option>
          <option>1</option>
          <option>1</option>
          <option>1</option>
        </select>
        <input type="date"></input>
      </div>
      <div className="Table">
        <table className="table-auto">
          <thead>
            <tr>
              <th>student Name</th>
              <th>9am-11am</th>
              <th>9am-11am</th>
              <th>9am-11am</th>

              <th>9am-11am</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>student</td>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>student</td>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>student</td>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>student</td>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="bg-skyblue m-5 px-3 w-20 rounded-sm">Save</button>
    </div>
  );
};

export default Attendence;
