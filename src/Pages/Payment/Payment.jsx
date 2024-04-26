import React, { useEffect, useState } from "react";
import "./Payment.css";
import { APIS, headers } from "../../data/header";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";
const Payment = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  const [initialPaymentMode, setInitialPaymentMode] = useState(null);

  const [districtCoordinatorDetails, setDistrictCoordinatorDetails] = useState(
    []
  );

  const [userDataFromApi, setUserDataFromApi] = useState({});

  const initialPaymentData = () => {
    APIS.get(`/payment/payment-mode-admin-to-user/${UUU?._id}`, {
      headers: headers,
    })
      .then((res) => {
        // console.log(res.data);
        setInitialPaymentMode(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // fetch district coordinator

  // console.log(UUU);

  const onDistrictCoordinator = () => {
    APIS.get(
      `/state/fetch-district-coordinator/${UUU?.district}/state/${UUU?.state}`,
      {
        headers: headers,
      }
    )
      .then((res) => {
        // console.log(res.data);
        setDistrictCoordinatorDetails(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // FETCH THERE INFORMATION FROM DATA BASE
  const getUserDataGromApis = () => {
    APIS.get(`/user/user-get-profile/${UUU?._id}`, {
      headers: headers,
    })
      .then((res) => {
        // console.log(res);
        setUserDataFromApi(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    initialPaymentData();
    onDistrictCoordinator();
    getUserDataGromApis();
  }, []);

  // console.log(initialPaymentMode);

  // const initialPaymentMode = [
  //   {
  //     pay_mode_admin: "true",
  //     pay_mode_user: "false",
  //     payment_text_user: "true",
  //   },
  // ];

  const onPaymentModeAccepted = () => {
    APIS.put(
      `/payment/payment-mode-user-update/${UUU?._id}`,
      { paymentmode: "true", paymentText: "true" },
      {
        headers: headers,
      }
    )
      .then((res) => {
        // console.log(res.data);
        initialPaymentData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onPaymentModeRejected = () => {
    APIS.put(
      `/payment/payment-mode-user-update-two-mode/${UUU?._id}`,
      { paymentuserMode: "false", paymentText: "true" },
      {
        headers: headers,
      }
    )
      .then((res) => {
        // console.log(res.data);
        initialPaymentData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onConfirmPayment = () => {
    console.log("cvbnm,./");
    APIS.put(
      `/payment/payment-mode-user-confirm/${UUU?._id}`,
      { paymentuserMode: "true" },
      {
        headers: headers,
      }
    )
      .then((res) => {
        console.log(res.data);
        initialPaymentData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // console.log(userDataFromApi);

  return (
    <div className="payment__method__main__card">
      <h2>Our Payment Details</h2>
      <div className="payment__inner__card">
        {initialPaymentMode && (
          <>
            {initialPaymentMode?.pay_mode_admin === "false" &&
            initialPaymentMode?.pay_mode_user === "false" &&
            initialPaymentMode?.payment_text_user === "false" ? (
              <div className="payment__initial__question__card">
                <h2>Waiting For Your Payment</h2>
                <span>First Completed Your Task</span>
              </div>
            ) : (
              <>
                {initialPaymentMode?.pay_mode_admin === "true" &&
                initialPaymentMode?.pay_mode_user === "false" &&
                initialPaymentMode?.payment_text_user === "false" ? (
                  <div className="payment__succecc__question__card">
                    <h3>Have You Recevied Your Payment</h3>
                    {/* <span>Have You Recevied Your Payment</span> */}
                    <div className="payment__buttons">
                      <button onClick={onPaymentModeAccepted}>Yes</button>
                      <button onClick={onPaymentModeRejected}>No</button>
                    </div>
                  </div>
                ) : (
                  <>
                    {initialPaymentMode?.pay_mode_admin === "true" &&
                    initialPaymentMode?.pay_mode_user === "false" &&
                    initialPaymentMode?.payment_text_user === "true" ? (
                      <div className="payment__text__display__district__details__card">
                        <div className="district__details__show__card">
                          <h2>Please Contact Your District Coordinator</h2>
                          <div className="payment__account__details">
                            <span>Name</span>
                            <span>{districtCoordinatorDetails?.name}</span>
                          </div>
                          <div className="payment__account__details">
                            <span>Phone Number</span>
                            <span>{districtCoordinatorDetails?.phone}</span>
                          </div>
                          <h3
                            style={{
                              color: "lightslategray",
                              textAlign: "start",
                              marginTop: "10px",
                            }}
                          >
                            If Your Recevied Payment Please Confirm Otherwise
                          </h3>
                          <span
                            style={{
                              color: "lightslategray",
                            }}
                          >
                            other wise You Con't Download Your Certificate
                          </span>
                          <div className="ditrict__confirm__card">
                            <button onClick={onConfirmPayment}>Confirm</button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="paymet__all_done__card">
                        <div className="payment__successfully_card">
                          <span className="tic_success__card">
                            <TiTick size="20" color="#fff" />
                          </span>
                          <h4
                            style={{
                              color: "#0ac914",
                            }}
                          >
                            Payment Successfully ..!
                          </h4>
                          <div className="payment__account__details">
                            <span>Amount Pay</span>
                            {/* <span>2000 /-</span> */}
                          </div>
                          <div className="payment__account__details">
                            <span>UPI No</span>
                            <span>{UUU?.phonepe}</span>
                          </div>
                          {userDataFromApi?.download_cer ? (
                            <span>
                              You Are Already downloaded The Certificate
                            </span>
                          ) : (
                            <>
                              <h4
                                style={{
                                  textAlign: "center",
                                  lineHeight: "2",
                                }}
                              >
                                You Can Download Certificate Only Once If You
                                loose the certificate We Cont't Download and We
                                Con't Provided
                              </h4>
                              <span>
                                Go To Certificate Page
                                <Link to="/certificate">Click here</Link>
                              </span>
                            </>
                          )}
                        </div>
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
  );
};

export default Payment;
