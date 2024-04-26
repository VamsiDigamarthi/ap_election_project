import React, { useState } from "react";
import "./PaymentModal.css";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { APIS, headers } from "../../data/header";

const data = [
  {
    name: "Phone Pe",
  },
  {
    name: "G Pay",
  },
  {
    name: "Paytm",
  },
];

const PaymentModal = ({
  onOpenPaymentSectionFun, // THIS IS FUNCTION FOR CLOSE THE MODAL
  leftSideUserClickStoreId, // THIS IS STORE USER DETAILS WHO PAYMENT EMPLOYE
  paymentSendSuccessfully, // THIS IS MESSAGE DISPLAY (tosts)
  onUserClickFetchTask,
}) => {
  const UUU = useSelector((state) => state.authReducer.authData);
  // console.log(leftSideUserClickStoreId);
  const [paymentMethod, setPaymentMethod] = useState(null);

  // STORE PAYMENT VALUE LIKE PHONEPE GPAY OR DIST COOR NAME
  const [paymentSelectValue, setPaymentSelectValue] = useState(null);

  // STORE PAYMENT METHODS LIKE PHONEPE OR DISTRICT COOR NAME SIMPLE LIKE ARRAY
  const [paymentClient, setPaymentClient] = useState(null);

  /*
    SELECT DROP DOWN THIS FUNCTION WILL CALL AND STORE THE PAYMENT MODE
    AND IF OFF-LINE STORE DISTRICT COORDINATOR AND
    IN CASE ON-LINE DISPLAY THE PAYMENT METHOSD LIKE PHONEPE, GPAY AND PAYTM
  */
  const onSelectPaymentMethodFun = (e) => {
    setPaymentClient(null);
    setPaymentMethod(e.target.value);
    if (e.target.value === "on-line") {
      setPaymentClient(data);
    } else {
      setPaymentClient(UUU?.name);
      setPaymentSelectValue(UUU?.name);
    }
  };

  const onChangePaymentClientFun = (e) => {
    setPaymentSelectValue(e.target.value);
  };

  /*
    SUBMITTED AFTER PAYMENT IS SUCCESSULLY FROM DIST COOR
    AND UPDATED THE DATABSE FROM SPECIFIC USER
  */
  const onSubmitPaymentSuccessFun = () => {
    APIS.post(
      `/district/payment-mode-admin-update/${leftSideUserClickStoreId._id}`,
      { method: paymentMethod, client: paymentSelectValue },
      {
        headers: headers,
      }
    )
      .then((res) => {
        // console.log(res.data);
        paymentSendSuccessfully(res?.data);
        onOpenPaymentSectionFun();
        // onUserClickFetchTask();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="payment__main__card__modal">
      <div className="main__payment__modal">
        <div className="user__modal__cross__card">
          <span>Payment Details</span>
          <RxCross1 onClick={onOpenPaymentSectionFun} size={20} />
        </div>
        <div className="student__details__card">
          <span>
            Name
            <span>{leftSideUserClickStoreId?.name}</span>
          </span>
          <span>
            Phone Number
            <span>{leftSideUserClickStoreId?.phone}</span>
          </span>
          <span>
            {" "}
            UPI Number
            <span>{leftSideUserClickStoreId?.phonepe}</span>
          </span>
        </div>
        <div className="student__details__card">
          <span>
            Bank Name
            <span>{leftSideUserClickStoreId?.bankname}</span>
          </span>
          <span>
            Bank Number
            <span>{leftSideUserClickStoreId?.banknumber}</span>
          </span>
          <span>
            {" "}
            IFSC Code
            <span>{leftSideUserClickStoreId?.IFSC}</span>
          </span>
        </div>
        <div className="main__payment__card">
          <div className="payment__selecet__card__main">
            <select onChange={onSelectPaymentMethodFun}>
              <option disabled hidden selected>
                SELECT PAYMENT METHOD
              </option>
              <option value="on-line">ON LINE</option>
              <option value="off-line">OFF LINE</option>
            </select>
            {Array.isArray(paymentClient) && paymentClient !== null ? (
              <select onChange={onChangePaymentClientFun}>
                <option disabled hidden selected>
                  SELECT PAYMENT CLIENT
                </option>
                {paymentClient?.map((each, key) => (
                  <option key={key} value={each.name}>
                    {each.name}
                  </option>
                ))}
              </select>
            ) : (
              <div>
                <input type="text" value={paymentClient && paymentClient} />
              </div>
            )}
          </div>
        </div>
        {paymentMethod && paymentSelectValue && (
          <div className="confirm__payment__card">
            <button onClick={onSubmitPaymentSuccessFun}>
              Please Confirm Payment Success
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
