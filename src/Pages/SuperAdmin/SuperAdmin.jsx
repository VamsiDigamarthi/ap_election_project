import React, { useEffect, useState } from "react";
import "./SuperAdmin.css";

import { APIS, headers } from "../../data/header";
import * as XLSX from "xlsx";

const SuperAdmin = () => {
  // all user fetch where sroce is grether than equal to 8
  const [bulkUploadDisplayMsg, setBulkUploadDisplayMsg] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState("");
  const [typeerror, setTypeError] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setTypeError("Please Select Excel File");
        setExcelFile(null);
      }
    }
  };

  // use Effect
  useEffect(() => {
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    }
  }, [excelFile]);

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    console.log(excelData);
    setLoading(true);
    await APIS.post("/state/bulk-upload", excelData, {
      headers: headers,
    })
      .then((res) => {
        // console.log(res.data);
        setBulkUploadDisplayMsg(res.data);
        setExcelData("");
        setLoading(false);
      })
      .catch((e) => {
        console.log(e?.response?.data?.msg);
        setBulkUploadDisplayMsg(e?.response?.data);
      });
  };

  // console.log(excelData);
  return (
    <div className="super__admin__main__card">
      <span className="all__pages__over__view">Over View</span>
      <div className="file__uploaded_super_main_card">
        <div className="side_bar_upload_cams_data_card">
          <h2>Upload a Cams Data</h2>
        </div>
        {/*  */}
        <form className="bulk__upload__main__card" onSubmit={handleFileSubmit}>
          <input
            type="file"
            className="upload__input__tag"
            required
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={handleFile}
            // value={""}
          />

          <button type="submit">{loading ? "Loading ...!" : "UPLOAD"}</button>
        </form>
        {bulkUploadDisplayMsg && (
          <p
            style={{
              color: "lightslategrey",
              fontSize: "20px",
            }}
          >
            {bulkUploadDisplayMsg.msg}
          </p>
        )}
        {typeerror && <div className="file_type_not_match">{typeerror}</div>}
      </div>
    </div>
  );
};

export default SuperAdmin;
