import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { API } from "../../Student/Student";
const UpdateProfile = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    id: "",
    fullName: "",
    year: "",
    academicyear: "",
    email: "",
    gender: "",
    mobile: "",
    joiningyear: "",
    address: "",
  });

  //   const imageToBinary = (file) => {
  //     return new Promise((resolve, reject) => {
  //       const reader = new FileReader();

  //       reader.onload = () => {
  //         const binaryString = reader.result;
  //         const binary = new Uint8Array(binaryString);
  //         resolve(binary);
  //       };

  //       reader.onerror = (error) => {
  //         reject(error);
  //       };

  //       reader.readAsArrayBuffer(file);
  //     });
  //   };

  const imageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const [image, setImage] = useState(null);
  const getStudent = async () => {
    const response = await API.get(`/getStudentById/${state.id}`).then(
      (res) => {
        setStudent(res?.data);
      }
    );
  };
  const { state } = useLocation();

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    if (name == "image") {
      //   setStudent((prevStudent) => ({
      //     ...prevStudent,
      //     [name]: event.target.files[0],
      //   }));
      const file = event.target.files[0];
      try {
        const base64Image = await imageToBase64(file);
        setImage(base64Image);
        console.log(base64Image); // Base64 image data
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
      //   console.log(event.target.files[0]);
      //   setImage(event.target.files[0]);
    } else {
      setStudent((prevStudent) => ({
        ...prevStudent,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("st", student);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("id", student.id);
      formData.append("fullName", student.fullName);
      formData.append("year", student.year);
      formData.append("academicyear", student.academicyear);
      formData.append("email", student.email);
      formData.append("gender", student.gender);
      formData.append("mobile", student.mobile);
      formData.append("joiningyear", student.joiningyear);
      formData.append("address", student.address);

      // Send updated student data to the server
      const response = await API.put(
        `/updateStudent`,

        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("re", response);
      toast.success("Student updated successfully!");
      console.log("Student updated successfully!");
      setTimeout(() => {
        navigate("/profiles");
      }, 1000);
    } catch (error) {
      toast.error("Failed to Update Student");
      console.error("Error updating student:", error);
      setTimeout(() => {
        navigate("/profiles");
      }, 1000);
    }
  };

  useEffect(() => {
    if (state.id) {
      getStudent();
    }
  }, [state]);
  return (
    <div className=" bg-adminprofile min-h-[90vh] flex   justify-center py-10">
      <div className="flex flex-col items-center gap-x-1">
        <h2 className="text-black text-lg mb-5 ">Update Profile</h2>
        <Toaster />
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="flex gap-y-2 flex-col"
        >
          <div className=" flex gap-x-2">
            <label>
              Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              :&nbsp;
            </label>
            <input
              type="text"
              name="fullName"
              className=" p-1 rounded-sm"
              value={student.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className=" flex gap-x-2">
            <label>
              Roll
              No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
            </label>
            <input
              type="text"
              name="id"
              className=" p-1 rounded-sm"
              value={student.id}
              onChange={handleInputChange}
            />
          </div>

          <div className=" flex gap-x-2">
            <label>
              Year&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp; :&nbsp;
            </label>
            <input
              className=" p-1 rounded-sm"
              type="text"
              name="year"
              value={student.year}
              onChange={handleInputChange}
            />
          </div>
          <div className=" flex gap-x-2">
            <label>Academic Year &nbsp;:&nbsp;</label>
            <input
              className=" p-1 rounded-sm"
              type="text"
              name="academicyear"
              value={student.academicyear}
              onChange={handleInputChange}
            />
          </div>
          <div className=" flex gap-x-2">
            <label>
              Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              :&nbsp;
            </label>
            <input
              className=" p-1 rounded-sm"
              type="text"
              name="email"
              value={student.email}
              onChange={handleInputChange}
            />
          </div>
          <div className=" flex gap-x-2">
            <label>
              Mobile&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
            </label>
            <input
              className=" p-1 rounded-sm"
              type="text"
              name="mobile"
              value={student.mobile}
              onChange={handleInputChange}
            />
          </div>
          <div className=" flex gap-x-2">
            <label>
              Gender&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
            </label>
            <input
              className=" p-1 rounded-sm"
              type="text"
              name="gender"
              value={student.gender}
              onChange={handleInputChange}
            />
          </div>
          <div className=" flex gap-x-2">
            <label>
              Joining Year&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
            </label>
            <input
              className=" p-1 rounded-sm"
              type="text"
              name="joiningyear"
              value={student.joiningyear}
              onChange={handleInputChange}
            />
          </div>
          <div className=" flex gap-x-2">
            <label>
              Address&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
            </label>
            <input
              className=" p-1 w-96 rounded-sm"
              type="text"
              name="address"
              value={student.address}
              onChange={handleInputChange}
            />
          </div>
          <div className=" flex gap-x-2">
            <label>
              Photo&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
            </label>
            <label
              htmlFor="studentimage"
              className=" bg-slate-400 p-1 rounded-sm w-48 text-center hover:bg-slate-600"
            >
              {" "}
              Upload Photo
            </label>
            <input
              type="file"
              id="studentimage"
              accept="image/*"
              className=" absolute -top-[1000px] p-1 rounded-sm"
              name="image"
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            className=" w-48 ms-44 bg-adminprofileblue1 hover:bg-sky-400 p-1 rounded-sm"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
