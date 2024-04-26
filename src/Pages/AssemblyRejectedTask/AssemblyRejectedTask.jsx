import React, { useEffect, useState } from "react";
import "./AssemblyRejectedTask.css";
import { APIS, headers } from "../../data/header";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { GoTasklist } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import { allpsAddedtoUser } from "../../util/showmessages";
const AssemblyRejectedTask = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  const [allInitiallyUsers, setAllInitiallyUsers] = useState([]);
  const [initiallyAllPs, setInitiallyAllPs] = useState([]);
  const [psDetailsUniqueLocations, setPsDetailsUniqueLocations] = useState([]);
  const [storeModalUser, setStoreModalUser] = useState(null);
  // array of ps added to users

  const [preventMultipleTaskLoader, setPreventMultipleTaskLoader] =
    useState(false);
  const [array, setArray] = useState([]);
  const [showError, setShowError] = useState("");

  const [openTaskModal, setOpenTaskModal] = useState(false);

  // AFTER SET UNIQUE LOCATIONS THIS ALL STATE ARE STORE PAGINATION AND LOCATION DATA
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 9;
  const currentItems = psDetailsUniqueLocations?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(psDetailsUniqueLocations?.length / 9);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 9) % psDetailsUniqueLocations?.length;
    setItemOffset(newOffset);
  };

  const allUsers = () => {
    APIS.get(
      `assembly/notassignusers/state/${UUU?.state}/district/${UUU?.district}/assembly/${UUU?.assembly}`,
      { headers: headers }
    )
      .then((res) => {
        setAllInitiallyUsers(res.data);
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  };

  const allPsInitially = () => {
    APIS.get(
      `/assembly/all/rejectedtask/assembly/${UUU?.assembly}/state/${UUU?.state}`,
      { headers: headers }
    )
      .then((res) => {
        console.log(res.data);
        setInitiallyAllPs(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    allUsers();
    allPsInitially();
  }, []);

  useEffect(() => {
    const key = "Location_Name";
    const arrayUniqueByKey = [
      ...new Map(initiallyAllPs.map((item) => [item[key], item])).values(),
    ];
    setPsDetailsUniqueLocations(arrayUniqueByKey);
  }, [initiallyAllPs]);

  const onTaskModalCloseFun = (user) => {
    setOpenTaskModal(true);
    const allPsNumbers = initiallyAllPs.filter(
      (each) => each.Location_Name === user?.Location_Name
    );

    setArray(allPsNumbers);
  };
  const closeModal = () => {
    setOpenTaskModal(false);
  };

  const addedMulplePsUser = (ps) => {
    const index = array.findIndex((item) => item._id === ps._id);
    if (index === -1) {
      setArray((prev) => [...prev, ps]);
    } else {
      // If object exists, remove it from the array
      const newArray = [...array];
      newArray.splice(index, 1);
      setArray(newArray);
    }
  };

  const onAddAllTaskUser = () => {
    if (array.length > 0) {
      setShowError("");
      APIS.post(
        `/assembly/assign/rejectedtask/user/${storeModalUser?._id}/name/${storeModalUser?.name}/phone/${storeModalUser?.phone}/bankname/${storeModalUser?.bankname}/banknumber/${storeModalUser?.banknumber}/ifsc/${storeModalUser?.IFSC}`,
        { array },
        { headers: headers }
      )
        .then((res) => {
          // console.log(res.data);
          closeModal();
          setArray([]);
          allUsers(res.data);
          allUsers();
          allPsInitially();
        })
        .catch((e) => console.log(e));
    } else {
      setShowError("Please Selecet Ps Number");
    }
  };

  const addTaskToUserLocationwise = (user) => {
    setPreventMultipleTaskLoader(true);
    APIS.post(
      `/assembly/assign/task/user/${user?._id}/name/${user?.name}/phone/${
        user?.phone
      }/bankname/${
        user?.bankname.length > 0 ? user?.bankname : "No Bank Name"
      }/banknumber/${
        user?.banknumber.length > 0 ? user?.banknumber : "No Bank Number"
      }/ifsc/${user?.IFSC.length > 0 ? user?.IFSC : "No IFSC Code"}`,
      { array },
      { headers: headers }
    )
      .then((res) => {
        console.log(res.data);
        closeModal();
        allpsAddedtoUser(res.data);
        allPsInitially();
        allUsers();
        setPreventMultipleTaskLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setPreventMultipleTaskLoader(false);
      });
  };

  //   console.log(UUU);

  return (
    <div className="assembly-aasigntask-main">
      {currentItems?.length > 0 ? (
        <>
          <div
            style={{
              filter: openTaskModal && "blur(10px)",
            }}
            className="table__main__card"
          >
            <div className="assembly-table-header">
              <span>District</span>
              <span>Locations</span>
              <span>PS No</span>
              <span>Mandal</span>
              <span>PS Address</span>
              <span className="table__header__last__span">Action</span>
            </div>
            <div className="table__body__card">
              {currentItems?.map((each, key) => (
                <div
                  style={{
                    color: each.assign_task === "yes" && "#ee8673",
                  }}
                  key={key}
                  className="assembly-table-body"
                >
                  <span>{each.District}</span>
                  <span>{each.Location_Name}</span>
                  <span>{each.PS_No}</span>
                  <span>{each.Mandal}</span>
                  <span>
                    {each.PS_Name_and_Address.toLowerCase().slice(0, 80)}
                  </span>
                  <button
                    disabled={each.assign_task === "yes" && "true"}
                    // onClick={() => onOpenTaskModalFun(each)}
                    className="table__action"
                    // style={{
                    //   color: each.assign === "yes" && "#ee8673",
                    // }}
                    onClick={() => onTaskModalCloseFun(each)}
                  >
                    <GoTasklist size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div
            //   style={{
            //     filter: openTaskModal && "blur(10px)",
            //   }}
            className="paginations__card__appcss"
          >
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              className="paginat"
            />
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <h3>No Rejected Task</h3>
        </div>
      )}

      {openTaskModal && (
        <div className="assembly-assigntask-modal-main">
          <div className="user__modal__cross__card">
            <span>Assign Task</span>
            <RxCross1 onClick={onTaskModalCloseFun} size={20} />
          </div>

          <div
            className="location_ps_ac_number_display_card"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <div className="task__single__card__num">
              <span>Location</span>
              <span>{array[0]?.Location_Name}</span>
            </div>
            {/* <div className="task__single__card__num">
              <span>Mandal</span>
              <span>{taskOpenFilterData[0]?.Mandal}</span>
            </div> */}
            <div className="task__single__card__num">
              <span>Ps Numbers</span>
              <select>
                {array?.map((each, key) => (
                  <option key={key}>{each.PS_No}</option>
                ))}
              </select>
            </div>
            <div className="task__single__card__num">
              <span>PS Address</span>
              {/* <span>{taskOpenFilterData[0]?.PS_Name_and_Address}</span> */}
              <select>
                {array?.map((each, key) => (
                  <option key={key}>{each.PS_Name_and_Address}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="new-add-value-css-user-card">
            <div className="newly-added-user-value-first-card">
              <span>Name</span>
              <span>Phone</span>
              <span>Location</span>
              <span>Action</span>
            </div>
            <div className="outside-map-value">
              {allInitiallyUsers?.map((each, key) => (
                <div
                  key={key}
                  className="newly-added-user-value-first-card-body"
                  style={{
                    color: each.assign_task === "yes" && "#ee8673",
                  }}
                >
                  <span>{each?.name}</span>
                  <span>{each?.phone}</span>
                  <span>{each?.address}</span>
                  <span>
                    {/* {preventMultipleTaskLoader === false && ( */}
                    <button
                      style={{
                        cursor: each.assign_task === "yes" && "not-allowed",
                      }}
                      disabled={each.assign_task === "yes" && "true"}
                      onClick={() => addTaskToUserLocationwise(each)}
                    >
                      Add Task
                    </button>
                    {/* )} */}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* <div>
            <div className="added-assembly-ps-task-card">
              <div>
                {initiallyAllPs?.map((each, key) => (
                  <div
                    key={key}
                    style={{
                      textDecoration: each?.eassign === "yes" && "line-through",
                    }}
                  >
                    <input
                      disabled={each?.eassign === "yes" ? true : false}
                      onChange={() => addedMulplePsUser(each)}
                      type="checkbox"
                    />
                    <label>
                      {each.PS_No} {" ,"} {each.PS_Name_and_Address} {" ,"}{" "}
                      {each.PS_Location}
                    </label>
                  </div>
                ))}
              </div>
              <button onClick={onAddAllTaskUser}>Add</button>
            </div>
          </div> */}
        </div>
      )}
      {/* {initiallyAllPs?.length > 0 && allInitiallyUsers?.length === 0 && (
        <div className="assembly-show-display-new-rejected-task-card">
          <div>
            <h2>
              This Assembly Contain more Rejected Tasks But No Employee Found
            </h2>
            {initiallyAllPs?.map((each, key) => (
              <span key={key}>
                {" "}
                {each.PS_No} {" ,"} {each.PS_Name_and_Address} {" ,"}{" "}
                {each.PS_Location}
              </span>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default AssemblyRejectedTask;
