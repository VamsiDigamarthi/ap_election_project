import React, { useEffect, useState } from "react";
import "./OwnRegistor.css";
import { stateWiseData } from "../../data/statedata";
import { pleaseChoosImages, resizeFile } from "../../util/showmessages";
const OwnRegistor = () => {
  // user store data state
  const [user, setUser] = useState({
    name: "",
    email: "",
    state: "",
    dist: "",
    assembly: "",
    address: "",
    phonepe: "",
    voteridnumber: "",
    adharnumber: "",
    mandal: "",
    password: "",
    phone: "",
    voterIdImage: "",
    adharIdImage: "",
    role: "",
  });

  // OTP SECINTION SHOW
  const [showOtp, setShowOtp] = useState(false);

  // this two states are form validations
  const [formErrors, setFormErrors] = useState({});

  // state change corresponding district names store state
  const [stateWiseDistState, setStateWiseDistState] = useState([]);

  // user changes input field that corresponding data store there state function
  const usernameChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [gg, setGg] = useState(false);

  // whene user selected state that corresponding district filters
  useEffect(() => {
    if (user.state !== "") {
      const newDist = stateWiseData.filter((each) => each.state === user.state);
      setStateWiseDistState(newDist[0].dist);
    }
  }, [user.state]);

  // validated all users information before there submitted data
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    const name = /^[a-zA-Z\s]*$/;

    if (!values.name) {
      errors.name = "name is required!";
    } else if (!name.test(values.name)) {
      errors.name = "Name shold containe only charaters";
    }
    if (!values.state) {
      errors.state = "state is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.dist) {
      errors.dist = "District is required!";
    }
    if (!values.mandal) {
      errors.mandal = "Mandal number is required!";
    } else if (!name.test(values.mandal)) {
      errors.mandal = "mandal shold containe only charaters";
    }
    // errors.adharnumber = "adhar number number is required!";
    if (!values.adharnumber) {
      errors.adharnumber = "adhar number number is required!";
    } else if (!/^[0-9]{1,}$/.test(values?.adharnumber)) {
      errors.adharnumber = "adhar number must be numeric characters";
    } else if (values.adharnumber.length !== 12) {
      errors.adharnumber = "adhar number must be 12 digits";
    }

    if (!values.voterIdImage) {
      errors.voterIdImage = "Adhar Card Front side is required!";
    }
    if (!values.adharIdImage) {
      errors.adharIdImage = "Adhar Card Back side is required!";
    }

    if (!values.address) {
      errors.address = "address is required!";
    }
    if (!values.phone) {
      // console.log(values?.phone.length);
      errors.phone = "phone number is required!";
    } else if (!/^[0-9]{1,}$/.test(values?.phone)) {
      errors.phone = "phone number must be numeric characters";
    } else if (values?.phone.length !== 10) {
      errors.phone = "phone number must be 10 characters";
    }
    if (!values.phonepe) {
      errors.phonepe = "phonepe number is required!";
    } else if (!/^[0-9]{1,}$/.test(values.phonepe)) {
      errors.phonepe = "phonepe number must be numeric characters";
    } else if (values.phonepe.length !== 10) {
      errors.phonepe = "phonepe number must be 10 characters";
    }

    if (!values.role) {
      errors.role = "Please Selete Role Of Employee";
    }

    return errors;
  };

  // this function takes adhar card front image
  const onFrontAdhrChange = async (event) => {
    try {
      const file = event.target.files[0];
      const image = await resizeFile(file);
      setUser({
        ...user,
        voterIdImage: image,
      });
    } catch (err) {
      console.log(err);
      pleaseChoosImages();
      setUser({
        ...user,
        voterIdImage: "",
      });
    }
  };

  // this function take the adhar card back side image
  const onBackAdhrChange = async (event) => {
    try {
      const file = event.target.files[0];
      const image = await resizeFile(file);
      setUser({
        ...user,
        adharIdImage: image,
      });
    } catch (err) {
      console.log(err);
      pleaseChoosImages();
      setUser({
        ...user,
        adharIdImage: "",
      });
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && gg) {
      // APIS.post(
      //   "/auth/new-sign",
      //   { phone: user.phone, name: user.name },
      //   { headers: headers }
      // )
      //   .then(() => {
      //     setIsSubmit(false);
      //     setSendOtpUiDesign(true);
      //     seonOtp();
      //   })
      //   .catch((e) => {
      //     console.log(e?.response?.data?.msg);
      //     errorMsgApi(e?.response?.data?.msg);
      //   });
      //  APIS.post("/auth/register", user, { headers: headers })
      //    .then((res) => {
      //      console.log(res.data);
      //    })
      //    .catch((e) => {
      //      console.log(e?.response?.data?.msg);
      //      errorMsgApi(e?.response?.data?.msg);
      //    });
    }
  }, [formErrors]);

  // user validated there form and send otp api call

  const onSubmitRegisterDataFn = (e) => {
    e.preventDefault();
    setFormErrors(validate(user));
    setGg(true);
  };

  return (
    <div className="own-registor-main-card">
      {showOtp ? (
        <div className="own-input-cardss">
          <h3>Enter Your OTP</h3>
          <input
            type="text"
            maxLength="4"
            placeholder="Please Enter 4 Digit Otp"
          />
          <button>Submit</button>
        </div>
      ) : (
        <>
          <div className="own-input-card">
            <div className="inputBox">
              <p
                style={{
                  visibility: "visible",
                  color: "#f58b76",
                }}
              >
                {formErrors.name ? formErrors.name : "."}
              </p>
              <input
                onChange={usernameChange}
                type="text"
                name="name"
                required="required"
                value={user.name}
              />
              <span>Name as Per Adhar Card</span>
            </div>
            <div className="inputBox">
              <p
                style={{
                  visibility: "visible",
                  color: "#f58b76",
                }}
              >
                {formErrors.email ? formErrors.email : "."}
              </p>
              <input
                onChange={usernameChange}
                type="text"
                name="email"
                required="required"
                value={user.email}
              />
              <span>Email</span>
            </div>
          </div>
          <div className="own-input-card">
            <div className="inputBox">
              <p
                style={{
                  visibility: "visible",
                  color: "#f58b76",
                }}
              >
                {formErrors.state ? formErrors.state : "."}
              </p>
              <select name="state" onChange={usernameChange}>
                <option disabled hidden selected>
                  STATE
                </option>
                {stateWiseData.map((each, key) => (
                  <option value={each.state} key={key}>
                    {each.state}
                  </option>
                ))}
              </select>
            </div>
            <div className="inputBox">
              <p
                style={{
                  visibility: "visible",
                  color: "#f58b76",
                }}
              >
                {formErrors.dist ? formErrors.dist : "."}
              </p>
              <select name="dist" onChange={usernameChange}>
                <option disabled hidden selected>
                  DISTRICT
                </option>
                {stateWiseDistState?.map((each, key) => (
                  <option value={each.name} key={key}>
                    {each.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="own-input-card">
            <div className="inputBox">
              <p
                style={{
                  visibility: "visible",
                  color: "#f58b76",
                }}
              >
                {formErrors.mandal ? formErrors.mandal : "."}
              </p>
              <input
                onChange={usernameChange}
                type="text"
                required="required"
                name="mandal"
                value={user.mandal}
              />
              <span>Mandal</span>
            </div>
            <div className="inputBox">
              <p
                style={{
                  visibility: "visible",
                  color: "#f58b76",
                }}
              >
                {formErrors.adharnumber ? formErrors.adharnumber : "."}
              </p>
              <input
                onChange={usernameChange}
                type="text"
                name="adharnumber"
                required="required"
                value={user.adharnumber}
              />
              <span>Adhar Number</span>
            </div>
          </div>
          <div className="own-input-card">
            <div className="inputBox">
              <p
                style={{
                  visibility: "visible",
                  color: "#f58b76",
                }}
              >
                {formErrors.phone ? formErrors.phone : "."}
              </p>
              <input
                onChange={usernameChange}
                type="text"
                name="phone"
                required="required"
                value={user.phone}
              />
              <span>Phone Number</span>
            </div>
            <div className="inputBox">
              <p
                style={{
                  visibility: "visible",
                  color: "#f58b76",
                }}
              >
                {formErrors.phonepe ? formErrors.phonepe : "."}
              </p>
              <input
                onChange={usernameChange}
                type="text"
                required="required"
                name="phonepe"
                value={user.phonepe}
              />
              <span>UPI Number</span>
            </div>
          </div>

          <div className="own-input-card">
            <div className="file__image__preview__card">
              <div className="file__input__box">
                <p
                  style={{
                    visibility: "visible",
                    color: "#f58b76",
                  }}
                >
                  {formErrors.voterIdImage ? formErrors.voterIdImage : "."}
                </p>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={onFrontAdhrChange}
                />

                <span>Adhar Id Frontside</span>
              </div>
              <div className="multi__input__card ">
                {user.voterIdImage ? (
                  <img src={user.voterIdImage} alt="" />
                ) : (
                  <img src="" alt="" />
                )}
              </div>
            </div>
            <div className="file__image__preview__card">
              <div className="file__input__box">
                <p
                  style={{
                    visibility: "visible",
                    color: "#f58b76",
                  }}
                >
                  {formErrors.adharIdImage ? formErrors.adharIdImage : "."}
                </p>

                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={onBackAdhrChange}
                />
                <span>Adhar Id Backside</span>
              </div>
              <div className="multi__input__card ">
                {user.adharIdImage ? (
                  <img src={user.adharIdImage} alt="" />
                ) : (
                  <img src="" alt="" />
                )}
              </div>
            </div>
          </div>

          <div className="own-input-card">
            <div className="text__are__card">
              <p
                style={{
                  visibility: "visible",
                  color: "#f58b76",
                }}
              >
                {formErrors.address ? formErrors.address : "."}
              </p>

              <textarea
                cols="200"
                rows="7"
                name="address"
                placeholder="Enter Your Address"
                required="required"
                onChange={usernameChange}
                value={user.address}
              ></textarea>
            </div>
          </div>
          <div className="own-input-card">
            <div
              style={{
                width: "100%",
              }}
              className="inputBox"
            >
              <p
                style={{
                  visibility: "visible",
                  color: "#f58b76",
                }}
              >
                {formErrors.role ? formErrors.role : "."}
              </p>
              <select
                onChange={usernameChange}
                name="role"
                className="new-seleceted"
              >
                <option disabled hidden selected>
                  SELECT THE ROLE
                </option>
                <option value="1">State Coordinator</option>
                <option value="2">District Coordinator</option>
                <option value="5">Assembly Coordinator</option>
              </select>
            </div>
          </div>
          <div className="own-input-card">
            <button onClick={onSubmitRegisterDataFn}>Registor User</button>
          </div>
        </>
      )}
    </div>
  );
};

export default OwnRegistor;
