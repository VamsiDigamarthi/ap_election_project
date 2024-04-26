import React, { useEffect, useState } from "react";
import "./UserData.css";
import * as XLSX from "xlsx";
import { APIS, headers } from "../../data/header";
import { SpinnerDotted } from "spinners-react";
const UserData = () => {
  const [userData, setUserData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    APIS.get("/user/fetch/all/user/available", {
      headers: headers,
    })
      .then((res) => {
        setLoading(false);
        // console.log(res);
        setUserData(res.data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  const onExelDownload = (e) => {
    const ws = XLSX.utils.json_to_sheet(userData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "userData" + ".xlsx");
  };

  // console.log(userData);

  return (
    <div className="user-data-main">
      <h2>Users Data</h2>
      {loading ? (
        <SpinnerDotted size={50} thickness={100} speed={100} color="#36ad47" />
      ) : (
        <button onClick={onExelDownload}>Download</button>
      )}
    </div>
  );
};

export default UserData;
