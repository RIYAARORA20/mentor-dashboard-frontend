import React, { useEffect, useState } from "react";
import "./table.css";
import axios from "axios";
import printJS from 'print-js'
import { Link, useNavigate } from "react-router-dom";

const StudentTable = () => {
  const [data1, setData] = useState([]);
  const [cdata, setCData] = useState([]);
  const [students, setStudents] = useState([]);
  const [type, setType] = useState("All");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/get")
      .then((res) => {
        setData(res.data.response);
        setCData(res.data.response);
        console.log(res);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // console.log(data1);
  const handleSubmit = async() => {
    const pandingStudent = data1.filter(
      (item) => !item.Viva || !item.Execution || !item.Idea
    );
    if (pandingStudent.length > 0) {
      alert("Please update pending fields");
    } else {
      //alert("Data Submitted  Successfully!");
      const response = await axios.get(process.env.REACT_APP_API_URL + "/get");
      const students= response.data.response;
      console.log(students); 

      const receiverMail = prompt("Enter receiver's mail"); 
      const mailResponse = await axios.post(process.env.REACT_APP_API_URL + "/mail", { receiverMail }); 
      alert(`${mailResponse.data}. Generating PDF`); 

      printJS({
        printable: students,
        properties: ['Name', 'Rollno', 'Execution', 'Idea', 'Viva'],
        type: 'json'
      })
      // for (let student of students){
        // console.log(student.Name)
      // }
    }
  };

  const handleCheckboxChange = (index) => {
    const isChecked = selectedCheckboxes.includes(index);

    if (isChecked) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((item) => item !== index)
      );
    } else {
      if (selectedCheckboxes.length < 4) {
        setSelectedCheckboxes([...selectedCheckboxes, index]);
      }
    }
  };
  const filteredData = data1.filter((item) => {
    if (type === "All") {
      return true;
    } else if (type === "Evaluated") {
      return item.Viva && item.Execution && item.Idea;
    } else if (type === "Not Evaluated") {
      return !item.Viva || !item.Execution || !item.Idea;
    }
  });

  const addOrRemove = (name) => {
    const newStudents = [...students];
    const index = newStudents.indexOf(name);
    if (index === -1) {
      newStudents.push(name);
    } else {
      newStudents.splice(index, 1);
    }
    setStudents(newStudents);
    console.log(students);
  };
  return (
    <>
      <div >
        <div className="container">
        <div className="heading">
          <h1>LIST OF STUDENTS</h1>
        </div>
        <div className="first">
          <span className="second" style={{ width: "35px" }}>
            <p>Filter:</p>
          </span>
          {/* <span className="second">
            <input type="radio" id="ev1" name="abc" ></input>
            <label for="ev1" style={{cursor:'pointer'}}>All</label>
          </span>
          <span className="second">
            <input type="radio" id="ev" name="abc"></input>
            <label for="ev" style={{cursor:'pointer'}}>Evaluated</label>
          </span>
          <span className="second">
            <input type="radio" name="abc" id="nv"></input>
            <label for="nv" style={{cursor:'pointer'}}>Not Evaluated</label>
  </span> */}
          <label>
            <select
              className="con"
              onChange={(e) => {
                const val = e.target.value;
                setType(val);
              }}
            >
              <option value="All">All</option>
              <option value="Evaluated">Evaluated</option>
              <option value="Not Evaluated">Not Evaluated</option>
            </select>
          </label>
        </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="check">
                Select
              </th>
              <th scope="col" className="check">
                Name
              </th>
              <th scope="col" className="check">
                Roll No.
              </th>
              <th scope="col" className="check">
                Evaluation
              </th>
            </tr>
          </thead>
          <tbody id="tbody">
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    className="tick"
                    checked={selectedCheckboxes.includes(index)}
                    onChange={() => addOrRemove(item.Rollno)}
                    onClick={() => handleCheckboxChange(index)}
                    disabled={
                      (item.Viva && item.Execution && item.Idea) ||
                      (selectedCheckboxes.length >= 4 &&
                        !selectedCheckboxes.includes(index))
                    }
                  ></input>
                </td>
                <td className="name">{item.Name}</td>
                <td className="name">{item.Rollno}</td>
                <td className="name">
                  {item.Viva && item.Execution && item.Idea
                    ? "Done"
                    : "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <div className="btn-1">
          <button type="onClick" className="button-25 button-25:hover" onClick={handleSubmit}>
            Submit
          </button>
          <button
            onClick={() =>
              students.length < 3
                ? alert("Select at least 3 student")
                : navigate("/edit", { state: { students: students } })
            }
            className="button-25"
          >
            Go To Evaluation
          </button>
        </div>
      </div>
    </>
  );
};

export default StudentTable;
