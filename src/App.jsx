import React, { useEffect, useState } from "react";
import { EmployeeData } from "./EmpData";

const App = () => {
  const [data, setdata] = useState([]);
  const [id, setid] = useState(0);
  const [firstname, setfirstname] = useState("");
  const [secondname, setsecondname] = useState("");
  const [age, setage] = useState(0);
  const [isUpdated, setisUpdated] = useState(false);

  useEffect(() => {
    setdata(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.filter((item) => item.id === id);
    setisUpdated(true);
    if (dt != undefined) {
      setid(id);
      setfirstname(dt[0].firstname);
      setsecondname(dt[0].secondname);
      setage(dt[0].age);
    }
  };
  const handleDelete = (id) => {
    // id > 0 ? setdata(data.filter((item) => item.id !== id)) : "cannot delete";
    if (id > 0) {
      if (window.confirm("Are you sure you want to delete")) {
        setdata(data.filter((item) => item.id !== id));
      }
    }
  };
  const handleSave = (e) => {
    e.preventDefault();
    let error = "";

    if (firstname === "") {
      error += "First name is required, ";
    }
    if (secondname === "") {
      error += "second name is required, ";
    }
    if (age <= 0) {
      error += "age is required, ";
    }

    if (error === "") {
      const dt = [...data];
      const newData = {
        id: EmployeeData.length + 1,
        firstname: firstname,
        secondname: secondname,
        age: age,
      };
      dt.push(newData);
      setdata(dt);
    } else {
      alert(error);
    }
  };
  const handleUpdate = () => {
    const index = data
      .map((item) => {
        return item.id;
      })
      .indexOf(id);

    const dt = [...data];
    dt[index].id = id;
    dt[index].firstname = firstname;
    dt[index].secondname = secondname;
    dt[index].age = age;

    setdata(dt);
    handleClear();
  };
  const handleClear = () => {
    setid(0);
    setfirstname("");
    setsecondname("");
    setage(0);
    setisUpdated(false);
  };
  return (
    <div className="h-screen  w-screen ">
      <div className="flex items-center py-2">
        <div className="ml-5">
          <label>
            First name:{" "}
            <input
              type="text"
              placeholder="Enter First name"
              onChange={(e) => setfirstname(e.target.value)}
              value={firstname}
            />
          </label>
          <label className="ml-2">
            Second name:{" "}
            <input
              type="text"
              placeholder="Enter second name"
              onChange={(e) => setsecondname(e.target.value)}
              value={secondname}
            />
          </label>
          <label className="ml-2 mr-4">
            Age:{}
            <input
              type="text"
              placeholder="Enter Age"
              onChange={(e) => setage(e.target.value)}
              value={age}
            />
          </label>
        </div>
        <div>
          {!isUpdated ? (
            <button
              onClick={(e) => handleSave(e)}
              className="bg-blue-300 rounded-xl px-3 py-2 mr-2"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => handleUpdate()}
              className="bg-blue-300 rounded-xl px-3 py-2 mr-2"
            >
              Update
            </button>
          )}

          <button
            onClick={() => handleClear()}
            className="bg-red-300 rounded-xl px-3 py-2"
          >
            Clear
          </button>
        </div>
      </div>
      <table className=" w-full ml-5  ">
        <thead className=" font-semibold">
          <tr>
            <td className="pb-4 pt-3 border-y-2">Sr .No</td>
            <td className="pb-4 pt-3 border-y-2">ID</td>
            <td className="pb-4 pt-3 border-y-2">First name</td>
            <td className="pb-4 pt-3 border-y-2">Last name</td>
            <td className="pb-4 pt-3 border-y-2">Age</td>
            <td className="pb-4 pt-3 border-y-2">Actions</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td className="border-y-2 p-[5px]">{index + 1}</td>
                <td className="border-y-2 p-[5px]">{item.id}</td>
                <td className="border-y-2 p-[5px]">{item.firstname}</td>
                <td className="border-y-2 p-[5px]">{item.secondname}</td>
                <td className="border-y-2 p-[5px]">{item.age}</td>
                <td className="border-y-2 p-[5px]">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-blue-300 rounded-xl px-3 py-2 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-300 rounded-xl px-3 py-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
