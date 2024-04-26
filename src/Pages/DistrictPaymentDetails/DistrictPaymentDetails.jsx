import React, { useEffect, useState } from "react";
import "./DistrictPaymentDetails.css";
import { APIS, headers } from "../../data/header";
import { useSelector } from "react-redux";
const DistrictPaymentDetails = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  const [paymentUser, setPaymentUser] = useState([]);

  // STORE SORT PAYMENT NOT RECEVIED USER FIRST
  const [sortedUser, setSortedUser] = useState([]);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    APIS.get(`/district/payment/not/received/${UUU?.district}`, {
      headers: headers,
    })
      .then((res) => {
        // console.log(res.data);
        setPaymentUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    const value = Array.from(paymentUser).sort((a, b) =>
      a.pay_mode_user > b.pay_mode_user
        ? 1
        : b.pay_mode_user > a.pay_mode_user
        ? -1
        : 0
    );
    // console.log(value);
    // setSortedUser()
    setSortedUser(value);
  }, [paymentUser]);

  const onYourNameFilterFun = (e) => {
    setUserName(e.target.value);
  };

  // console.log(Array.from(paymentUser));

  return (
    <div className="district__coor__payment">
      <div className="payment_input_card">
        <input
          onChange={onYourNameFilterFun}
          placeholder="Please Enter Name"
          type="text"
        />
        <button>Filter</button>
      </div>
      <div className="all__payment__users__main">
        {sortedUser.length > 0 ? (
          <>
            {sortedUser
              ?.filter((each) =>
                userName === ""
                  ? each
                  : each.name.toLowerCase().includes(userName.toLowerCase())
              )
              .map((each, key) => (
                <div
                  key={key}
                  className="payment__recevied__single__user__card"
                >
                  <div>
                    <span>{each?.name}</span>
                  </div>
                  <span>
                    Phone Number <span>{each?.phone}</span>
                  </span>
                  <span>
                    UPI Number <span>{each?.phonepe}</span>
                  </span>
                  <span>Payment Completed</span>
                  <button
                    style={{
                      background:
                        each?.pay_mode_user === "true" &&
                        each?.payment_text_user === "true"
                          ? "rgb(19, 216, 19)"
                          : "rgb(216, 58, 19)",
                    }}
                  >
                    {each?.pay_mode_user === "true" &&
                    each?.payment_text_user === "true"
                      ? "Payment Recevied"
                      : "Payment Not Recevied"}
                  </button>
                </div>
              ))}
          </>
        ) : (
          <div
            style={{
              width: "100%",
              height: "90vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>No Data Found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default DistrictPaymentDetails;
