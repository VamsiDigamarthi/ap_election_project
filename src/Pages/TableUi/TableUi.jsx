import React, { useEffect, useState } from "react";
import "./Tableui.css";
import { CiFilter } from "react-icons/ci";
import { VscSettings } from "react-icons/vsc";
import ReactPaginate from "react-paginate";
import { APIS, headers } from "../../data/header";
import { RxCross1 } from "react-icons/rx";
import { BiDetail } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import { MdPayment } from "react-icons/md";
import { DiHtml5DeviceAccess } from "react-icons/di";
import { useSelector } from "react-redux";
const TableUi = ({ tabsView }) => {
  const UUU = useSelector((state) => state.authReducer.authData);

  const [scoreUserData, setScoreUserData] = useState([]);
  const [inputField, setInputField] = useState("");

  const [newScoreUserData, setNewScoreUserData] = useState([]);

  const [taskDetails, setTaskDetails] = useState({
    psname: "",
    acname: "",
    psnumber: "",
    acnumber: "",
    district: UUU[0]?.district,
  });

  const onChangeTaskInput = (e) => {
    setTaskDetails({ ...taskDetails, [e.target.name]: e.target.value });
  };

  // open modals state

  const [assignTaskModalOpen, setAssignTaskModalOpen] = useState(false);

  const [assignTaskUserId, setAssignTaskUserId] = useState(null);

  const [rejectedTaskModalOpen, setRejectedTaskModalOpen] = useState(false);

  // pagination code

  //
  const [taskIdFromAddedUser, setTaskIdFromAddedUser] = useState(null);
  // rejecte task user list

  const [userBasedNotRejected, setUserBasedNotRejected] = useState([]);

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 2;
  const currentItems = newScoreUserData?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(newScoreUserData?.length / 2);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 2) % newScoreUserData?.length;
    setItemOffset(newOffset);
  };

  // pagination code end

  // psDetaild Based on District

  // ps details specific district coordinator
  const [psAcDetailsBasedOnDistrictCoor, setPsAcDetailsBasedOnDistrictCoor] =
    useState([]);

  const [psDetailsAcNumberUnique, setPsDetailsAcNumberUnique] = useState([]);

  const [psDetailsAcNameUnique, setPsDetailsAcNameUnique] = useState([]);

  const [alreadyAssignPsNumber, setAlreadyAssignPsNumber] = useState([]);

  // completed details task from user
  const [openCompletDetailsTask, setOpenCompleteDetailsTask] = useState(false);

  useEffect(() => {
    if (psAcDetailsBasedOnDistrictCoor) {
      const uniqueAcName = [
        ...new Set(psAcDetailsBasedOnDistrictCoor?.map((item) => item.AC_Name)),
      ];
      const uniqueAcNumber = [
        ...new Set(psAcDetailsBasedOnDistrictCoor?.map((item) => item.AC_No)),
      ];

      setPsDetailsAcNameUnique(uniqueAcName);
      setPsDetailsAcNumberUnique(uniqueAcNumber);
    }
  }, [psAcDetailsBasedOnDistrictCoor]);

  const onPsDetailsBasedOnDistrict = () => {
    let district = UUU[0]?.district;
    APIS.get(`/district/district-coor-ps-ac-number/${district}`, {
      headers: headers,
    })
      .then((res) => {
        // console.log(res.data);
        setPsAcDetailsBasedOnDistrictCoor(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // rejected task fetch data

  const onRejectedTaskFetchApi = () => {
    let district = UUU[0]?.district;

    APIS.get(`/district/rejected-task-data/${district}`, {
      headers: headers,
    })
      .then((res) => {
        // console.log(res.data);
        setScoreUserData(res.data);
        setNewScoreUserData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // district

  useEffect(() => {
    if (tabsView === 1) {
      let district = UUU[0]?.district;
      // console.log(district);
      APIS.get(`/district/score-user/${district}`, {
        headers: headers,
      })
        .then((res) => {
          setScoreUserData(res.data);
          setNewScoreUserData(res.data);
          // console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      onRejectedTaskFetchApi();
    }
    onPsDetailsBasedOnDistrict();
  }, [tabsView]);

  // input field change

  const onInputNameChange = (e) => {
    setInputField(e.target.value);
    const score = scoreUserData.filter((each) =>
      e.target.value === ""
        ? each
        : each.mandal.toLowerCase().includes(inputField.toLowerCase())
    );
    setNewScoreUserData(score);
  };

  // tesk modal open

  const openTaskModal = (id) => {
    // console.log(id);
    setAssignTaskModalOpen(true);
    setAssignTaskUserId(id);
    APIS.get(`/user/fetch-task/${id}`, {
      headers: headers,
    })
      .then((res) => {
        console.log(res.data);
        setAlreadyAssignPsNumber(res.data);
        // setTaskForUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // open modal user completed task details

  const closeTaskModal = () => {
    setAssignTaskModalOpen(false);
    setTaskDetails({
      psname: "",
      acname: "",
      psnumber: "",
      acnumber: "",
    });
  };

  // task added to user

  const onTaskAddToUser = (e) => {
    e.preventDefault();
    APIS.post(`/district/add-task-user/${assignTaskUserId}`, taskDetails, {
      headers: headers,
    })
      .then((res) => {
        // console.log(res.data);
        registorSucces();
        setAssignTaskModalOpen(false);
        setTaskDetails({
          psname: "",
          acname: "",
          psnumber: "",
          acnumber: "",
        });
      })
      .catch((e) => {
        console.log(e);
      });

    // additionally ps details
  };

  const registorSucces = () =>
    toast.success("task added successfully ...!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const rejectedTaskAddedNewUser = () =>
    toast.success("task added successfully ...!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const onCloseRejectedTask = (values) => {
    setRejectedTaskModalOpen(false);
  };

  const onOpenRejectedTask = (values) => {
    setRejectedTaskModalOpen(true);

    setTaskIdFromAddedUser(values.taskID);

    let acname = values?.acname;
    let userId = values?.id;
    APIS.get(
      `/rejected-user-data-fetch-basedon-acname/${acname}/user/${userId}`,
      {
        headers: headers,
      }
    )
      .then((res) => {
        setUserBasedNotRejected(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onTaskAssignRejectTaskBasedOnId = (id) => {
    // console.log(id);
    const newObj = {
      userId: id,
      id: taskIdFromAddedUser,
    };
    APIS.put("/rejected-task-update-specific-user", newObj, {
      headers: headers,
    })
      .then((res) => {
        // setUserBasedNotRejected(res.data);
        rejectedTaskAddedNewUser();
        onRejectedTaskFetchApi();
        setRejectedTaskModalOpen(false);
      })

      .catch((e) => {
        console.log(e);
      });
  };

  // console.log(userBasedNotRejected);
  // console.log(currentItems);

  // console.log(taskDetails);

  return (
    <div className="table__card__with__filter">
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
      />
      <div
        style={{
          filter:
            (assignTaskModalOpen || rejectedTaskModalOpen) && "blur(20px)",
        }}
        className="filter__superadmin__card"
      >
        <div className="filter__input">
          <CiFilter size={20} />
          <input
            onChange={onInputNameChange}
            type="text"
            placeholder="Enter Mandal"
          />
          <div>
            <VscSettings size={20} color="#ff5c41" />
          </div>
        </div>
      </div>
      {/* tables ui */}
      {tabsView === 1 ? (
        <div
          style={{
            filter:
              (assignTaskModalOpen || rejectedTaskModalOpen) && "blur(20px)",
          }}
          className="table__main__card"
        >
          <div className="table__header__card">
            <span>State</span>
            <span>District Name</span>
            <span>Mandal</span>
            <span>Name</span>
            <span>Phone</span>
            <span className="table__header__last__span">Score</span>
            <span className="table__header__last__span">Action</span>
          </div>
          <div className="table__body__card">
            {currentItems.map((each, key) => (
              <div key={key}>
                <span>{each.state}</span>
                <span>{each.district}</span>
                <span>{each.mandal}</span>
                <span>{each.name}</span>
                <span>{each.phone}</span>
                <span className="table__header__last__span">{each.score}</span>
                <span
                  className="table__header__last__span"
                  style={{
                    display: "flex",
                    gap: "1rem",
                    cursor: "pointer",
                  }}
                >
                  <BiDetail onClick={() => openTaskModal(each?.id)} />
                  {/* <DiHtml5DeviceAccess
                    onClick={() => openTaskCompletedDetails(each?.id)}
                  /> */}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            filter:
              (assignTaskModalOpen || rejectedTaskModalOpen) && "blur(20px)",
          }}
          className="table__main__card"
        >
          <div className="table__header__card">
            <span>AC name</span>
            <span>AC No</span>
            <span
              style={{
                width: "30%",
              }}
            >
              PS name
            </span>
            <span>PS No</span>
            <span>Action</span>
            {/* <span className="table__header__last__span">Score</span> */}
            <span className="table__header__last__span">Action</span>
          </div>
          <div className="table__body__card">
            {currentItems.map((each, key) => (
              <div key={key}>
                <span>{each.AC_name}</span>
                <span>{each.AC_No}</span>
                <span
                  style={{
                    width: "30%",
                  }}
                >
                  {each.PS_name}
                </span>
                <span>{each.PS_No}</span>
                <span>{each.action}</span>
                {/* <span className="table__header__last__span">{each.score}</span> */}
                <span
                  className="table__header__last__span"
                  style={{
                    display: "flex",
                    gap: "1rem",
                  }}
                >
                  <BiDetail
                    onClick={() =>
                      onOpenRejectedTask({
                        id: each?.user_id,
                        taskID: each.id,
                        acname: each?.AC_name,
                      })
                    }
                  />
                  {/* <MdPayment /> */}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* table card end */}

      <div
        style={{
          filter:
            (assignTaskModalOpen || rejectedTaskModalOpen) && "blur(20px)",
        }}
        className="paginations__card__appcss"
      >
        <ReactPaginate
          breakLabel="..."
          nextLabel="next>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<prev"
          renderOnZeroPageCount={null}
          className="paginat"
        />
      </div>
      {assignTaskModalOpen && (
        <div className="user__edit__modal__main__card">
          <div className="user__modal__inner__card">
            <div className="user__modal__cross__card">
              <span>Assign Task</span>
              <RxCross1 onClick={closeTaskModal} size={20} />
            </div>
            <div className="already__assign__psnumber_card">
              <span>
                {alreadyAssignPsNumber?.length > 0
                  ? "Assign PS Numbers"
                  : "Not Assign Any Task"}
              </span>
              <div className="already__assign__psnumber">
                {alreadyAssignPsNumber.map((each, key) => (
                  <span key={key}>{each.PS_No}</span>
                ))}
              </div>
            </div>
            <form onSubmit={onTaskAddToUser} className="task__form__card">
              <select name="psnumber" onChange={onChangeTaskInput}>
                <option disabled hidden selected>
                  Select PS Number
                </option>
                {psAcDetailsBasedOnDistrictCoor?.map((each, key) => (
                  <option value={each.PS_No} key={key}>
                    {each.PS_No}
                  </option>
                ))}
              </select>
              <select name="acnumber" onChange={onChangeTaskInput}>
                <option disabled hidden selected>
                  Select AC Number
                </option>
                {psDetailsAcNumberUnique?.map((each, key) => (
                  <option value={each} key={key}>
                    {each}
                  </option>
                ))}
              </select>
              <select name="acname" onChange={onChangeTaskInput}>
                <option disabled hidden selected>
                  Select AC Name
                </option>
                {psDetailsAcNameUnique?.map((each, key) => (
                  <option value={each} key={key}>
                    {each}
                  </option>
                ))}
              </select>
              <select name="psname" onChange={onChangeTaskInput}>
                <option disabled hidden selected>
                  Select PS Name
                </option>
                {psAcDetailsBasedOnDistrictCoor?.map((each, key) => (
                  <option value={each.PS_Name_and_Address} key={key}>
                    {each.PS_Name_and_Address}
                  </option>
                ))}
              </select>
              <button
                style={{
                  cursor: "pointer",
                }}
                type="submit"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
      {/* {openCompletDetailsTask && (
        <div className="user__edit__modal__main__card">
          <div className="completed__details__task">
            <div className="user__modal__cross__card">
              <span>Assign Task</span>
              <RxCross1 onClick={closeCompletedTaskDetailsModal} size={20} />
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default TableUi;

//
//

//       {rejectedTaskModalOpen && (
//         <div className="user__edit__modal__main__card">
//           <div className="rejected__task__modal__card">
//             <div className="user__modal__cross__card">
//               <span>Assign Task</span>
//               <RxCross1 onClick={onCloseRejectedTask} size={20} />
//             </div>
//             <div className="user__rej__id__task">
//               <div className="rejecte__heade__table">
//                 <span>Name</span>
//                 <span>Mandal</span>
//                 <span>AC NAme</span>
//                 <span>Action</span>
//               </div>
//               {userBasedNotRejected.map((each, key) => (
//                 <div key={key} className="user__ac__rejected__list">
//                   <span>{each.name.slice(0, 12)}</span>
//                   <span>{each.mandal.slice(0, 12)}</span>
//                   <span>{each.assembly.slice(0, 12)}</span>
//                   <span>
//                     <FaPlus
//                       onClick={() => onTaskAssignRejectTaskBasedOnId(each?.id)}
//                       color="#ff5c41"
//                     />
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
