import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./table.css";

const Evaluation = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const { students } = location.state;
  console.log(location)
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [marks, setMarks] = useState([]);
  useEffect(() => {
    axios
      .post(process.env.REACT_APP_API_URL + "/edit", {
        selected: students,
      })
      .then((res) => {
        setData(res.data.response);
        setMarks(res.data.response);
        console.log(res);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const upload = () => {
    console.log({marks}); 
    console.log("MARKS: "); 
    axios
      .post(process.env.REACT_APP_API_URL + "/submit", {
        updated: marks,
      })
      .then((res) => {
        setData(res.data.response);
        setMarks(res.data.response);
        console.log(res);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  return (
    <div>
      <h1 className="heading">Evaluation Sheet</h1>
      <form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Roll No.</th>
            <th scope="col">Idea(10)</th>
            <th scope="col">Execution(10)</th>
            <th scope="col">Viva(10)</th>
          </tr>
        </thead>
        <tbody className="name" id="tbody">
          {data.map((item) => (
            <tr key={item.Rollno}>
              <td>{item.Name}</td>
              <td>{item.Rollno}</td>
              <td>
                {item.Idea ? (
                  item.Idea
                ) : (
                  <input
                    type="number" required
                    value={marks.find(
                      (ele) => (ele.Rollno === item.Rollno).Idea
                    )}
                    onChange={(e) => {
                      setMarks(
                        marks.map((ele) =>
                          item.Rollno === ele.Rollno
                            ? { ...ele, Idea: e.target.value }
                            : ele
                        )
                      );
                      setError(false);
                    }}
                  ></input>
                )}
              </td>
              <td>
                {item.Execution ? (
                  item.Execution
                ) : (
                  <input
                    type="number"
                    required
                    value={marks.find(
                      (ele) => (ele.Rollno === item.Rollno).Execution
                    )}
                    onChange={(e) => {
                      setMarks(
                        marks.map((ele) =>
                          item.Rollno === ele.Rollno
                            ? { ...ele, Execution: e.target.value }
                            : ele
                        )
                      );
                      setError(false);
                    }}
                  ></input>
                )}
              </td>
              <td>
                {item.Viva ? (
                  item.Viva
                ) : (
                  <input
                    type="number"
                    required
                    value={marks.find(
                      (ele) => (ele.Rollno === item.Rollno).Viva
                    )}
                    onChange={(e) => {
                      setMarks(
                        marks.map((ele) =>
                          item.Rollno === ele.Rollno
                            ? { ...ele, Viva: e.target.value }
                            : ele
                        )
                      );
                      setError(false);
                    }}
                  ></input>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <div className="btn-1">
        <button
          type="onClick"
          onClick={(e) => {
            e.preventDefault();
            let alerted = false; 
            
            marks.forEach((item) => {
              if((!item.Evaluation ||!item.Viva ||!item.Rollno)){
                if(!alerted){
                alert("Please enter the values");
                alerted =true;
                }
              }
              if ((item.Execution > 10) || (item.Viva > 10) || (item.Idea > 10)) {
                  if (!alerted) {
                    alert("Please upload value less than 10");
                    alerted = true; 
                  }
              }
              else {
                
                if (!alerted) {navigation("/");
                upload();}
              }
            }
            );
          }}
          className="button-25"
        >
          Submit
        </button>
        {/* <Link to="/" state={{students:students}}> */}
        <button
          type="onClick"
          onClick={(e) =>{e.preventDefault()
           navigation(-1)}}
          className="button-25"
        >
          Reselect
        </button>

        {/* </Link> */}
      </div>
      </form>
      <div style={{ textAlign: "center", color: "red" }}>
        {error ? <p>Please fill all the fields!!</p> : null}
      </div>
    </div>
  );
};

export default Evaluation;
