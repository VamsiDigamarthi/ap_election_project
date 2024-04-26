import React, { useEffect, useState } from "react";
import "./Admin.css";
import * as XLSX from "xlsx";
import Chart from "react-apexcharts";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { APIS, headers } from "../../data/header";
import {
  errorMsgApi,
  pleaseChoosImages,
  resizeFile,
  staticTaskAccepted,
  updatesStaticTask,
  uploadImageAllSucceww,
} from "../../util/showmessages";
const Admin = () => {
  const UUU = useSelector((state) => state.authReducer.authData);

  // THIS ALL STATES ARE STORE CHARTS VALUES
  const options = {
    labels: ["Assign", "Not Assign"],
    colors: ["#b8bbbf", "#ff6f00"],
  };
  const locationOptions = {
    labels: ["Assign Locations", "Not Assign Locations"],
    colors: ["#b8bbbf", "#ff6f00"],
  };
  const [update, setUpdate] = useState([30, 70]);
  const [updateLocations, setUpdateLocations] = useState([70, 30]);

  //  STORE PS-DETAILS COORESPONDING DISTRICT COORDINATOR
  const [psAcDetailsBasedOnDistrictCoor, setPsAcDetailsBasedOnDistrictCoor] =
    useState([]);

  // STORE THE TASKS FROM DISTRICT COORDINATORS
  const [ownTask, setOwnTask] = useState([]);

  // STORE UNIQUE LOCATIONS
  const [psDetailsUniqueLocations, setPsDetailsUniqueLocations] = useState([]);

  // STORE UNIQUE LOCATIONS ASSIGN TASK PERCENTAGES
  const [uniqueLocationsAssign, setUniqueLocationsAssign] = useState([]);

  //  STORE UNIQUE LOCATIONS NOT ASSIGN TASK PERCENTAGES
  const [uniqueNotAssignLocations, setUniqueNotAssignLocations] = useState([]);

  // THIS IS PS-NUMBERS PIE-CHART VALUES STORE STATE
  const [psChartNumber, setPsChartNumber] = useState([]);

  // THIS IS LOCATION PIE-CHART VALUES STORE STATE
  const [locationChartNumber, setLocationChartNumber] = useState([]);

  // STORE THE SUB-TASKS AFTER FILTERING THE TASK
  const [firstSubTask, setFirstSubTask] = useState([]);
  const [secondSubTask, setSecondSubTask] = useState([]);

  // AFTER FILTERING COMPLTED TASK STORE PERCENTAGES
  const [firstTaskPercentage, setFirstTaskPercentage] = useState(0);
  const [secondTaskPercentage, setSecondTaskPercentage] = useState(0);

  // all user fetch where sroce is grether than equal to 8
  const [bulkUploadDisplayMsg, setBulkUploadDisplayMsg] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState("");
  const [typeerror, setTypeError] = useState(null);
  // assign ps state

  const [assignPs, setAssignPs] = useState(0);
  const [notAssignPs, setNotAssignPs] = useState(0);

  // KIT RECEVIED IMAGES AND ERROR STORE STATES
  const [kitStatedImageFromFile, setKitStatedImageFromFile] = useState("");
  const [kitStartedErrorMsg, setKitStartedErrorMsg] = useState("");

  // STORE ALL ASSEMBLY COORDINATOR
  const [allAssemblyCoor, setAllAssemblyCoor] = useState([]);

  // INITIALLY PS-DETAILS FETCH FROM DATABASE - COORESPONDING DISTRICT COORDINATOR
  const onPsDetailsBasedOnDistrict = () => {
    let district = UUU?.district;
    APIS.get(`/district/district-coor-ps-ac-number/${district}`, {
      headers: headers,
    })
      .then((res) => {
        console.log(res.data);
        setPsAcDetailsBasedOnDistrictCoor(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // INITIALLY FETCH ALL DISTRICT COORDINATOR TASKS
  const onFetchAllTaskDistrictCoor = () => {
    let id = UUU?._id;
    APIS.get(
      `/state/distrci/task/${id}`,

      {
        headers: headers,
      }
    )
      .then((res) => {
        // console.log(res.data);
        setOwnTask(res.data);
      })
      .catch((e) => console.log(e));
  };

  const fetchAllAssemblyCoor = () => {
    APIS.get(
      `/district/fetch/all/assembly/coor/state/${UUU?.state}/district/${UUU?.district}`,
      { headers: headers }
    )
      .then((res) => {
        // console.log(res.data);
        setAllAssemblyCoor(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    onPsDetailsBasedOnDistrict();
    onFetchAllTaskDistrictCoor();
    fetchAllAssemblyCoor();
  }, []);

  /*
     AFTER FETCHING THE STATIC TASKS FROM DATA BASE 
     FILTER THE TASK BASED ON SUB-TASKS AND DISPLAY THE UI
   */
  useEffect(() => {
    const firstTask = ownTask.filter(
      (each) => each.task_heading === "Proceedings Collections"
    );
    const secondTask = ownTask.filter(
      (each) => each.task_heading === "Work Completion Tasks"
    );
    setFirstSubTask(firstTask);

    setSecondSubTask(secondTask);
  }, [ownTask]);

  /*
   AFTER FILTERING THE SUB-TAKS THAT COORESPONDING PERCENTAGES CALCULATIONS FUNCTION
   AND STORE THE `firstTaskPercentage` `secondTaskPercentage` STATE
  */
  useEffect(() => {
    let firstTaskPerArr = firstSubTask.filter(
      (each) =>
        each.secondAccepted === "yes" &&
        each.thirdAccepted === "yes" &&
        each.fouthAccepted === "yes"
    );

    let firstTaskPer = (firstTaskPerArr.length / firstSubTask.length) * 100;
    // console.log(firstTaskPer);

    let secondTaskPerArr = secondSubTask.filter(
      (each) =>
        each.secondAccepted === "yes" &&
        each.thirdAccepted === "yes" &&
        each.fouthAccepted === "yes"
    );

    let secondTaskPer = (secondTaskPerArr.length / secondSubTask.length) * 100;
    // console.log(firstTaskPer);
    setFirstTaskPercentage(firstTaskPer);
    // console.log(secondTaskPer);
    setSecondTaskPercentage(secondTaskPer);
  }, [firstSubTask, secondSubTask]);

  // THIS FUNCTION CALCULATED THE PS NUMBER ASSIGN OR NOT AND SHOW CHARTS
  const calPsChart = () => {
    const assignPsChart = psAcDetailsBasedOnDistrictCoor.filter(
      (each) => each.eassign === "yes"
    );
    setAssignPs(assignPsChart.length);
    const assignPsChartPer =
      (assignPsChart.length / psAcDetailsBasedOnDistrictCoor.length) * 100;
    const notAssignPsChart =
      psAcDetailsBasedOnDistrictCoor.length - assignPsChart.length;
    const notAssignPsChartPer =
      (notAssignPsChart / psAcDetailsBasedOnDistrictCoor.length) * 100;
    setNotAssignPs(notAssignPsChart);
    setPsChartNumber([assignPsChartPer, notAssignPsChartPer]);
  };

  /*
   AFTER PS-DETAILS FETCHING CALCULATED CHART VALUES AND PERCENTAGES
   AND FILTER UNIQUE LOCATIONS AND COORESPONDING UNIQUE LOCATIONS FILTER ASSIGN TASKS
   AND NOT-ASSIGN TASKS AND SET CHART
  */
  useEffect(() => {
    calPsChart();
    // const key = "Location";
    // const arrayUniqueByKey = [
    //   ...new Map(
    //     psAcDetailsBasedOnDistrictCoor.map((item) => [item[key], item])
    //   ).values(),
    // ];
    // setPsDetailsUniqueLocations(arrayUniqueByKey);
    // const assignTask = arrayUniqueByKey.filter(
    //   (each) => each.eassign === "yes"
    // );
    // setUniqueLocationsAssign(assignTask);
    // const notAssignLoc = arrayUniqueByKey.length - assignTask.length;
    // setUniqueNotAssignLocations(notAssignLoc);
    // const assignLocationPer =
    //   (assignTask.length / arrayUniqueByKey.length) * 100;
    // const notAssignLocationPer = (notAssignLoc / arrayUniqueByKey.length) * 100;
    // setLocationChartNumber([assignLocationPer, notAssignLocationPer]);
  }, [psAcDetailsBasedOnDistrictCoor]);

  // AFTER ALL LOCATIONS AND PS-NUMBER CALCULATIONS CALL THIS FUNCTION SHOW CHARTS
  useEffect(() => {
    setUpdate(psChartNumber);
    // setUpdateLocations(locationChartNumber);
  }, [psChartNumber]);

  /*
  WHEN DISTRICT COORDINATOR STATIC TASK UPDATE THIS FUNCTION WILL CALL
  AND UPDATED THERE TASK FROM DATABES
  AND FETCH THERE COORESPONDING TASKS FROM DATABSE
  */

  const onReckingFuncOnce = (id) => {
    if (!kitStatedImageFromFile) {
      setKitStartedErrorMsg("Plase Selected Image");
    } else {
      APIS.post(
        `/district/rechecking/ones/${id}`,
        { image: kitStatedImageFromFile },
        { headers: headers }
      )
        .then((res) => {
          // console.log(res.data);
          setKitStartedErrorMsg(null);
          onFetchAllTaskDistrictCoor();
          uploadImageAllSucceww();
          setKitStatedImageFromFile("");
          staticTaskAccepted(res?.data?.msg);
        })
        .catch((e) => console.log(e));
    }
  };

  const onReckingFuncOnceAdded = (id) => {
    let district = UUU?._id;
    if (!kitStatedImageFromFile) {
      setKitStartedErrorMsg("Plase Selected Image");
    } else {
      APIS.post(
        `/district/rechecking/${district}/start/${id}`,
        { image: kitStatedImageFromFile },
        { headers: headers }
      )
        .then((res) => {
          // console.log(res.data);
          setKitStartedErrorMsg(null);
          onFetchAllTaskDistrictCoor();
          // uploadImageAllSucceww();
          setKitStatedImageFromFile("");
          staticTaskAccepted(res?.data?.msg);
        })
        .catch((e) => console.log(e));
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

  const handleFileSubmit = (id) => {
    // e.preventDefault();

    const bulkUploadedSuperAdmin = async () => {
      // console.log(id);
      let district = UUU?._id;
      APIS.post(`/district/update/own/task/${district}/task/${id}`, excelData, {
        headers: headers,
      })
        .then((res) => {
          console.log(res.data);
          updatesStaticTask();
          onFetchAllTaskDistrictCoor();
        })
        .catch((e) => {
          console.log(e);
        });
    };
    bulkUploadedSuperAdmin();
  };

  // USER TAKES KIT RECEIVED IMAGES FUNCTION
  const onKitReceivedImageFunc = async (event) => {
    try {
      const image = await resizeFile(event.target.files[0]);
      setKitStatedImageFromFile(image);
    } catch (err) {
      console.log(err);
      pleaseChoosImages();
      setKitStatedImageFromFile("");
    }
  };

  const handleFileSubmitAdded = (id) => {
    APIS.post(`/district/new/rechecking/${id}`, excelData, {
      headers: headers,
    })
      .then((res) => {
        // console.log(res.data);
        updatesStaticTask();
        onFetchAllTaskDistrictCoor();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log(psAcDetailsBasedOnDistrictCoor);

  const filterAllAssemblyWisePsAssigned = (data) => {
    const filters = psAcDetailsBasedOnDistrictCoor?.filter(
      (all) => all.AC_Name === data
    );
    // console.log(filter);
    const assignPs = filters.filter((each) => each.eassign === "yes");
    return assignPs.length;
  };
  const filterAllAssemblyWisePsNotAssigned = (data) => {
    const filters = psAcDetailsBasedOnDistrictCoor?.filter(
      (all) => all.AC_Name === data
    );
    // console.log(filter);
    const assignPs = filters.filter((each) => each.eassign !== "yes");
    return assignPs.length;
  };

  return (
    <div className="admin__main__page">
      <span className="all__pages__over__view new__over__view">Over View</span>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="tosted"
      />
      <div className="district__dashboard__main">
        <div className="district__name__display">
          <h3>
            Hi <span style={{ color: "#ff6f00" }}>{UUU?.name}</span>
          </h3>
          <span>Check Your All Status Of Locations</span>
        </div>
        <div className="ps_location_card">
          <div className="Ps_cards_card">
            <span>{psAcDetailsBasedOnDistrictCoor?.length}</span>
            <span>No Of PS </span>
          </div>
          {/* <div className="Ps_cards_card">
            <span>{psDetailsUniqueLocations?.length}</span>
            <span>No Of Locations</span>
          </div> */}
          <div className="Ps_cards_card">
            <span>{assignPs}</span>
            <span>Assigned PS</span>
          </div>
          <div className="Ps_cards_card">
            <span>{notAssignPs}</span>
            <span>Not Assigned PS</span>
          </div>
          <div className="charts__admin__display">
            <Chart options={options} series={update} type="pie" width="100%" />
          </div>
        </div>
        {/* charts */}
      </div>
      {/* Static Tasks */}
      <div className="district__coor__static__task">
        {firstSubTask?.length > 0 && (
          <div className="district__proceedings__card">
            <div className="proceeding__card">
              <h3>{firstSubTask.length > 0 && firstSubTask[0].task_heading}</h3>
              <span>{firstTaskPercentage} %</span>
            </div>
            {firstSubTask.map((each, key) => (
              <div
                className="display__each__task new__added__admi__task"
                key={key}
              >
                <h3>{each.sub_task}</h3>

                <div className="newly-distric-stac-tasks-added-card">
                  {each.completed === "no" &&
                  each.secondAccepted === "no" &&
                  each.thirdAccepted === "no" &&
                  each.fouthAccepted === "no" ? (
                    <div
                      className="admin__takethe__input__from__task__card"
                      // onSubmit={() => handleFileSubmit(each?._id)}
                    >
                      {/* <button onClick={() => onOwnTasdkCompletedFun(each?._id)}>
                        Your Task is Completed Please Click to Confirm
                      </button> */}
                      {each?.sub_task === "PS List" ? (
                        <>
                          <input
                            type="file"
                            className="upload__input__tag"
                            required
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            onChange={handleFile}
                            // value={""}
                          />

                          <button
                            onClick={() => handleFileSubmit(each?._id)}
                            // type="submit"
                          >
                            UPLOAD
                          </button>
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
                          {typeerror && (
                            <div className="file_type_not_match">
                              {typeerror}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="admin__takethe__input__from__task__card">
                          <input
                            type="file"
                            accept="image/png, image/jpeg"
                            className="upload__input__tag"
                            onChange={onKitReceivedImageFunc}
                          />
                          <button
                            // style={{
                            //   width: "70%",
                            //   background: "red",
                            // }}
                            onClick={() => onReckingFuncOnceAdded(each?._id)}
                          >
                            UPLOAD
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      {each.completed === "yes" &&
                      each.secondAccepted === "no" &&
                      each.thirdAccepted === "no" &&
                      each.fouthAccepted === "no" ? (
                        <div>
                          <span>Waiting For Confirmation</span>
                        </div>
                      ) : (
                        <>
                          {each.completed === "yes" &&
                          each.secondAccepted === "yes" &&
                          each.thirdAccepted === "no" &&
                          each.fouthAccepted === "no" ? (
                            <div className="dist-rechecking-div-card">
                              <span>Your Task is Rejected...!</span>
                              <span>
                                Please Onces you check the submitted document
                                <br />
                                after submitted new document please confirm to
                                submitted{" "}
                              </span>
                              {/* <button
                                onClick={() => onReckingFuncOnce(each?._id)}
                              >
                                submitted completed
                              </button> */}
                              {each?.sub_task === "PS List" ? (
                                <>
                                  <input
                                    type="file"
                                    className="upload__input__tag"
                                    required
                                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={handleFile}
                                    // value={""}
                                  />

                                  <button
                                    onClick={() =>
                                      handleFileSubmitAdded(each?._id)
                                    }
                                    // type="submit"
                                  >
                                    UPLOAD
                                  </button>
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
                                  {typeerror && (
                                    <div className="file_type_not_match">
                                      {typeerror}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="admin__takethe__input__from__task__card">
                                  <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    className="upload__input__tag"
                                    onChange={onKitReceivedImageFunc}
                                  />
                                  <button
                                    onClick={() => onReckingFuncOnce(each?._id)}
                                  >
                                    UPLOAD
                                  </button>
                                </div>
                              )}
                            </div>
                          ) : (
                            <>
                              {each.completed === "yes" &&
                              each.secondAccepted === "yes" &&
                              each.thirdAccepted === "yes" &&
                              each.fouthAccepted === "no" ? (
                                <div>
                                  <span>Please Waiting for Confirmations</span>
                                  <span>
                                    Your Submitted Documents Correct or Not
                                  </span>
                                </div>
                              ) : (
                                <div>
                                  <span>Task Completd Successfully ....!</span>
                                </div>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {secondSubTask?.length > 0 && (
          <div className="district__proceedings__card">
            <div className="proceeding__card">
              <h3>
                {secondSubTask.length > 0 && secondSubTask[0].task_heading}
              </h3>
              <span>{secondTaskPercentage} %</span>
            </div>
            {secondSubTask.map((each, key) => (
              <div className="display__each__task" key={key}>
                <h3>{each.sub_task}</h3>
                <div className="newly-distric-stac-tasks-added-card">
                  {each.completed === "no" &&
                  each.secondAccepted === "no" &&
                  each.thirdAccepted === "no" &&
                  each.fouthAccepted === "no" ? (
                    <div className="admin__takethe__input__from__task__card">
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        className="upload__input__tag"
                        onChange={onKitReceivedImageFunc}
                      />
                      <button
                        // style={{
                        //   width: "70%",
                        //   background: "red",
                        // }}
                        onClick={() => onReckingFuncOnceAdded(each?._id)}
                      >
                        UPLOAD
                      </button>
                    </div>
                  ) : (
                    <>
                      {each.completed === "yes" &&
                      each.secondAccepted === "no" &&
                      each.thirdAccepted === "no" &&
                      each.fouthAccepted === "no" ? (
                        <div>
                          <span>Waiting For Confirmation</span>
                        </div>
                      ) : (
                        <>
                          {each.completed === "yes" &&
                          each.secondAccepted === "yes" &&
                          each.thirdAccepted === "no" &&
                          each.fouthAccepted === "no" ? (
                            <div className="dist-rechecking-div-card">
                              <span>Your Task is Rejected...!</span>
                              <span>
                                Please Onces you check the submitted document
                                <br />
                                after submitted new document please confirm to
                                submitted{" "}
                              </span>
                              <div className="admin__takethe__input__from__task__card">
                                <input
                                  type="file"
                                  accept="image/png, image/jpeg"
                                  className="upload__input__tag"
                                  onChange={onKitReceivedImageFunc}
                                />
                                <button
                                  onClick={() => onReckingFuncOnce(each?._id)}
                                >
                                  UPLOAD
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              {each.completed === "yes" &&
                              each.secondAccepted === "yes" &&
                              each.thirdAccepted === "yes" &&
                              each.fouthAccepted === "no" ? (
                                <div>
                                  <span>Please Waiting for Confirmations</span>
                                  <span>
                                    Your Submitted Documents Correct or Not
                                  </span>
                                </div>
                              ) : (
                                <div>
                                  <span>Task Completd Successfully ....!</span>
                                </div>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="all-assembly-coor-district-wise">
        {allAssemblyCoor?.map((each, key) => (
          <div key={key} className="single-assembly-ccors-main-card">
            <h3>{each.assembly}</h3>
            <div className="single-assembly-cor-container-new-new">
              <div>
                <span>
                  {
                    psAcDetailsBasedOnDistrictCoor?.filter(
                      (all) => all.AC_Name === each.assembly
                    ).length
                  }
                </span>
                <span>No Of PS</span>
              </div>
              <div>
                <span>{filterAllAssemblyWisePsAssigned(each.assembly)}</span>
                <span>Assigned PS</span>
              </div>
              <div>
                <span>{filterAllAssemblyWisePsNotAssigned(each.assembly)}</span>
                <span>Not Assigned PS</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
