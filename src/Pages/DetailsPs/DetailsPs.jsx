import React, { useEffect, useState } from "react";
import "./DetailsPs.css";
import { useSelector } from "react-redux";
import { APIS, headers } from "../../data/header";
import { IoSearch } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import PaymentModal from "../../Modals/PaymentModal/PaymentModal";
const DetailsPs = () => {
  const UUU = useSelector((state) => state.authReducer.authData);

  // const [districtPsDetails, setDistrictPsDetails] = useState([]);

  // const [notAssignPsCount, setNotAssignPsCount] = useState(0);

  // const [assignPsCount, setAssignPsCount] = useState(0);

  // SCORED USERS STORE STATE
  const [scoredUser, setScoreUser] = useState([]);
  const [secondSoredUser, setSecondSoredUser] = useState([]);

  // SCORED USER NAME STORE WHEN INPUT FIELD CHANGE
  const [filterValue, setFilterValue] = useState("");

  // STORE THE USERS TASKS
  const [taskForUser, setTaskForUser] = useState([]);

  // STORE THE USER ID BECAUSE DISPLAY BORDER ACTIVE USER
  const [leftSideUserClickStoreId, setLeftSideUserClickStoreId] =
    useState(null);

  // IMAGES MODAL OPEN START
  const [allCertificateModalOpen, setAllCertificateModalOpen] = useState(false);

  // STORE IMAGES CORRESPONDING IMAG BTN CLICK AND STORE TO SHOW IMAGE MODAL
  const [specificTaskCertificate, setSpecificTaskCertificate] = useState([]);

  // PAYMENT MODAL OPEN STATE
  const [openPaymentModalState, setOpenPaymentModalState] = useState(false);

  // STORE ALL IMAGES UPLODED TASK SET COUNT AS 1
  const [countPsTask, setCountPsTask] = useState(0);

  // STORE NOT REJECTED COMPLETED TASKS
  const [countTotalNotRejectedTask, setCountTotalNotRejectedTask] = useState(0);

  // STORE UNIQUE ASSEMBLIES
  const [uniqueAssembly, setUniqueAssembly] = useState([]);

  // SEARCH SCORED USERS THERE NAME
  const onInputChangeWithName = (e) => {
    setFilterValue(e.target.value);
  };

  // INITIALLY FETCH ALL SCORE BEAT USER FROM DATABASE
  const scoreUserApi = () => {
    APIS.get(`/district/score-user/${UUU?.district}`, {
      headers: headers,
    })
      .then((res) => {
        setScoreUser(res.data);
        setSecondSoredUser(res.data);
        // console.log(res.data);
        onUserClickFetchTask(res.data?.[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    scoreUserApi();
  }, []);

  useEffect(() => {
    const uniqueAssembly = [
      ...new Set(secondSoredUser.map((each) => each.assembly)),
    ];

    setUniqueAssembly(uniqueAssembly);
  }, [secondSoredUser]);

  // calculate count

  /*
      WHEN LEFT SIDE ANY USER CLICK THIS FUNCTION CALL
      AND FETCH THERE COORESPONDING TASK AND SHOW THE RIGHT SIDE 
      AND LEFT SIDE WHEN USER CLICK THAT USER DISPLAY BORDER BY STORING THERE USER ID
  */
  const onUserClickFetchTask = (each) => {
    console.log(each);
    setLeftSideUserClickStoreId(each);
    APIS.get(`/user/fetch-task/${each?._id}`, {
      headers: headers,
    })
      .then((res) => {
        // console.log(res.data);
        setTaskForUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /*
    USER CLICK SPECIFIC IMAGES BTN SHOW IMAGES MODAL OPEN
    AND SET THAT IMAGES MODAL IN SPECIFIC IMAGES
  */
  const onAllCertificatedDetails = (each) => {
    setAllCertificateModalOpen(true);
    // console.log(each);
    setSpecificTaskCertificate(each);
  };

  // USER CLICK IMAGE MODAL CROSS THIS FUNCTION WILL CALL
  const closeCertificateDetailsModal = () => {
    setAllCertificateModalOpen(false);
    setSpecificTaskCertificate([]);
  };

  // CALCULATE THE PERCENTAGE OF UPLOADED IMAGES FOR EACH TASK
  const onValueChange = (each) => {
    if (
      each.kit_start?.length === 0 &&
      each.InstallationCertificate?.length === 0 &&
      each.installationImage?.length === 0 &&
      each.CompletedCertificate?.length === 0 &&
      each.kit_end?.length === 0
    ) {
      return "0 %";
    } else if (
      each.kit_start?.length > 0 &&
      each.InstallationCertificate?.length === 0 &&
      each.installationImage?.length === 0 &&
      each.CompletedCertificate?.length === 0 &&
      each.kit_end?.length === 0
    ) {
      return "33%";
    } else if (
      each.kit_start?.length > 0 &&
      each.InstallationCertificate?.length > 0 &&
      each.installationImage?.length > 0 &&
      each.CompletedCertificate?.length === 0 &&
      each.kit_end?.length === 0
    ) {
      return "66 %";
    } else {
      // setCountPsTask(1);
      return "100 %";
    }
  };

  /* 
    AFTER USER TASK FETCHING FROM DATABASE TO CALCULATE THE COMPLETED NOT REJECTED TASK
    STORE `countTotalNotRejectedTask`
    AND TOTAL NOT REJECTED TASK STORES `countPsTask`
  */
  useEffect(() => {
    const paymentDetails = taskForUser?.filter(
      (each) =>
        each.kit_start?.length > 0 &&
        each.InstallationCertificate?.length > 0 &&
        each.installationImage?.length > 0 &&
        each.CompletedCertificate?.length > 0 &&
        each.kit_end?.length > 0
    );

    const notRejectedTaskCountArr = taskForUser?.filter(
      (each) => each.action !== "rejected"
    );
    setCountTotalNotRejectedTask(notRejectedTaskCountArr.length);
    setCountPsTask(paymentDetails.length);
  }, [taskForUser]);

  // USER CLICK PAYMENT BTN THIS FUNCTION WILL CALL AND OPEN PAYMENT MODAL
  const onOpenPaymentSectionFun = () => {
    setOpenPaymentModalState(!openPaymentModalState);
  };

  const paymentSendSuccessfully = (data) =>
    toast.success(data, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const onSelectAssemblyToFilterUser = (e) => {
    const filterUser = secondSoredUser?.filter(
      (each) => each.assembly === e.target.value
    );
    setScoreUser(filterUser);
  };

  return (
    <div className="details__ps__main__card">
      {/* <span className="all__pages__over__view">Over View</span> */}
      {/* user list and display ps details */}
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
          filter: openPaymentModalState && "blur(10px)",
        }}
        className="users__and__completed__ps_details__main"
      >
        <div className="user__datails__list">
          <div className="unique-assembly-ps-detail-page-card">
            <select onChange={onSelectAssemblyToFilterUser}>
              <option disabled hidden selected>
                SELECT ASSEMBLY
              </option>
              {uniqueAssembly?.map((each, key) => (
                <option value={each} key={key}>
                  {each}
                </option>
              ))}
            </select>
          </div>
          <div className="user__details__input__card">
            <input
              onChange={onInputChangeWithName}
              type="text"
              placeholder="Enter User Name"
            />
            <div>
              <IoSearch color="#fff" size="25" />
            </div>
          </div>
          <div className="user__display__card">
            {scoredUser?.length > 0 ? (
              <>
                {scoredUser
                  .filter((each) =>
                    filterValue === ""
                      ? each
                      : each.name
                          .toLowerCase()
                          .includes(filterValue.toLowerCase())
                  )
                  .map((each, key) => (
                    <div
                      key={key}
                      onClick={() => onUserClickFetchTask(each)}
                      className="each__user"
                      style={{
                        border:
                          leftSideUserClickStoreId?._id === each._id
                            ? "2px solid rgb(255, 187, 0)"
                            : "1px solid rgb(221, 214, 214)",
                        borderLeft:
                          leftSideUserClickStoreId?._id === each._id &&
                          "1px solid rgb(255, 187, 0)",
                      }}
                    >
                      <FaUserAlt size="25" color="rgb(221, 214, 214)" />
                      <div>
                        <span>{each.name}</span>
                        <span>{each.phone}</span>
                      </div>
                      <BiMessageDetail size="20" color="rgb(221, 214, 214)" />
                    </div>
                  ))}
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <h2> No User Found</h2>
              </div>
            )}
          </div>
        </div>
        {/*  */}
        <div className="user__right__side__card">
          <div className="total__kit__return__card">
            <span>
              Total Assign Ps : <span>{countTotalNotRejectedTask}</span>
            </span>
            <span>
              Completed PS : <span>{countPsTask}</span>
            </span>
          </div>

          <div className="right__side__ps__details">
            {taskForUser.length > 0 ? (
              <>
                {taskForUser.map((each, key) => (
                  <div
                    key={key}
                    className="all__ps__details__form__user__click__card"
                  >
                    <div className="right__ps__number_dis">
                      <div>
                        <span
                          style={{
                            textDecoration:
                              each?.action === "rejected" && "line-through",
                          }}
                        >
                          PS No : <span>{each?.PS_No}</span>
                        </span>
                        <span
                          style={{
                            textDecoration:
                              each?.action === "rejected" && "line-through",
                          }}
                        >
                          AC No : <span>{each?.AC_No}</span>
                        </span>
                        <span
                          style={{
                            textDecoration:
                              each?.action === "rejected" && "line-through",
                          }}
                        >
                          AC Name : <span>{each?.AC_name}</span>
                        </span>
                        <span
                          style={{
                            textDecoration:
                              each?.action === "rejected" && "line-through",
                          }}
                        >
                          Mandal : <span>{each?.mandal}</span>
                        </span>
                      </div>
                      <div className="completed__cer__kit__return">
                        <span
                          style={{
                            color:
                              onValueChange(each) === "100 %"
                                ? "#2aa33a"
                                : "rgb(255, 174, 0)",
                            fontSize: "22px",
                          }}
                        >
                          {onValueChange(each)}
                          {/* {onValueChange(each) === "100 %" &&
                            percentageHunred()} */}
                        </span>
                      </div>
                      {}
                    </div>
                    {/* images display */}
                    <div
                      className="all__images__display__to__hover"
                      style={{
                        textDecoration:
                          each?.action === "rejected" && "line-through",
                      }}
                    >
                      <button
                        style={{
                          color: each.kit_start
                            ? "#2aa33a"
                            : "rgb(255, 174, 0)",
                          border: each.kit_start
                            ? "2px solid #2aa33a"
                            : "2px solid rgb(255, 187, 0)",
                        }}
                        onClick={() =>
                          onAllCertificatedDetails([
                            {
                              image: each?.kit_start,
                            },
                          ])
                        }
                      >
                        Kit Recevied
                      </button>
                      <button
                        style={{
                          color:
                            each.InstallationCertificate &&
                            each.installationImage
                              ? "#2aa33a"
                              : "rgb(255, 174, 0)",
                          border:
                            each.InstallationCertificate &&
                            each.installationImage
                              ? "2px solid #2aa33a"
                              : "2px solid rgb(255, 187, 0)",
                        }}
                        onClick={() =>
                          onAllCertificatedDetails([
                            {
                              image: each?.InstallationCertificate,
                            },
                            {
                              image: each?.installationImage,
                            },
                          ])
                        }
                      >
                        Installation Image, Certificate
                      </button>
                      <button
                        style={{
                          color:
                            each.CompletedCertificate && each.kit_end
                              ? "#2aa33a"
                              : "rgb(255, 174, 0)",
                          border:
                            each.CompletedCertificate && each.kit_end
                              ? "2px solid #2aa33a"
                              : "2px solid rgb(255, 187, 0)",
                        }}
                        onClick={() =>
                          onAllCertificatedDetails([
                            {
                              image: each?.CompletedCertificate,
                            },
                            {
                              image: each?.kit_end,
                            },
                          ])
                        }
                      >
                        Completed Certificate, Kit Fitting
                      </button>
                    </div>
                    {each?.action === "rejected" && (
                      <div className="rejected__task__position__card">
                        <h1>Rejected </h1>
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <div className="not__task__dislay__card">
                <h2>No Task Allocated This Person</h2>
              </div>
            )}
          </div>
          {/* payment btn */}
          {taskForUser.length > 0 && (
            <>
              {countTotalNotRejectedTask === countPsTask &&
                countTotalNotRejectedTask > 0 && (
                  <div className="payment__main__card__btn__show">
                    <button
                      disabled={
                        leftSideUserClickStoreId?.pay_mode_admin === "true"
                      }
                      onClick={onOpenPaymentSectionFun}
                    >
                      {leftSideUserClickStoreId?.pay_mode_admin === "true"
                        ? "You Are Already Pay an Amount"
                        : "Payment Section"}
                    </button>
                  </div>
                )}
            </>
          )}
        </div>
      </div>
      {allCertificateModalOpen && (
        <div className="certificate__all__main__card">
          <div className="main__modal__card__certificate">
            <div className="user__modal__cross__card">
              <span>Certificate Details</span>
              <RxCross1 onClick={closeCertificateDetailsModal} size={20} />
            </div>
            <div className="all__certificate__main__card">
              {specificTaskCertificate[0].image.length > 0 ? (
                <>
                  {specificTaskCertificate?.map((each, key) => (
                    <div key={key} className="each__image__card">
                      <img src={each.image} alt="" />
                    </div>
                  ))}
                </>
              ) : (
                <div className="no__images__previews__card">
                  <h4>Images Not Available</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {openPaymentModalState && (
        <PaymentModal
          onOpenPaymentSectionFun={onOpenPaymentSectionFun}
          leftSideUserClickStoreId={leftSideUserClickStoreId}
          paymentSendSuccessfully={paymentSendSuccessfully}
          onUserClickFetchTask={onUserClickFetchTask} // user click fetch data payment your are send or not by showing payment btn or already payment send btn
        />
      )}
    </div>
  );
};

export default DetailsPs;
