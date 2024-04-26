import React, { useEffect, useState } from "react";
import "./AssemblyAssignTask.css";
import { useSelector } from "react-redux";
import { APIS, headers } from "../../data/header";
import { GoTasklist } from "react-icons/go";
import ReactPaginate from "react-paginate";
import { RxCross1 } from "react-icons/rx";
import { allpsAddedtoUser } from "../../util/showmessages";
import { SpinnerDotted } from "spinners-react";
const AssemblyAssignTask = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  const [initiallyAllPs, setInitiallyAllPs] = useState([]);
  const [allInitiallyUsers, setAllInitiallyUsers] = useState([]);

  const [storeModalUser, setStoreModalUser] = useState(null);

  const [loader, setLoader] = useState(true);

  // array of ps added to users
  const [array, setArray] = useState([]);
  const [showError, setShowError] = useState("");

  // filter PS number

  const [onPsNumberFilter, setOnPsNumberFilter] = useState("");

  // open task modal
  // ================================================================================
  //

  const [preventMultipleTaskLoader, setPreventMultipleTaskLoader] =
    useState(false);

  const [psDetailsUniqueLocations, setPsDetailsUniqueLocations] = useState([]);
  //
  // ====================================================================================

  const [openTaskModal, setOpenTaskModal] = useState(false);
  // LOCATION BASED FILTER ALL PS-NUMBERS STORE
  const [taskOpenFilterData, setTaskOpenFilterData] = useState([]);

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
    setLoader(true);
    // APIS.get(
    //   `assembly/alluser/assembly/${UUU?.assembly}/state/${UUU?.state}/district/${UUU?.district}`
    // )
    //   .then((res) => {
    //     setLoader(false);
    //     setAllInitiallyUsers(res.data);
    //     console.log(res.data);
    //   })
    //   .catch((e) => {
    //     setLoader(false);
    //     console.log(e);
    //   });
    APIS.get(
      `assembly/notassignusers/state/${UUU?.state}/district/${UUU?.district}/assembly/${UUU?.assembly}`,
      { headers: headers }
    )
      .then((res) => {
        setLoader(false);
        setAllInitiallyUsers(res.data);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };

  const allPsInitially = () => {
    APIS.get(`/assembly/allps/assemblycoor/${UUU?._id}`)
      .then((res) => {
        console.log(res.data);
        setInitiallyAllPs(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    allPsInitially();
    allUsers();
  }, []);

  useEffect(() => {
    const key = "Location_Name";
    const arrayUniqueByKey = [
      ...new Map(initiallyAllPs.map((item) => [item[key], item])).values(),
    ];
    setPsDetailsUniqueLocations(arrayUniqueByKey);
  }, [initiallyAllPs]);

  // const onTaskModalCloseFun = (user) => {
  //   console.log(user);
  //   setOpenTaskModal(!openTaskModal);
  //   setStoreModalUser(user);
  //   setShowError("");
  //   setArray([]);
  // };
  const closeModal = () => {
    setOpenTaskModal(false);
  };

  const onAddAllTaskUser = () => {
    // console.log(storeModalUser);

    if (array.length > 0) {
      setShowError("");
      APIS.post(
        `/assembly/assign/task/user/${storeModalUser?._id}/name/${
          storeModalUser?.name
        }/phone/${storeModalUser?.phone}/bankname/${
          storeModalUser?.bankname.length > 0
            ? storeModalUser?.bankname
            : "No bank name"
        }/banknumber/${
          storeModalUser?.banknumber.length > 0
            ? storeModalUser?.banknumber
            : "No bank number"
        }/ifsc/${storeModalUser?.IFSC}`,
        { array },
        { headers: headers }
      )
        .then((res) => {
          // console.log(res.data);
          closeModal();
          setArray([]);
          allpsAddedtoUser(res.data);
          allUsers();
          allPsInitially();
        })
        .catch((e) => console.log(e));
    } else {
      setShowError("Please Selecet Ps Number");
    }
  };

  // console.log(initiallyAllPs);

  //===================================================================

  const onTaskModalCloseFun = (name) => {
    // console.log(name);
    setOpenTaskModal(true);
    const allPsNumbers = initiallyAllPs.filter(
      (each) => each.Location_Name === name?.Location_Name
    );

    setArray(allPsNumbers);
  };

  const onModelClose = () => {
    setOpenTaskModal(false);
  };

  const addTaskToUserLocationwise = (user) => {
    // console.log(user);
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
    // setOpenTaskModal(false);
  };

  return (
    <div className="assembly-aasigntask-main">
      {loader ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SpinnerDotted
            size={50}
            thickness={100}
            speed={100}
            color="#36ad47"
          />
        </div>
      ) : (
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
                    color: each.assign === "yes" && "#ee8673",
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
                    disabled={each.assign === "yes" && "true"}
                    // onClick={() => onOpenTaskModalFun(each)}
                    className="table__action"
                    style={{
                      color: each.assign === "yes" && "#ee8673",
                    }}
                    onClick={() => onTaskModalCloseFun(each)}
                  >
                    <GoTasklist size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              filter: openTaskModal && "blur(10px)",
            }}
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
      )}
      {openTaskModal && (
        <div className="assembly-assigntask-modal-main">
          <div className="user__modal__cross__card">
            <span>Assign Task</span>
            <RxCross1 onClick={onModelClose} size={20} />
          </div>
          <div
            style={{
              textAlign: "center",
              borderBottom: "2px solid #c56c5c",
              paddingBottom: "10px",
            }}
          >
            {taskOpenFilterData.length > 0 && (
              <span
                style={{
                  fontSize: "20px",
                  color: " #c56c5c",
                  // borderBottom: "2px solid #c56c5c",
                }}
              >
                This Location Have Multiple Ps
              </span>
            )}
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
          {allInitiallyUsers?.length > 0 ? (
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
                      {preventMultipleTaskLoader === false && (
                        <button
                          style={{
                            cursor: each.assign_task === "yes" && "not-allowed",
                          }}
                          disabled={each.assign_task === "yes" && "true"}
                          onClick={() => addTaskToUserLocationwise(each)}
                        >
                          Add Task
                        </button>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                height: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h3> User Not Found</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssemblyAssignTask;
