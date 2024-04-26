import React, { useState } from "react";
import "./EditUserDetails.css";
import { useSelector } from "react-redux";
import { APIS, headers } from "../../data/header";
import { pleaseChoosImages, resizeFileAdhar } from "../../util/showmessages";
const EditUserDetails = ({
  editUseSuccess,
  onOpenEditUserDetailsModal,
  getUserDataGromApis,
  userDataFromApi,
}) => {
  const UUU = useSelector((state) => state.authReducer.authData);
  // console.log(userDataFromApi);

  const [editUserDetailsState, setEditUserDetailsState] = useState({
    username: userDataFromApi?.name,
    // phone: userDataFromApi?.phone,
    phonepe: userDataFromApi?.phonepe,
    address: userDataFromApi?.address,
    email: userDataFromApi?.email,
    profilePic: userDataFromApi?.profilePic,
    bankname: userDataFromApi?.bankname,
    banknumber: userDataFromApi?.banknumber,
    IFSC: userDataFromApi?.IFSC,
    branchName: userDataFromApi?.branchName,
  });

  const onChangeEditProfileInput = (e) => {
    setEditUserDetailsState({
      ...editUserDetailsState,
      [e.target.name]: e.target.value,
    });
  };

  const onEditUserSubmit = () => {
    // console.log(editUserDetailsState);
    APIS.put(`/user/update-profile/${UUU?._id}`, editUserDetailsState, {
      headers: headers,
    })
      .then((res) => {
        editUseSuccess();
        onOpenEditUserDetailsModal();
        getUserDataGromApis();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // this function takes adhar card front image
  const onFrontAdhrChange = async (event) => {
    try {
      const file = event.target.files[0];
      const image = await resizeFileAdhar(file);
      setEditUserDetailsState({
        ...editUserDetailsState,
        profilePic: image,
      });
    } catch (err) {
      console.log(err);
      pleaseChoosImages();
      setEditUserDetailsState({
        ...editUserDetailsState,
        profilePic: "",
      });
    }
  };

  // console.log(editUserDetailsState);

  return (
    <div className="editmodal__main__card">
      <h2>Personal Details</h2>
      <div className="edit__user__new__second__card">
        <div className="user__edit__signle__input__div">
          <input
            type="text"
            value={editUserDetailsState?.username}
            name="username"
            onChange={onChangeEditProfileInput}
          />
          <span>Name</span>
        </div>
        <div className="user__edit__signle__input__div">
          <input
            type="text"
            value={editUserDetailsState?.email}
            onChange={onChangeEditProfileInput}
            name="email"
          />
          <span>Email</span>
        </div>
      </div>
      <div className="edit__user__new__second__card">
        <div className="file__image__preview__card">
          <div className="file__input__box">
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={onFrontAdhrChange}
            />
            <span>Profile Pic</span>
          </div>
          <div className="multi__input__card ">
            {editUserDetailsState?.profilePic ? (
              <img src={editUserDetailsState?.profilePic} alt="" />
            ) : (
              <img src="" alt="" />
            )}
          </div>
        </div>
        <div
          style={{
            alignSelf: "flex-start",
          }}
          className="user__edit__signle__input__div"
        >
          <input
            type="text"
            onChange={onChangeEditProfileInput}
            value={editUserDetailsState.phonepe}
            required="required"
            name="phonepe"
          />
          <span>UPI Number</span>
        </div>
      </div>

      <textarea
        rows="5"
        onChange={onChangeEditProfileInput}
        value={editUserDetailsState?.address}
        name="address"
      ></textarea>
      <h2>Bank Details</h2>
      <div className="edit__user__new__second__card">
        <div className="user__edit__signle__input__div">
          <input
            onChange={onChangeEditProfileInput}
            type="text"
            name="bankname"
            required="required"
            value={editUserDetailsState?.bankname}
          />
          <span>Bank Name</span>
        </div>
        <div className="user__edit__signle__input__div">
          <input
            onChange={onChangeEditProfileInput}
            type="text"
            required="required"
            name="banknumber"
            value={editUserDetailsState?.banknumber}
          />
          <span>Bank Account Name</span>
        </div>
      </div>
      <div className="edit__user__new__second__card">
        <div className="user__edit__signle__input__div">
          <input
            onChange={onChangeEditProfileInput}
            type="text"
            required="required"
            name="IFSC"
            value={editUserDetailsState?.IFSC}
          />
          <span>IFSC Code</span>
        </div>
        <div className="user__edit__signle__input__div">
          <input
            onChange={onChangeEditProfileInput}
            type="text"
            required="required"
            name="branchName"
            value={editUserDetailsState?.branchName}
          />
          <span>Branch Name</span>
        </div>
      </div>
      <button onClick={onEditUserSubmit}>Submit</button>
    </div>
  );
};

export default EditUserDetails;
