import React, { useEffect, useState } from "react";
import "./TaskPage.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { APIS, headers } from "../../data/header";

import {
  acceptedTask,
  errorMsgApi,
  pleaseChoosImages,
  rejectedTask,
  resizeFile,
  uploadImageAllSucceww,
} from "../../util/showmessages";
const TaskPage = () => {
  const UUU = useSelector((state) => state.authReducer.authData);

  // STORE USERS TASK DATA
  const [taskForUser, setTaskForUser] = useState([]);

  // COLLAPS SHOW OR HIDEN TASKS STATE
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // KIT RECEVIED IMAGES AND ERROR STORE STATES
  const [kitStatedImageFromFile, setKitStatedImageFromFile] = useState("");
  const [kitStartedErrorMsg, setKitStartedErrorMsg] = useState("");

  // INSTALATTION IMAGE AND ERROR STORE STATES
  const [instalationImageState, setInstalationImageState] = useState("");
  const [installationImageError, setInstallationImageError] = useState("");

  // INSTALATTION CERTIFICATE IMAGE AND ERROR STORE STATES
  const [instalationCertificateState, setInstalationCertificateState] =
    useState("");
  const [installationCertificateError, setInstallationCertificateError] =
    useState("");

  // COMPLETED CERTIFICATE IMAGE AND ERROR STORE STATES
  const [completedCertificate, setCompletedCertificate] = useState("");
  const [completedCertificateError, setCompletedCertificateError] =
    useState("");

  // KIT FITTING CERTIFICATE IMAGE AND ERROR STORE STATES
  const [kitFittingCertificate, setkitFittingCertificate] = useState("");
  const [kitFittingCertificateError, setkitFittingCertificateError] =
    useState("");

  // Latitude Lon details

  const [latLogSpeed, setLatLogSpeed] = useState({
    latitude: "",
    longitude: "",
    airtelSpped: "",
    jioSpeed: "",
    bsnlSpeed: "",
    power: "",
  });

  const [showLatErrorMsg, setShowLatErrorMsg] = useState("");

  const onSpeedChange = (e) => {
    setLatLogSpeed({ ...latLogSpeed, [e.target.name]: e.target.value });
  };

  // COLLAPS THERE TASK SHOW OR HIDE IMAGES SHOW , UPLOADED FILEDS
  const toggelCertificated = (id) => {
    if (selectedCertificate === id) {
      setSelectedCertificate(null);
    } else {
      setSelectedCertificate(id);
    }
  };

  // INITIALLY FETCH ALL TASKS FROM DATABASE
  const fetchAllTask = () => {
    APIS.get(`/user/fetch-task/${UUU?._id}`, {
      headers: headers,
    })
      .then((res) => {
        console.log(res.data);
        setTaskForUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchAllTask();
  }, []);

  // WHEN USER ACCEPTED BUTTON CLICK THERE CORRESPONDING TASK REJECTED FROM STORE DATABASE
  const onAcceptedTask = (id) => {
    console.log(id);
    APIS.put(
      `/user/update-task/${id}`,
      { action: "accepted" },
      {
        headers: headers,
      }
    )
      .then((res) => {
        // console.log(res.data);
        fetchAllTask();
        acceptedTask();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // WHEN USER REJECTED BUTTON CLICK THERE CORRESPONDING TASK REJECTED FROM STORE DATABASE
  const onRejectedTask = (task) => {
    console.log(task[0]?.location);
    console.log(task);
    APIS.put(
      `/user/rejected/all/task/${task?.user_id}`,
      { action: "rejected" },
      {
        headers: headers,
      }
    )
      .then((res) => {
        fetchAllTask();
        rejectedTask();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // USER SUBMITTED KIT RECEVIED IMAGE FROM  DATA BASE API CALL
  const onKitStartedImageSubmit = (id) => {
    if (!kitStatedImageFromFile) {
      setKitStartedErrorMsg("Plase Selected Image");
    } else {
      APIS.put(
        `/user/kit-start-image/upload/${id}`,
        { image: kitStatedImageFromFile },
        {
          headers: headers,
        }
      )
        .then((res) => {
          setKitStartedErrorMsg(null);
          uploadImageAllSucceww();
          setKitStatedImageFromFile("");
          fetchAllTask();
        })
        .catch((e) => {
          console.log(e?.response?.data?.msg);
          errorMsgApi(e?.response?.data?.msg);
        });
    }
  };

  // USER SUBMITTED INSTALLATION CERTIFICATE AND IMAGE FROM  DATA BASE API CALL
  const onInstallationCertificateAndImage = (id) => {
    if (!instalationImageState || !instalationCertificateState) {
      setInstallationImageError("Plase Selecet Installation Img");
      setInstallationCertificateError(
        "Please Selecet Installation Certificate"
      );
    } else {
      APIS.put(
        `/user/installation-certificate-image/${id}`,
        {
          instaCer: instalationCertificateState,
          instaImg: instalationImageState,
        },
        {
          headers: headers,
        }
      )
        .then((res) => {
          setInstallationImageError(null);
          setInstallationCertificateError(null);
          uploadImageAllSucceww();
          setInstalationImageState("");
          setInstalationCertificateState("");
          fetchAllTask();
        })
        .catch((e) => {
          errorMsgApi(e?.response?.data?.msg);
        });
    }
  };

  // USER SUBMITTED COMPLETED CERTIFICATE AND KIT FITTING CERTIFICATED FROM  DATA BASE API CALL
  const onCompletedCertificateKitFit = (id) => {
    if (!completedCertificate || !kitFittingCertificate) {
      setCompletedCertificateError("Plase Selecet completed Img");
      setkitFittingCertificateError("Please Selecet kit Fitting img");
    } else {
      APIS.put(
        `/user/completed-certificate-kit-fitting-img/${id}`,
        {
          completedCer: completedCertificate,
          kitFit: kitFittingCertificate,
        },
        {
          headers: headers,
        }
      )
        .then((res) => {
          setCompletedCertificateError(null);
          setkitFittingCertificateError(null);
          uploadImageAllSucceww();
          setCompletedCertificate("");
          setkitFittingCertificate("");
          fetchAllTask();
        })
        .catch((e) => {
          console.log(e);
          errorMsgApi(e?.response?.data?.msg);
        });
    }
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

  // USER TAKES TINSTALLATION IMAGES FUNCTION
  const onInstallationImageFunc = async (event) => {
    try {
      const image = await resizeFile(event.target.files[0]);
      setInstalationImageState(image);
    } catch (err) {
      console.log(err);
      pleaseChoosImages();
      setInstalationImageState("");
    }
  };
  // USER TAKE INSTALLATION CERTIFICATE STORE IMAGES FUNCTION
  const onInstallationCertificateFunc = async (event) => {
    try {
      const image = await resizeFile(event.target.files[0]);
      setInstalationCertificateState(image);
    } catch (err) {
      console.log(err);
      pleaseChoosImages();
      setInstalationCertificateState("");
    }
  };

  // USER TAKE COMPLETED CERTIFICATE STORE IMAGES FUNCTION
  const onCompletedCertificateFunc = async (event) => {
    try {
      const image = await resizeFile(event.target.files[0]);
      setCompletedCertificate(image);
    } catch (err) {
      console.log(err);
      pleaseChoosImages();
      setCompletedCertificate("");
    }
  };

  const uploadedLogLatiSpeed = (each) => {
    // console.log(latLogSpeed);
    if (
      latLogSpeed.longitude !== "" &&
      latLogSpeed.latitude !== "" &&
      latLogSpeed.airtelSpped !== "" &&
      latLogSpeed.jioSpeed !== "" &&
      latLogSpeed.bsnlSpeed !== "" &&
      latLogSpeed.power !== ""
    ) {
      setShowLatErrorMsg("");
      APIS.put(
        `/user/uploaded/lon/speed/${each?._id}/taskId/${each?.task_id}`,
        {
          ...latLogSpeed,
        },
        {
          headers: headers,
        }
      )
        .then((res) => {
          fetchAllTask();
          setLatLogSpeed({
            latitude: "",
            longitude: "",
            airtelSpped: "",
            jioSpeed: "",
            bsnlSpeed: "",
            power: "",
          });
        })
        .catch((e) => {
          console.log(e);
          errorMsgApi(e?.response?.data?.msg);
        });
    } else {
      setShowLatErrorMsg("Please Fill All Fields!");
    }
  };

  // USER TAKE KIT FITTING CERTIFICATE
  const onFittingKitImgaeFunc = async (event) => {
    try {
      const image = await resizeFile(event.target.files[0]);
      setkitFittingCertificate(image);
    } catch (err) {
      pleaseChoosImages();
      setkitFittingCertificate("");
    }
  };

  console.log(taskForUser);
  return (
    <div
      style={{
        height: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
        }}
      >
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
      </div>
      <span className="all__pages__over__view">Over View</span>
      <div className="task__inner__page">
        <h4>Your Task ......!</h4>
        {taskForUser.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              height: "100%",
              // border: "2px solid yellow",
              overflowY: "scroll",
            }}
          >
            <div className="new-task-accept-reject-card">
              <div className="task__status__card">
                {taskForUser[0]?.action === "initiated" ? (
                  <div className="accept__rejected">
                    {/* onClick={() => onAcceptedTask(each?._id)} */}
                    <button
                      onClick={() => onAcceptedTask(taskForUser[0]?.user_id)}
                    >
                      Accept
                    </button>

                    <button onClick={() => onRejectedTask(taskForUser[0])}>
                      Reject
                    </button>
                  </div>
                ) : (
                  <div className="initial__button">
                    <button>{taskForUser[0]?.action}</button>
                  </div>
                )}
              </div>
            </div>
            {taskForUser.map((each, key) => (
              <div key={key} className="task__details__and__upload__image">
                <div className="task__each__card">
                  <div className="ac__ps__name__card">
                    <span>Assembly: {each.AC_name}</span>
                    <span>PS-Location : {each.PS_name}</span>
                    <span>Location: {each.location}</span>
                  </div>
                  <div className="ac__ps__number__card">
                    <span>
                      Ac : <span>{each.AC_No}</span>
                    </span>
                    <span>
                      Ps : <span>{each.PS_No}</span>
                    </span>
                  </div>
                  {/* <div className="task__status__card">
                    <span>Status</span>
                    {each.action === "initiated" ? (
                      <div className="accept__rejected">
                        <button onClick={() => onAcceptedTask(each?._id)}>
                          Accept
                        </button>
                        <button onClick={() => onRejectedTask(each)}>
                          Reject
                        </button>
                      </div>
                    ) : (
                      <div className="initial__button">
                        <button>{each.action}</button>
                      </div>
                    )}
                  </div> */}
                </div>

                <div className="collaps__and__certificated__card">
                  <div onClick={() => toggelCertificated(key)}>
                    <span>
                      {selectedCertificate === key
                        ? "Close Uploaded File"
                        : "Click to Show Uploaded File"}
                    </span>
                    <span>
                      {selectedCertificate === key ? (
                        <IoIosArrowUp size={20} />
                      ) : (
                        <IoIosArrowDown size={20} />
                      )}
                    </span>
                  </div>
                  <div
                    className={`images__upload__file__card content ${
                      selectedCertificate === key ? "show-collapes" : "content"
                    } `}
                  >
                    {each.action === "accepted" ? (
                      <div className="all__image__uploaded__file__card">
                        {/* kit start card start */}
                        <div className="kit__stared__card">
                          <span className="kit__task__number">
                            Kit Received Image
                          </span>
                          <div className="kit__stated__api__image__card">
                            <img src={each.kit_start} alt="No Data" />
                          </div>

                          <div className="file__input__box">
                            <p
                              style={{
                                visibility: "visible",
                                color: "#f58b76",
                              }}
                            >
                              {kitStartedErrorMsg ? kitStartedErrorMsg : "."}
                            </p>
                            <input
                              type="file"
                              accept="image/png, image/jpeg"
                              onChange={onKitReceivedImageFunc}
                            />

                            <span>Kit Received Image</span>
                            {kitStatedImageFromFile && (
                              <img
                                className="kit__Started__preview__image"
                                src={kitStatedImageFromFile}
                                alt=""
                              />
                            )}
                          </div>

                          <div className="kit__image__uploaded__button__card">
                            <button
                              onClick={() => onKitStartedImageSubmit(each?._id)}
                            >
                              Upload
                            </button>
                          </div>
                        </div>
                        {/* kit start card start */}
                        {/*  */}
                        {/* second task start */}
                        <div className="kit__stared__card">
                          <span className="kit__task__number">
                            Installation Image , Certificate
                          </span>
                          <div className="kit__stated__api__image__card">
                            <img
                              src={each.installationImage}
                              alt="No instalation Img"
                            />
                          </div>
                          <div className="file__input__box">
                            <p
                              style={{
                                visibility: "visible",
                                color: "#f58b76",
                              }}
                            >
                              {installationImageError
                                ? installationImageError
                                : "."}
                            </p>

                            <input
                              type="file"
                              accept="image/png, image/jpeg"
                              onChange={onInstallationImageFunc}
                            />

                            <span>Installation Image</span>
                            {instalationImageState && (
                              <img
                                className="kit__Started__preview__image"
                                src={instalationImageState}
                                alt=""
                              />
                            )}
                          </div>

                          <div className="kit__stated__api__image__card">
                            <img
                              src={each.InstallationCertificate}
                              alt="No Instalation img"
                            />
                          </div>

                          <div className="file__input__box">
                            <p
                              style={{
                                visibility: "visible",
                                color: "#f58b76",
                              }}
                            >
                              {installationCertificateError
                                ? installationCertificateError
                                : "."}
                            </p>

                            <input
                              type="file"
                              accept="image/png, image/jpeg"
                              onChange={onInstallationCertificateFunc}
                            />

                            <span>Installation Certificate</span>
                            {instalationCertificateState && (
                              <img
                                className="kit__Started__preview__image"
                                src={instalationCertificateState}
                                alt=""
                              />
                            )}
                          </div>

                          <div className="kit__image__uploaded__button__card">
                            <button
                              onClick={() =>
                                onInstallationCertificateAndImage(each?._id)
                              }
                            >
                              Upload
                            </button>
                          </div>
                        </div>
                        {/* second task end */}
                        {/*  */}
                        {/* third task start */}
                        <div className="kit__stared__card">
                          <span className="kit__task__number">
                            Completed Certificate and kit Fitting
                          </span>
                          <div className="kit__stated__api__image__card">
                            <img
                              src={each.CompletedCertificate}
                              alt="No Completed Certificate"
                            />
                          </div>
                          <div className="file__input__box">
                            <p
                              style={{
                                visibility: "visible",
                                color: "#f58b76",
                              }}
                            >
                              {completedCertificateError
                                ? completedCertificateError
                                : "."}
                            </p>

                            <input
                              type="file"
                              accept="image/png, image/jpeg"
                              onChange={onCompletedCertificateFunc}
                            />
                            <span>Completed Certificate</span>
                            {completedCertificate && (
                              <img
                                className="kit__Started__preview__image"
                                src={completedCertificate}
                                alt=""
                              />
                            )}
                          </div>

                          <div className="kit__stated__api__image__card">
                            <img src={each.kit_end} alt="No kit Fitting img" />
                          </div>

                          <div className="file__input__box">
                            <p
                              style={{
                                visibility: "visible",
                                color: "#f58b76",
                              }}
                            >
                              {kitFittingCertificateError
                                ? kitFittingCertificateError
                                : "."}
                            </p>

                            <input
                              type="file"
                              accept="image/png, image/jpeg"
                              onChange={onFittingKitImgaeFunc}
                            />
                            <span>Kit Fitting Image</span>
                            {kitFittingCertificate && (
                              <img
                                className="kit__Started__preview__image"
                                src={kitFittingCertificate}
                                alt=""
                              />
                            )}
                          </div>

                          <div className="kit__image__uploaded__button__card">
                            <button
                              onClick={() =>
                                onCompletedCertificateKitFit(each?._id)
                              }
                            >
                              Upload
                            </button>
                          </div>
                        </div>
                        <div className="netwrok-details-main">
                          <span className="kit__task__number">
                            Network Details
                          </span>
                          {showLatErrorMsg && showLatErrorMsg}
                          {each.longitude &&
                          each.latitude &&
                          each.airtelSpped &&
                          each.jioSpeed &&
                          each.bsnlSpeed ? (
                            <div className="log-lat-insed-card">
                              <div>
                                <span>Longitude</span>
                                <span>{each.longitude}</span>
                              </div>
                              <div>
                                <span>Latitude</span>
                                <span>{each.latitude}</span>
                              </div>
                              <div>
                                <span>Airtel Speed</span>
                                <span>{each.airtelSpped}</span>
                              </div>
                              <div>
                                <span>JIO Speed</span>
                                <span>{each.jioSpeed}</span>
                              </div>
                              <div>
                                <span>BSNL Speed</span>
                                <span>{each.bsnlSpeed}</span>
                              </div>
                              <div>
                                <span>Power Availability</span>
                                <span>{each.power}</span>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="netwrok-details-mainss">
                                <input
                                  onChange={onSpeedChange}
                                  type="text"
                                  placeholder="Longitude"
                                  name="longitude"
                                  value={latLogSpeed.longitude}
                                />
                                <input
                                  onChange={onSpeedChange}
                                  type="text"
                                  placeholder="Latitude"
                                  name="latitude"
                                  value={latLogSpeed.latitude}
                                />
                                <select name="power" onChange={onSpeedChange}>
                                  <option disabled hidden selected>
                                    Power Available
                                  </option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                </select>
                              </div>
                              <div className="jio-speed">
                                <input
                                  onChange={onSpeedChange}
                                  type="text"
                                  placeholder="JIO Speed MBPS"
                                  name="jioSpeed"
                                  value={latLogSpeed.jioSpeed}
                                />
                                <input
                                  onChange={onSpeedChange}
                                  type="text"
                                  placeholder="Airtel Speed MBPS"
                                  name="airtelSpped"
                                  value={latLogSpeed.airtelSpped}
                                />
                                <input
                                  onChange={onSpeedChange}
                                  type="text"
                                  placeholder="BSNL Speed MBPS"
                                  name="bsnlSpeed"
                                  value={latLogSpeed.bsnlSpeed}
                                />
                              </div>
                              <div className="kit__image__uploaded__button__card">
                                <button
                                  onClick={() => uploadedLogLatiSpeed(each)}
                                >
                                  Upload
                                </button>
                              </div>
                            </>
                          )}{" "}
                        </div>
                        {/* third task end */}
                        {/* <div className="image__loaded__value">
                        {each.installationImage ? (
                          <div className="backed__image">
                            <img src={each.installationImage} alt="" />
                          </div>
                        ) : (
                          <div className="file__input__box">
                            <div className="file_single__box">
                              <FileBase64
                                type="file"
                                required="required"
                                multiple={false}
                                style={{ display: "none" }}
                                className="file-card"
                                onDone={({ base64 }) => {
                                  setPsAcImagesFromTask({
                                    ...pSacImagesFromTask,
                                    installationImage: base64,
                                  });
                                  setPsAcId(each?.id);
                                }}
                              />
                              <span>Completed Certificate</span>
                            </div>

                            {psAcId === each.id &&
                              pSacImagesFromTask?.installationImage && (
                                <img
                                  className="upload__file__images"
                                  src={pSacImagesFromTask.installationImage}
                                  alt=""
                                />
                              )}
                          </div>
                        )}
                      </div> */}
                        {/* <div className="image__loaded__value">
                        {each.InstallationCertificate ? (
                          <div className="backed__image">
                            <img src={each.InstallationCertificate} alt="" />
                          </div>
                        ) : (
                          <div className="file__input__box">
                            <div className="file_single__box">
                              <FileBase64
                                type="file"
                                required="required"
                                multiple={false}
                                style={{ display: "none" }}
                                className="file-card"
                                onDone={({ base64 }) => {
                                  setPsAcImagesFromTask({
                                    ...pSacImagesFromTask,
                                    InstallationCertificate: base64,
                                  });
                                  setPsAcId(each?.id);
                                }}
                              />
                              <span>Completed Certificate</span>
                            </div>
                            {psAcId === each.id &&
                              pSacImagesFromTask?.InstallationCertificate && (
                                <img
                                  className="upload__file__images"
                                  src={
                                    pSacImagesFromTask.InstallationCertificate
                                  }
                                  alt=""
                                />
                              )}
                          </div>
                        )}
                      </div>
                      <div className="image__loaded__value">
                        {each.CompletedCertificate ? (
                          <div className="backed__image">
                            <img src={each.CompletedCertificate} alt="" />
                          </div>
                        ) : (
                          <div className="file__input__box">
                            <div className="file_single__box">
                              <FileBase64
                                type="file"
                                required="required"
                                multiple={false}
                                style={{ display: "none" }}
                                className="file-card"
                                onDone={({ base64 }) => {
                                  setPsAcImagesFromTask({
                                    ...pSacImagesFromTask,
                                    CompletedCertificate: base64,
                                  });
                                  setPsAcId(each?.id);
                                }}
                              />
                              <span>Completed Certificate</span>
                            </div>
                            {psAcId === each.id &&
                              pSacImagesFromTask?.CompletedCertificate && (
                                <img
                                  className="upload__file__images "
                                  src={pSacImagesFromTask.CompletedCertificate}
                                  alt=""
                                />
                              )}
                          </div>
                        )}
                      </div> */}
                        {/* {!each.installationImage &&
                      !each.InstallationCertificate &&
                      !each.CompletedCertificate ? (
                        <div className="uploaded__button__show">
                          <button
                            onClick={() => {
                              onUploadAllCertificateBasedOnId(each?.id);
                              setPsAcId(null);
                            }}
                          >
                            Upload
                          </button>
                        </div>
                      ) : (
                        <div></div>
                      )} */}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            <h3>No Data Found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskPage;

// {
//   /* <div className="multi__input__card__file">
//                     <div className="file__image__preview__card">
//                       <div className="file__input__box">
//                         <p
//                           style={{
//                             visibility: "visible",
//                             color: "#f58b76",
//                           }}
//                         >
//                           .
//                         </p>
//                         <FileBase64
//                           type="file"
//                           required="required"
//                           multiple={false}
//                           style={{ display: "none" }}
//                           className="file-card"
//                           onDone={({ base64 }) => {
//                             setPsAcId(each.id);
//                             setPsAcImagesFromTask({
//                               ...pSacImagesFromTask,
//                               InstallationCertificate: base64,
//                             });
//                           }}
//                         />
//                         <span>Installation Certificate</span>
//                       </div>

//                       <div className="multi__input__card ">
//                         {psAcId === each.id ||
//                         pSacImagesFromTask?.InstallationCertificate ? (
//                           <img
//                             src={pSacImagesFromTask.InstallationCertificate}
//                             alt=""
//                           />
//                         ) : (
//                           <img src="" alt="" />
//                         )}
//                       </div>
//                     </div>
//                     <div className="file__image__preview__card">
//                       <div className="file__input__box">
//                         <p
//                           style={{
//                             visibility: "visible",
//                             color: "#f58b76",
//                           }}
//                         >
//                           .
//                         </p>
//                         <FileBase64
//                           type="file"
//                           required="required"
//                           multiple={false}
//                           style={{ display: "none" }}
//                           className="file-card"
//                           onDone={({ base64 }) => {
//                             setPsAcId(each.id);
//                             setPsAcImagesFromTask({
//                               ...pSacImagesFromTask,
//                               installationImage: base64,
//                             });
//                             setPsAcId(key);
//                           }}
//                         />
//                         <span>Installation Image</span>
//                       </div>

//                       <div className="multi__input__card ">
//                         {psAcId === each.id ||
//                         pSacImagesFromTask?.installationImage ? (
//                           <img
//                             src={pSacImagesFromTask.installationImage}
//                             alt=""
//                           />
//                         ) : (
//                           <img src="" alt="" />
//                         )}
//                       </div>
//                     </div>

//                     <div className="file__image__preview__card">
//                       <div className="file__input__box">
//                         <p
//                           style={{
//                             visibility: "visible",
//                             color: "#f58b76",
//                           }}
//                         >
//                           .
//                         </p>
//                         <FileBase64
//                           type="file"
//                           required="required"
//                           multiple={false}
//                           style={{ display: "none" }}
//                           className="file-card"
//                           onDone={({ base64 }) => {
//                             setPsAcId(each.id);
//                             setPsAcImagesFromTask({
//                               ...pSacImagesFromTask,
//                               CompletedCertificate: base64,
//                             });
//                             setPsAcId(key);
//                           }}
//                         />
//                         <span>Completed Certificate</span>
//                       </div>

//                       <div className="multi__input__card ">
//                         {psAcId === each.id ||
//                         pSacImagesFromTask?.CompletedCertificate ? (
//                           <img
//                             src={pSacImagesFromTask.CompletedCertificate}
//                             alt=""
//                           />
//                         ) : (
//                           <img src="" alt="" />
//                         )}
//                       </div>
//                     </div>
//                   </div> */
// }
// {
//   /* <div className="accept__or__rejected__card">
//                     {each.action === "accepted" && (
//                       <div key={key} className="upload__file__card">
//                         {each.installationImage ? (
//                           <div>
//                             <img
//                               className="upload__file__images"
//                               src={each.InstallationCertificate}
//                               alt=""
//                             />
//                           </div>
//                         ) : (
//                           <div
//                             style={{
//                               display: "flex",
//                               flexDirection: "column",
//                               gap: "0.3rem",
//                             }}
//                           >
//                             <FileBase64
//                               type="file"
//                               id="imageI"
//                               multiple={false}
//                               style={{ display: "none" }}
//                               className="file-card"
//                               onDone={({ base64 }) => {
//                                 setPsAcImagesFromTask({
//                                   ...pSacImagesFromTask,
//                                   InstallationCertificate: base64,
//                                 });
//                                 setPsAcId(each?.id);
//                               }}
//                             />

//                             <label htmlFor="imageI">
//                               Installation certificate
//                             </label>
//                             {psAcId === each.id &&
//                               pSacImagesFromTask?.InstallationCertificate && (
//                                 <img
//                                   className="upload__file__images"
//                                   src={
//                                     pSacImagesFromTask.InstallationCertificate
//                                   }
//                                   alt=""
//                                 />
//                               )}
//                           </div>
//                         )}
//                         {each.InstallationCertificate ? (
//                           <div>
//                             <img
//                               className="upload__file__images"
//                               src={each.installationImage}
//                               alt=""
//                             />
//                           </div>
//                         ) : (
//                           <div
//                             style={{
//                               display: "flex",
//                               flexDirection: "column",
//                               gap: "0.3rem",
//                             }}
//                           >
//                             <FileBase64
//                               type="file"
//                               id="imagess"
//                               multiple={false}
//                               style={{ display: "none" }}
//                               className="file-card"
//                               onDone={({ base64 }) => {
//                                 setPsAcImagesFromTask({
//                                   ...pSacImagesFromTask,
//                                   installationImage: base64,
//                                 });
//                                 setPsAcId(each?.id);
//                               }}
//                             />

//                             <label htmlFor="imagess">Installation Image</label>
//                             {psAcId === each.id &&
//                               pSacImagesFromTask?.installationImage && (
//                                 <img
//                                   className="upload__file__images"
//                                   src={pSacImagesFromTask.installationImage}
//                                   alt=""
//                                 />
//                               )}
//                           </div>
//                         )}
//                         {each.CompletedCertificate ? (
//                           <div>
//                             <img
//                               className="upload__file__images"
//                               src={each.CompletedCertificate}
//                               alt=""
//                             />
//                           </div>
//                         ) : (
//                           <div
//                             style={{
//                               display: "flex",
//                               flexDirection: "column",
//                               gap: "0.3rem",
//                             }}
//                           >
//                             <FileBase64
//                               type="file"
//                               id="imagess"
//                               multiple={false}
//                               style={{ display: "none" }}
//                               className="file-card"
//                               onDone={({ base64 }) => {
//                                 setPsAcImagesFromTask({
//                                   ...pSacImagesFromTask,
//                                   CompletedCertificate: base64,
//                                 });
//                                 setPsAcId(each?.id);
//                               }}
//                             />
//                             <label htmlFor="image">Completed Certificate</label>
//                             {psAcId === each.id &&
//                               pSacImagesFromTask?.CompletedCertificate && (
//                                 <img
//                                   className="upload__file__images"
//                                   src={pSacImagesFromTask.CompletedCertificate}
//                                   alt=""
//                                 />
//                               )}
//                           </div>
//                         )}
//                         {each.installationImage ? (
//                           ""
//                         ) : (
//                           <button
//                             // onClick={() => {
//                             //   onUploadAllCertificateBasedOnId(each?.id);
//                             //   setPsAcId(null);
//                             // }}
//                             className="upload__files__button__main"
//                           >
//                             Upload
//                           </button>
//                         )}
//                       </div>
//                     )}
//                     <div
//                       style={{
//                         // display: "flex",
//                         justifyContent: "flex-end",
//                         alignItems: "flex-end",
//                         width: "100%",
//                         marginTop: "20px",
//                         textAlign: "end",
//                         display: each.action === "accepted" ? "none" : "block",
//                       }}
//                     >
//                       <button>nothing</button>
//                     </div>
//                   </div> */
// }
