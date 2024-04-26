import React, { useEffect, useState } from "react";
import "./User.css";
import { LiaAddressCard } from "react-icons/lia";
import { IoIosContact } from "react-icons/io";
import { MdOutlineOtherHouses } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import EditUserDetails from "../EditUserDetails/EditUserDetails";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { APIS, headers } from "../../data/header";
import { editUseSuccessaa } from "../../util/showmessages";
import { motion } from "framer-motion";
const User = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  const transition = { type: "spring", duration: 3 };
  // EDIT MODAL OPEN STATE
  const [openUserModal, setOpenModalUser] = useState(false);
  // STORE THE USER INFORMATION FROM API (getUserDataGromApis)
  const [userDataFromApi, setUserDataFromApi] = useState({});

  // USER EDIT THERE INFORMATION OPEN MODAL FUNCTION
  const onOpenEditUserDetailsModal = () => {
    setOpenModalUser(!openUserModal);
  };

  const editUseSuccess = () => {
    editUseSuccessaa();
  };

  // FETCH THERE INFORMATION FROM DATA BASE
  const getUserDataGromApis = () => {
    APIS.get(`/user/user-get-profile/${UUU?._id}`, {
      headers: headers,
    })
      .then((res) => {
        console.log(res.data);
        setUserDataFromApi(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // AFTER LOGIN SUCCESS FETCH THERE INFORMATION
  useEffect(() => {
    if (UUU) {
      getUserDataGromApis();
    }
  }, [UUU]);

  function capitalizeName(name) {
    const words = name?.split(" ");
    const capitalizedWords = words?.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    const capitalizedName = capitalizedWords?.join(" ");

    return capitalizedName;
  }

  return (
    <div className="user__main__card">
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

      <div
        style={{
          filter: openUserModal && "blur(20px)",
        }}
        className="user__inner__main__card"
      >
        <div className="user__left__main">
          <div className="user__name__pic__card">
            <div>
              <div>
                <h2>{capitalizeName(userDataFromApi?.name)?.slice(0, 16)}</h2>
                <button onClick={onOpenEditUserDetailsModal}>Edit</button>
              </div>
              <span>Thanks for joining.</span>
              <span> We’re thrilled to have you. </span>
              <span>
                Welcome to{" "}
                <span className="company__info">Brihaspathi Tech Pvt Lmt</span>{" "}
              </span>
              <span>
                Get ready for some amazing deals and updates right here
                .............!
              </span>
            </div>
            {/* user profile card */}
            <div className="user__main__profile">
              <img src="Images/pngwing.com.png" alt="" />
              <img src="Images/remove-back-user.png" alt="" />
            </div>
          </div>
          {/* user all address and details card */}
          <div className="user__all__addresss__details__card">
            <div className="addess__card">
              <span>
                <LiaAddressCard size={25} />
              </span>
              <span>Address</span>
              <span>{userDataFromApi?.address?.toLowerCase()}</span>
            </div>
            <div className="contact__info">
              <div>
                <span>
                  <IoIosContact size={25} />
                </span>
              </div>
              <div className="contact__info__new">
                <span>Phone-</span>
                <span>{userDataFromApi?.phone}</span>
              </div>
              <div className="contact__info__new">
                <span>UPI-</span>
                <span>
                  {userDataFromApi?.phonepe
                    ? userDataFromApi?.phonepe
                    : "No Found"}
                </span>
              </div>
              <div className="contact__info__new">
                <span>Adhaar-</span>
                <span>{userDataFromApi?.adharnumber}</span>
              </div>
              {/* <span>
                Phone No - <span>{userDataFromApi?.phone}</span>
              </span>
              <span>
                UPI - <span>{userDataFromApi?.phonepe}</span>
              </span>

              <span>
                Adhaar - <span>{userDataFromApi?.adharnumber}</span>
              </span> */}
            </div>
            <div className="other__details">
              <span>
                <MdOutlineOtherHouses size={25} />
              </span>
              <span>{userDataFromApi?.state}</span>
              <span>{userDataFromApi?.district}</span>
              {/* <span>{userDataFromApi?.assembly}</span> */}
              <span>{userDataFromApi?.assembly}</span>
            </div>
          </div>
        </div>
        {/* <div className="user__right__main">
          <img src={userDataFromApi?.voteridurl} alt="" />
          <img src={userDataFromApi?.adharidurl} alt="" />
        </div> */}
      </div>
      {openUserModal && (
        <div className="user__edit__modal__main__card">
          <div className="user__modal__inner__card new__user__edit">
            <div className="user__modal__cross__card">
              <span>Edit Your Details</span>
              <RxCross1 onClick={onOpenEditUserDetailsModal} size={20} />
            </div>
            <EditUserDetails
              onOpenEditUserDetailsModal={onOpenEditUserDetailsModal}
              editUseSuccess={editUseSuccess}
              getUserDataGromApis={getUserDataGromApis}
              userDataFromApi={userDataFromApi}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
