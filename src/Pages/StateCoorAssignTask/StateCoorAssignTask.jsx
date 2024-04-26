import React, { useEffect, useState } from "react";
import "./StateCoorAssignTask.css";
import * as XLSX from "xlsx";
import { APIS, headers } from "../../data/header";
import { ToastContainer } from "react-toastify";
import {
  staticCoordinatorTaskAddedSuccess,
  staticTaskAccepted,
  taskAddedAlredyRegis,
} from "../../util/showmessages";
import { useSelector } from "react-redux";
const stateTask = [
  {
    name: "Proceedings Collections",
    task: ["PS List", "PS Work Orders"],
  },
  {
    name: "Work Completion Tasks",
    task: ["Work Completed Certificate", "Data Submission Certificate"],
  },
];

const StateCoorAssignTask = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  // THIS TWO STATES ARE STORED PS DETAILS
  const [initialMainPsData, setInitialMainPsData] = useState([]);
  const [mainCamDataFromApp, setMainCamDataFromApp] = useState([]);

  // UNIQUE STATE VALUES STORE DATA
  const [uniqueState, setUniqueState] = useState([]);

  // STORE ONE STATE VALUE
  const [selectedState, setSelectedState] = useState("");

  // STORE UNIQUE DISTRICT VALUES
  const [disticts, setDisticts] = useState(null);

  // STORE ONE DISTRICT VALUE
  const [selectedDist, setSelectedDist] = useState(null);

  // STORE THE STATIC FIRST TASK
  const [selectTask, setSelectTask] = useState("");

  // SELECT DROP DOWN STATIC TASK STORE COORESPONDING SUB TASKS
  const [selectSubTask, setSelectSubTask] = useState(null);

  // SELECT DROP DOWN STATIC TASK STORE COORESPONDING SUB TASKS FIRST VALUE SHOW THE DROP DOWN
  const [selectedSubTaskValue, setSelectedSubTaskValue] = useState(null);

  // THIS TWO STATES ARE STORE SUB-TASKS VALUES
  const [firstSubTask, setFirstSubTask] = useState([]);
  const [secondSubTask, setSecondSubTask] = useState([]);

  // STORE THE CORRESPONDING DISTRICT COORDINATOR VALUES
  const [
    correspondingDistrictCoordinator,
    setCorrespondingDistrictCoordinator,
  ] = useState(null);

  // STORE DISTRICT COORDINATOR TASKS
  const [districtCoorTask, setDistrictCoorTask] = useState([]);

  // INITIALLLY GET ALL PS DETAILS BECAUSE FILTER STATE AND DISTRICT NAMES
  const onGetAllPsDetails = () => {
    APIS.get(`/state/all-ps-details-fetch-super-admin/${UUU?.state}`, {
      headers: headers,
    })
      .then((res) => {
        // console.log(res.data);
        setInitialMainPsData(res.data);
        setMainCamDataFromApp(res.data);
      })
      .catch((e) => {
        console.log(e?.response?.data?.msg);
      });
  };
  useEffect(() => {
    onGetAllPsDetails();
  }, []);

  // STATE DROP DOWN CHANGE THIS FUNCTION CALL AND STORE CORRESPONDING DISTRICT VALUES
  // AND FILTER UNIQUE DISTRICT VALUES

  useEffect(() => {
    const uniqueDistrict = [
      ...new Set(mainCamDataFromApp.map((item) => item.District)),
    ];

    setDisticts(uniqueDistrict);
    setSelectedState(mainCamDataFromApp[0]?.State);
  }, [mainCamDataFromApp]);

  // DISTRICT VALUES CHANGE STORE DISTRICT VALUES FROM `selectedDist` STATE
  const selectDistName = (e) => {
    setSelectedDist(e.target.value);
  };

  // SELECT STATE AND DISTRICT VALUS FROM DROP DOWN AND BTN CLICK THIS FUNCTION CALL
  // AND FETCH THE CORRESPONDING DISTRICT COORDINATOR DETAILS
  const onFilterDistrictCoor = (e) => {
    // console.log(selectedDist, selectedState);
    APIS.get(
      `/state/fetch-district-coordinator/${selectedDist}/state/${selectedState}`,

      {
        headers: headers,
      }
    )
      .then((res) => {
        console.log(res.data);
        setCorrespondingDistrictCoordinator(res.data);
      })
      .catch((e) => console.log(e));
  };

  /* 
    AFTER DISTRICT COORDINATOR DATA FETCH THAT COORESPONDING DISTRICT COORDINATOR 
    TASK FETCH FROM DATA BASE
  */
  const fetchDistrictTask = () => {
    const id = correspondingDistrictCoordinator?._id;
    APIS.get(
      `/state/distrci/task/${id}`,

      {
        headers: headers,
      }
    )
      .then((res) => {
        // console.log(res.data);
        setDistrictCoorTask(res.data);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    correspondingDistrictCoordinator && fetchDistrictTask();
  }, [correspondingDistrictCoordinator]);

  // SELECT THE STATIC TASK FROM DROP DOWN THIS FUNCTION CALL
  const onChangeTaskSelected = (e) => {
    setSelectTask(e.target.value);
    const filterSubTask = stateTask.filter(
      (each) => each.name === e.target.value
    );
    // console.log(filterSubTask);
    setSelectSubTask(filterSubTask[0]?.task);
    setSelectedSubTaskValue(filterSubTask[0]?.task[0]);
  };

  // SELECT THE SUB STATIC TASK FROM DROP DOWN THIS FUNCTION CALL
  const onChangeSubTaskFun = (e) => {
    setSelectedSubTaskValue(e.target.value);
  };

  /*
   AFTER SELECTED STATIC TASKS AND BTN CLICK THIS FUNCTION CALL
   AND STORE THERE TASKS FROM DATABASE COORESPONDING DISTRICT COORDINATOR
   AND THIS RESPONSE SUCCESS AGAIN CALL API TO GET DISTRICT COORDINATOR TASKS
  */
  const onSubmitedTaskForDistrict = (e) => {
    const id = correspondingDistrictCoordinator?._id;
    APIS.post(
      `/state/assign/task/district/coor/${id}`,
      {
        selectTask,
        selectedSubTaskValue,
      },
      {
        headers: headers,
      }
    )
      .then((res) => {
        // console.log(res.data);
        staticCoordinatorTaskAddedSuccess();
        onFilterDistrictCoor();
      })
      .catch((e) => {
        taskAddedAlredyRegis(e?.response?.data?.msg);
      });
  };

  // DISTRIC COORDINATOR TASK FILTER THERE ARE TWO TYPES
  useEffect(() => {
    const firstTask = districtCoorTask.filter(
      (each) => each.task_heading === "Proceedings Collections"
    );
    const secondTask = districtCoorTask.filter(
      (each) => each.task_heading === "Work Completion Tasks"
    );
    setFirstSubTask(firstTask);

    setSecondSubTask(secondTask);
  }, [districtCoorTask]);

  const onStaticFirstTaskAccepted = (id) => {
    console.log(id);
    APIS.put(`/state/statictask/accepted/${id}`, { headers: headers })
      .then((res) => {
        // console.log(res.data);
        fetchDistrictTask();
        staticTaskAccepted(res?.data?.msg);
      })
      .catch((e) => console.log(e));
  };

  const onStaticFirstTaskRejected = (id) => {
    APIS.put(`/state/statictask/rejected/${id}`, { headers: headers })
      .then((res) => {
        // console.log(res.data);
        fetchDistrictTask();
        staticTaskAccepted(res?.data?.msg);
      })
      .catch((e) => console.log(e));
  };

  const onReckeckingNewlyAddedFunc = (id) => {
    // console.log("fghjkl");
    APIS.put(`/state/rechecking/documents/${id}`, { headers: headers })
      .then((res) => {
        // console.log(res.data);
        fetchDistrictTask();
        staticTaskAccepted(res?.data?.msg);
      })
      .catch((e) => console.log(e));
  };

  const onRechinkAcceptedConfirm = (id) => {
    APIS.put(`/state/second/time/accepted/${id}`, { headers: headers })
      .then((res) => {
        // console.log(res.data);
        fetchDistrictTask();
        staticTaskAccepted(res?.data?.msg);
      })
      .catch((e) => console.log(e));
  };

  // console.log(firstSubTask);

  const onDownload = (data) => {
    // console.log(data);
    if (data?.sub_task === "PS List") {
      const ws = XLSX.utils.json_to_sheet(data?.arrayOfObjectsField);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "electionData" + new Date() + ".xlsx");
    } else {
      var a = document.createElement("a"); //Create <a>
      a.href = data?.image; //Image Base64 Goes here
      a.download = "Image.png"; //File name Here
      a.click();
    }
  };

  return (
    <div className="state__coor__assigntask__main">
      <h2>Assign Static Taks</h2>
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
      <div className="state__coor__main__modal__card">
        <div className="state__assigntask__filter__card">
          {/* <select onChange={selectSate}>
            <option disabled hidden selected>
              SELECT STATE
            </option>
            {uniqueState?.map((each, key) => (
              <option key={key}>{each}</option>
            ))}
          </select> */}
          <select value={selectedDist} onChange={selectDistName}>
            <option disabled hidden selected>
              SELECT DISTRICT{" "}
            </option>
            {disticts?.map((each, key) => (
              <option key={key}>{each}</option>
            ))}
          </select>
          <button onClick={onFilterDistrictCoor}>Filter</button>
        </div>

        {correspondingDistrictCoordinator !== null ? (
          <div className="state__district__coor__available__data">
            <div className="state__district__filter__name__card">
              <span>
                Name <span>{correspondingDistrictCoordinator?.name}</span>
              </span>
              <span>
                Phone <span>{correspondingDistrictCoordinator?.phone}</span>
              </span>
            </div>
            {/* task display Card */}
            <div className="all__task__display__state__coo__card">
              <h3
                className={`${
                  firstSubTask.length &&
                  "all__task__display__state__coo__card__h3"
                }`}
              >
                {firstSubTask.length > 0 && firstSubTask[0].task_heading}
              </h3>
              {firstSubTask.map((each, key) => (
                <div className="display__each__task" key={key}>
                  <h4>{each.sub_task}</h4>
                  <div className="newly-added-subtasks-district-coor-card">
                    {each.completed === "no" &&
                    each.secondAccepted === "no" &&
                    each.thirdAccepted === "no" &&
                    each.fouthAccepted === "no" ? (
                      <div>
                        <span
                          style={{
                            color: "orange",
                          }}
                        >
                          Task Not Completed
                        </span>
                      </div>
                    ) : (
                      <>
                        {each.completed === "yes" &&
                        each.secondAccepted === "no" &&
                        each.thirdAccepted === "no" &&
                        each.fouthAccepted === "no" ? (
                          <div
                            style={{
                              display: "flex",
                              gap: "1rem",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <button
                                onClick={() => onDownload(each)}
                                style={{
                                  width: "160px",
                                  height: "30px",
                                }}
                              >
                                {/* {each?.sub_task === "PS List" ? () : ()} */}
                                Show Preview
                              </button>
                            </div>
                            <div className="newly-states-coor-task-distric-confirm-card">
                              <span>This Task Assignment Submitted </span>
                              <span>
                                Please Onces check and Confirm You are Accepted
                                or Rejected
                              </span>
                              <div>
                                <button
                                  onClick={() =>
                                    onStaticFirstTaskAccepted(each._id)
                                  }
                                >
                                  Accepted
                                </button>
                                <button
                                  onClick={() =>
                                    onStaticFirstTaskRejected(each._id)
                                  }
                                >
                                  Rejected
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            {each.completed === "yes" &&
                            each.secondAccepted === "yes" &&
                            each.thirdAccepted === "no" &&
                            each.fouthAccepted === "no" ? (
                              <div>
                                <span>
                                  This Task is Rejected ... Rechecking Process
                                  start
                                </span>
                              </div>
                            ) : (
                              <>
                                {each.completed === "yes" &&
                                each.secondAccepted === "yes" &&
                                each.thirdAccepted === "yes" &&
                                each.fouthAccepted === "no" ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "1rem",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div>
                                      <button
                                        onClick={() => onDownload(each)}
                                        style={{
                                          width: "160px",
                                          height: "30px",
                                        }}
                                      >
                                        Show Preview
                                      </button>
                                    </div>
                                    <div className="nnnn-rechecking-process-card">
                                      <span>
                                        Rechecking Process Completed And
                                        Submitted New Documents
                                      </span>
                                      <span>
                                        Please Confirm You are Accepted or
                                        Rejected
                                      </span>
                                      <div>
                                        <button
                                          onClick={() =>
                                            onRechinkAcceptedConfirm(each?._id)
                                          }
                                        >
                                          Accepted
                                        </button>
                                        <button
                                          onClick={() =>
                                            onReckeckingNewlyAddedFunc(
                                              each?._id
                                            )
                                          }
                                        >
                                          Rejected
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <span
                                      style={{
                                        color: "green",
                                      }}
                                    >
                                      Task Completd Successfully ....!
                                    </span>
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
              <h3
                className={`${
                  secondSubTask.length &&
                  "all__task__display__state__coo__card__h3"
                }`}
              >
                {secondSubTask.length > 0 && secondSubTask[0].task_heading}
              </h3>
              {secondSubTask.map((each, key) => (
                <div className="display__each__task" key={key}>
                  <h4>{each.sub_task}</h4>
                  <div className="newly-added-subtasks-district-coor-card">
                    {each.completed === "no" &&
                    each.secondAccepted === "no" &&
                    each.thirdAccepted === "no" &&
                    each.fouthAccepted === "no" ? (
                      <div>
                        <span
                          style={{
                            color: "orange",
                          }}
                        >
                          Task Not Completed
                        </span>
                      </div>
                    ) : (
                      <>
                        {each.completed === "yes" &&
                        each.secondAccepted === "no" &&
                        each.thirdAccepted === "no" &&
                        each.fouthAccepted === "no" ? (
                          <div
                            style={{
                              display: "flex",
                              gap: "1rem",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <button
                                onClick={() => onDownload(each)}
                                style={{
                                  width: "160px",
                                  height: "30px",
                                }}
                              >
                                {/* {each?.sub_task === "PS List" ? () : ()} */}
                                Show Preview
                              </button>
                            </div>
                            <div className="newly-states-coor-task-distric-confirm-card">
                              <span>This Task Assignment Submitted </span>
                              <span>
                                Please Onces check and Confirm You are Accepted
                                or Rejected
                              </span>
                              <div>
                                <button
                                  onClick={() =>
                                    onStaticFirstTaskAccepted(each._id)
                                  }
                                >
                                  Accepted
                                </button>
                                <button
                                  onClick={() =>
                                    onStaticFirstTaskRejected(each._id)
                                  }
                                >
                                  Rejected
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            {each.completed === "yes" &&
                            each.secondAccepted === "yes" &&
                            each.thirdAccepted === "no" &&
                            each.fouthAccepted === "no" ? (
                              <div>
                                <span>
                                  This Task is Rejected ... Rechecking Process
                                  start
                                </span>
                              </div>
                            ) : (
                              <>
                                {each.completed === "yes" &&
                                each.secondAccepted === "yes" &&
                                each.thirdAccepted === "yes" &&
                                each.fouthAccepted === "no" ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "1rem",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div>
                                      <button
                                        onClick={() => onDownload(each)}
                                        style={{
                                          width: "160px",
                                          height: "30px",
                                        }}
                                      >
                                        {/* {each?.sub_task === "PS List" ? () : ()} */}
                                        Show Preview
                                      </button>
                                    </div>
                                    <div className="nnnn-rechecking-process-card">
                                      <span>
                                        Rechecking Process Completed And
                                        Submitted New Documents
                                      </span>
                                      <span>
                                        Please Confirm You are Accepted or
                                        Rejected
                                      </span>
                                      <div>
                                        <button
                                          onClick={() =>
                                            onRechinkAcceptedConfirm(each?._id)
                                          }
                                        >
                                          Accepted
                                        </button>
                                        <button
                                          onClick={() =>
                                            onReckeckingNewlyAddedFunc(
                                              each?._id
                                            )
                                          }
                                        >
                                          Rejected
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <span
                                      style={{
                                        color: "green",
                                      }}
                                    >
                                      Task Completd Successfully ....!
                                    </span>
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
            {districtCoorTask?.length !== 4 && (
              <div className="assign__task__text__show__display__main__card">
                <span>Assign Tasks</span>

                <div className="state__assign__task__card">
                  <select onChange={onChangeTaskSelected}>
                    <option disabled hidden selected>
                      SELECT TASK
                    </option>
                    {stateTask.map((each, key) => (
                      <option key={key} value={each.name}>
                        {each.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedSubTaskValue}
                    onChange={onChangeSubTaskFun}
                  >
                    <option disabled hidden selected>
                      SELECT TASK
                    </option>
                    {selectSubTask?.map((each, key) => (
                      <option key={key} value={each}>
                        {each}
                      </option>
                    ))}
                  </select>
                  <button onClick={onSubmitedTaskForDistrict}>Apply</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="state__district__coor__not__found__card">
            <h1>Data Not Found</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default StateCoorAssignTask;
