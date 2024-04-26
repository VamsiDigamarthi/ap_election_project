import React, { useEffect, useState } from "react";
import "./Sidebad.css";
import { MdOutlineHomeWork } from "react-icons/md";
import { TbDeviceIpadMinus } from "react-icons/tb";
import { AiOutlineAccountBook, AiOutlineMessage } from "react-icons/ai";
import { TbClearAll } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { BsListTask } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../action/AuthAction";
import { BiSolidUserDetail } from "react-icons/bi";
import { GoTasklist } from "react-icons/go";
import { FaArrowDownUpAcrossLine } from "react-icons/fa6";
import { SiAmazonpay } from "react-icons/si";
import { BsFiletypeExe } from "react-icons/bs";
import { LiaRecordVinylSolid } from "react-icons/lia";
import { TfiControlEject } from "react-icons/tfi";

export const Sidebar = ({ children, taskAssignAdminModalOpen }) => {
  const UUU = useSelector((state) => state.authReducer.authData);
  const [leftOpenState, setLeftOpenState] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const location = useLocation();
  const pathValue = location.pathname;
  const onSidebarOpenWheneHamClick = () => {
    setLeftOpenState(true);
  };

  const onSidebarCloseWheneHamClick = () => {
    setLeftOpenState(false);
  };
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logout());
  };
  // side left container

  const sideLeftContainer = {
    display: leftOpenState && "block",
    position: leftOpenState && "absolute",
    top: leftOpenState && "0px",
    left: leftOpenState && "0px",
    zIndex: leftOpenState && "3000000",
    width: leftOpenState && "56%",
    height: leftOpenState && "100vh",
    background: leftOpenState && "#3d4168",
    // background: leftOpenState && "#fffffc",
    filter: taskAssignAdminModalOpen && "blur(10px)",
  };

  useEffect(() => {
    let value = localStorage.getItem("activeTab");
    // console.log(value);
    // console.log(typeof value);
    value = JSON.parse(value);
    setActiveTab(parseInt(value));
  }, []);

  const onTabLeftSideClick = (number) => {
    setLeftOpenState(false);
    setActiveTab(number);
    localStorage.setItem("activeTab", JSON.stringify(number));
  };
  return (
    <>
      <div className="main__side__bar">
        {pathValue !== "/register" &&
          pathValue !== "/certificate" &&
          pathValue !== "/user/all/assembly/pdf" &&
          pathValue !== "/user/all/majuli/pdf" && (
            <div style={sideLeftContainer} className="left__side__bar">
              <div className="logo__imgh__card">
                <img
                  src="Images/imgbin-logo-icon-design-legal-name-others-Aec96Bx7TkZEsTVsgGQpwUTp2_t-removebg-preview.png"
                  alt=""
                />
                <div>
                  <span>Company</span>
                  <span>Brihaspathi Tech</span>
                </div>
              </div>
              {UUU && (
                <>
                  {" "}
                  {UUU?.role === "1" && (
                    <Link to="/" className="all__links">
                      <div
                        style={{
                          background: activeTab === 0 && "#ff6f00",
                          borderRadius: "10px",
                        }}
                        className="left__side__bar__icons__card"
                      >
                        <div onClick={() => onTabLeftSideClick(0)}>
                          <MdOutlineHomeWork /> <span>Home</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              )}
              {/* {UUU && (
              <>
                {UUU?.role === "1" && (
                  <Link to="super-admin" className="all__links">
                    <div
                      style={{
                        background: activeTab === 1 && "#ff6f00",
                        borderRadius: "10px",
                      }}
                      className="left__side__bar__icons__card"
                    >
                      <div onClick={() => onTabLeftSideClick(1)}>
                        <TbDeviceIpadMinus />
                        <span>Upload Cams</span>
                      </div>
                    </div>
                  </Link>
                )}
              </>
            )} */}

              {UUU && (
                <>
                  {UUU?.role === "4" && (
                    <Link to="upload" className="all__links">
                      <div
                        style={{
                          background: activeTab === 0 && "#ff6f00",
                          borderRadius: "10px",
                        }}
                        className="left__side__bar__icons__card"
                      >
                        <div onClick={() => onTabLeftSideClick(0)}>
                          <TbDeviceIpadMinus />
                          <span>Upload Cams</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              )}

              {UUU && (
                <>
                  {UUU?.role === "4" && (
                    <Link to="manages" className="all__links">
                      <div
                        style={{
                          background: activeTab === 1 && "#ff6f00",
                          borderRadius: "10px",
                        }}
                        className="left__side__bar__icons__card"
                      >
                        <div onClick={() => onTabLeftSideClick(1)}>
                          <TbDeviceIpadMinus />
                          <span>Manages Cams</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              )}

              {/* {UUU && (
              <>
                {UUU?.role === "4" && (
                  <Link to="own/records" className="all__links">
                    <div
                      style={{
                        background: activeTab === 2 && "#ff6f00",
                        borderRadius: "10px",
                      }}
                      className="left__side__bar__icons__card"
                    >
                      <div onClick={() => onTabLeftSideClick(2)}>
                        <LiaRecordVinylSolid />
                        <span>Registor Emp</span>
                      </div>
                    </div>
                  </Link>
                )}
              </>
            )} */}

              {UUU && (
                <>
                  {UUU?.role === "4" && (
                    <Link to="change/role" className="all__links">
                      <div
                        style={{
                          background: activeTab === 3 && "#ff6f00",
                          borderRadius: "10px",
                        }}
                        className="left__side__bar__icons__card"
                      >
                        <div onClick={() => onTabLeftSideClick(3)}>
                          <TfiControlEject />
                          <span>Change Role</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              )}

              {UUU && (
                <>
                  {UUU?.role === "4" && (
                    <Link to="download/user" className="all__links">
                      <div
                        style={{
                          background: activeTab === 4 && "#ff6f00",
                          borderRadius: "10px",
                        }}
                        className="left__side__bar__icons__card"
                      >
                        <div onClick={() => onTabLeftSideClick(4)}>
                          <TfiControlEject />
                          <span>Users Data</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              )}

              {UUU && (
                <>
                  {UUU?.role === "4" && (
                    <Link to="download/user/pdfs" className="all__links">
                      <div
                        style={{
                          background: activeTab === 5 && "#ff6f00",
                          borderRadius: "10px",
                        }}
                        className="left__side__bar__icons__card"
                      >
                        <div onClick={() => onTabLeftSideClick(5)}>
                          <TfiControlEject />
                          <span>Users PDFs</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              )}

              {UUU && (
                <>
                  {UUU?.role === "1" && (
                    <Link to="state/assign/task" className="all__links">
                      <div
                        style={{
                          background: activeTab === 1 && "#ff6f00",
                          borderRadius: "10px",
                        }}
                        className="left__side__bar__icons__card"
                      >
                        <div onClick={() => onTabLeftSideClick(1)}>
                          <TbDeviceIpadMinus />
                          <span>Assign Tasks</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              )}

              {UUU && (
                <>
                  {UUU?.role === "2" && (
                    <Link to="/admin" className="all__links">
                      <div
                        style={{
                          background: activeTab === 0 && "#ff6f00",
                          borderRadius: "10px",
                        }}
                        className="left__side__bar__icons__card"
                      >
                        <div onClick={() => onTabLeftSideClick(0)}>
                          <AiOutlineAccountBook />
                          <span>Home</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              )}

              {/*  */}

              {UUU && (
                <>
                  {UUU?.role === "2" && (
                    <Link to="/detailsps" className="all__links">
                      <div
                        style={{
                          background: activeTab === 1 && "#ff6f00",
                          borderRadius: "10px",
                        }}
                        className="left__side__bar__icons__card"
                      >
                        <div onClick={() => onTabLeftSideClick(1)}>
                          <BiSolidUserDetail />
                          <span>PS Details</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              )}

              {/* assign task s */}

              {UUU && (
                <>
                  {UUU?.role === "2" && (
                    <Link to="/assigntask" className="all__links">
                      <div
                        style={{
                          background: activeTab === 2 && "#ff6f00",
                          borderRadius: "10px",
                        }}
                        className="left__side__bar__icons__card"
                      >
                        <div onClick={() => onTabLeftSideClick(2)}>
                          <GoTasklist />
                          <span>Assign Task</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              )}

              {/* rejected task */}

              {/* {UUU && (
              <>
                {UUU?.role === "2" && (
                  <Link to="/rejected" className="all__links">
                    <div
                      style={{
                        background: activeTab === 3 && "#ff6f00",
                        borderRadius: "10px",
                      }}
                      className="left__side__bar__icons__card"
                    >
                      <div onClick={() => onTabLeftSideClick(3)}>
                        <FaArrowDownUpAcrossLine />
                        <span>Rejected Task</span>
                      </div>
                    </div>
                  </Link>
                )}
              </>
            )} */}

              {/* payment show district coor */}
              {UUU && (
                <>
                  {UUU?.role === "2" && (
                    <Link to="/payment-district-coor" className="all__links">
                      <div
                        style={{
                          background: activeTab === 4 && "#ff6f00",
                          borderRadius: "10px",
                        }}
                        className="left__side__bar__icons__card"
                      >
                        <div onClick={() => onTabLeftSideClick(4)}>
                          <SiAmazonpay />
                          <span>Payment Details</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              )}

              {/* District Corr Exel Sheet */}

              {UUU && (
                <>
                  {UUU?.role === "2" && (
                    <Link to="/exel/details" className="all__links">
                      <div
                        style={{
                          background: activeTab === 5 && "#ff6f00",
                          borderRadius: "10px",
                        }}
                        className="left__side__bar__icons__card"
                      >
                        <div onClick={() => onTabLeftSideClick(5)}>
                          <BsFiletypeExe />
                          <span>Exel Details</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              )}

              {/* {UUU && (
              <>
                {UUU?.role === "2" && (
                  <Link to="/show/user/pdf" className="all__links">
                    <div
                      style={{
                        background: activeTab === 6 && "#ff6f00",
                        borderRadius: "10px",
                      }}
                      className="left__side__bar__icons__card"
                    >
                      <div onClick={() => onTabLeftSideClick(6)}>
                        <AiOutlineAccountBook />
                        <span>User Details</span>
                      </div>
                    </div>
                  </Link>
                )}
              </>
            )} */}

              {/* {UUU && (
              <>
                {UUU[0]?.role === 2 && (
                  <Link to="/chat" className="all__links">
                    <div className="left__side__bar__icons__card">
                      <div onClick={() => setLeftOpenState(false)}>
                        <AiOutlineMessage />
                        <span>Chat</span>
                      </div>
                    </div>
                  </Link>
                )}
              </>
            )} */}

              {UUU && (
                <>
                  {UUU?.role === "3" && (
                    <Link to="/user" className="all__links">
                      <div
                        style={{
                          background: activeTab === 0 && "#ff6f00",
                          borderRadius: "10px",
                        }}
                        className="left__side__bar__icons__card"
                      >
                        <div onClick={() => onTabLeftSideClick(0)}>
                          <FiUsers />
                          <span>Home</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              )}

              {/* {UUU && (
              <>
                {UUU?.role === "3" && (
                  <Link to="/learning" className="all__links">
                    <div
                      style={{
                        background: activeTab === 1 && "#ff6f00",
                        borderRadius: "10px",
                      }}
                      className="left__side__bar__icons__card"
                    >
                      <div onClick={() => onTabLeftSideClick(1)}>
                        <TbClearAll />
                        <span>Learning</span>
                      </div>
                    </div>
                  </Link>
                )}
              </>
            )} */}

              {UUU && (
                <>
                  {UUU?.role === "3" && (
                    <Link to="/tasks" className="all__links">
                      <div
                        style={{
                          background: activeTab === 2 && "#ff6f00",
                          borderRadius: "10px",
                        }}
                        className="left__side__bar__icons__card"
                      >
                        <div onClick={() => onTabLeftSideClick(2)}>
                          <BsListTask />
                          <span>Our Tasks</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              )}

              {UUU && (
                <>
                  {UUU?.role === "3" && (
                    <Link to="/payment" className="all__links">
                      <div
                        style={{
                          background: activeTab === 3 && "#ff6f00",
                          borderRadius: "10px",
                        }}
                        className="left__side__bar__icons__card"
                      >
                        <div onClick={() => onTabLeftSideClick(3)}>
                          <BsListTask />
                          <span>Payment Section</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              )}

              {/* profile start */}
              {UUU && (
                <>
                  {UUU?.role === "3" && (
                    <Link to="/profile/card" className="all__links">
                      <div
                        style={{
                          background: activeTab === 4 && "#ff6f00",
                          borderRadius: "10px",
                        }}
                        className="left__side__bar__icons__card"
                      >
                        <div onClick={() => onTabLeftSideClick(4)}>
                          <FiUsers />
                          <span>Profile Card</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              )}
              {/* profile end */}
              {/*
               */}
              {/*  */}

              {UUU && (
                <>
                  {UUU?.role === "5" && (
                    <Link to="/assemblyadmin" className="all__links">
                      <div
                        style={{
                          background: activeTab === 0 && "#ff6f00",
                          borderRadius: "10px",
                        }}
                        className="left__side__bar__icons__card"
                      >
                        <div onClick={() => onTabLeftSideClick(0)}>
                          <AiOutlineAccountBook />
                          <span>Home</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              )}

              {UUU && (
                <>
                  {UUU?.role === "5" && (
                    <Link to="/assembly/detailsps" className="all__links">
                      <div
                        style={{
                          background: activeTab === 1 && "#ff6f00",
                          borderRadius: "10px",
                        }}
                        className="left__side__bar__icons__card"
                      >
                        <div onClick={() => onTabLeftSideClick(1)}>
                          <BiSolidUserDetail />
                          <span>PS Details</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              )}

              {/* assign task s */}

              {UUU && (
                <>
                  {UUU?.role === "5" && (
                    <Link to="/assembly/assigntask" className="all__links">
                      <div
                        style={{
                          background: activeTab === 2 && "#ff6f00",
                          borderRadius: "10px",
                        }}
                        className="left__side__bar__icons__card"
                      >
                        <div onClick={() => onTabLeftSideClick(2)}>
                          <GoTasklist />
                          <span>Assign Task</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              )}

              {/* rejected task */}

              {UUU && (
                <>
                  {UUU?.role === "5" && (
                    <Link to="/assembly/rejected" className="all__links">
                      <div
                        style={{
                          background: activeTab === 3 && "#ff6f00",
                          borderRadius: "10px",
                        }}
                        className="left__side__bar__icons__card"
                      >
                        <div onClick={() => onTabLeftSideClick(3)}>
                          <FaArrowDownUpAcrossLine />
                          <span>Rejected Task</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              )}

              {UUU && (
                <>
                  {UUU?.role === "5" && (
                    <Link to="/users/PDF" className="all__links">
                      <div
                        style={{
                          background: activeTab === 4 && "#ff6f00",
                          borderRadius: "10px",
                        }}
                        className="left__side__bar__icons__card"
                      >
                        <div onClick={() => onTabLeftSideClick(4)}>
                          <TfiControlEject />
                          <span>Users PDF</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              )}

              {/*  */}
              {/*  */}
              <div className="left__side__bar__icons__card left__side__bar__logout__card">
                <div onClick={handleLogOut}>
                  <CgLogOut />
                  <span>LogOut</span>
                </div>
              </div>
            </div>
          )}
        {pathValue !== "/register" &&
          pathValue !== "/certificate" &&
          pathValue !== "/user/all/assembly/pdf" && (
            <>
              {!leftOpenState ? (
                <div
                  onClick={onSidebarOpenWheneHamClick}
                  className="side__bar__hamicon__card"
                >
                  <GiHamburgerMenu size={20} />
                </div>
              ) : (
                <div
                  onClick={onSidebarCloseWheneHamClick}
                  className="side__bar__hamicon__card"
                >
                  <RxCross2 size={20} color="red" />
                </div>
              )}
            </>
          )}
        <main
          style={{
            background:
              (pathValue === "/register" ||
                pathValue === "/certificate" ||
                pathValue === "/user/all/assembly/pdf" ||
                pathValue === "/user/all/majuli/pdf") &&
              "transparent",
            padding:
              (pathValue === "/register" ||
                pathValue === "/certificate" ||
                pathValue === "/user/all/assembly/pdf" ||
                pathValue === "/user/all/majuli/pdf") &&
              "0px",
            // padding: (pathValue === "/register" || pathValue === "/learning") && "0px",
            width:
              (pathValue === "/register" ||
                pathValue === "/certificate" ||
                pathValue === "/user/all/assembly/pdf" ||
                pathValue === "/user/all/majuli/pdf") &&
              "100%",
          }}
          className="right__side__bar"
        >
          {children}
        </main>
      </div>
    </>
  );
};
