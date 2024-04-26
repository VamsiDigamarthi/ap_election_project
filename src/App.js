import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import { useSelector } from "react-redux";
import { Sidebar } from "./components/Sidebar/Sidebar";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import SuperAdmin from "./Pages/SuperAdmin/SuperAdmin";
import Admin from "./Pages/Admin/Admin";
import User from "./Pages/User/User";
import Learning from "./Pages/Learning/Learning";
import TaskPage from "./Pages/TaskPage/TaskPage";
import { useSelector } from "react-redux";
import NotAccess from "./Pages/NotAccess/NotAccess";
import Payment from "./Pages/Payment/Payment";
import Certificate from "./Pages/Certificate/Certificate";
import DetailsPs from "./Pages/DetailsPs/DetailsPs";
import AssignTaskAdmin from "./Pages/AssignTaskAdmin/AssignTaskAdmin";
import { useState } from "react";
import RejectedTask from "./Pages/RejectedTask/RejectedTask";
import DistrictPaymentDetails from "./Pages/DistrictPaymentDetails/DistrictPaymentDetails";
import Chart from "./Pages/Chart/Chart";
import StateCoorAssignTask from "./Pages/StateCoorAssignTask/StateCoorAssignTask";
import NotFound from "./Pages/NotFound/NotFound";
import DistrictCooeExel from "./Pages/DistrictCoorExel/DistrictCooeExel";
import Manages from "./Pages/Manages/Manages";
import OwnRegistor from "./Pages/OwnRegistor/OwnRegistor";
import AssemblyHome from "./Pages/AssemblyHome/AssemblyHome";
import AssemblyPsDetails from "./Pages/AssemblyPsDetails/AssemblyPsDetails";
import AssemblyAssignTask from "./Pages/AssemblyAssignTask/AssemblyAssignTask";
import AssemblyRejectedTask from "./Pages/AssemblyRejectedTask/AssemblyRejectedTask";
import ChangeRole from "./Pages/ChangeRole/ChangeRole";
import Profile from "./Pages/Profile/Profile";
import DistShowUser from "./Pages/DistShowUser/DistShowUser";
import UserData from "./Pages/UserData/UserData";
import PDFUser from "./Pages/PDFUser/PDFUser";
import PDF from "./Pages/PDF/PDF";
import NewPDF from "./Pages/NewPDF/NewPDF";
import Majuli from "./Pages/Majuli/Majuli";
function App() {
  const UUU = useSelector((state) => state.authReducer.authData);
  // console.log(UUU);
  const [taskAssignAdminModalOpen, setTaskAssignAdminModalOpen] =
    useState(false);
  // console.log(UUU);
  // console.log(UUU[0].role);

  const changeModeOfTask = () => {
    setTaskAssignAdminModalOpen(!taskAssignAdminModalOpen);
  };

  // console.log(UUU);

  return (
    <div className="App">
      <Router>
        <Sidebar taskAssignAdminModalOpen={taskAssignAdminModalOpen}>
          <Routes>
            {/* <Route path="/register" element={<Register />} /> */}
            <Route
              path="/register"
              element={UUU ? <Navigate to="/" /> : <Register />}
            />
            {/* <Route path="/" element={<Home />} /> */}
            <Route
              path="/"
              element={
                UUU ? (
                  UUU?.role === "1" ? (
                    <Home />
                  ) : UUU?.role === "2" ? (
                    <Navigate to="/admin" />
                  ) : UUU?.role === "3" ? (
                    <Navigate to="/user" />
                  ) : UUU?.role === "4" ? (
                    <Navigate to="/upload" />
                  ) : (
                    <Navigate to="/assemblyadmin" />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            {/* <Route
              path="/super-admin"
              element={
                UUU ? (
                  UUU?.role === "1" ? (
                    <SuperAdmin />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            /> */}
            <Route
              path="/upload"
              element={
                UUU ? (
                  UUU?.role === "4" ? (
                    <SuperAdmin />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="/manages"
              element={
                UUU ? (
                  UUU?.role === "4" ? (
                    <Manages />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="/own/records"
              element={
                UUU ? (
                  UUU?.role === "4" ? (
                    <OwnRegistor />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="change/role"
              element={
                UUU ? (
                  UUU?.role === "4" ? (
                    <ChangeRole />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="download/user"
              element={
                UUU ? (
                  UUU?.role === "4" ? (
                    <UserData />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="download/user/pdfs"
              element={
                UUU ? (
                  UUU?.role === "4" ? (
                    <PDF />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="/user/all/assembly/pdf"
              element={
                UUU ? (
                  UUU?.role === "4" ? (
                    <NewPDF />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />

            <Route
              path="/user/all/majuli/pdf"
              element={
                UUU ? (
                  UUU?.role === "4" ? (
                    <Majuli />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />

            <Route
              path="/state/assign/task"
              element={
                UUU ? (
                  UUU?.role === "1" ? (
                    <StateCoorAssignTask />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            {/*  */}
            <Route
              path="/admin"
              element={
                UUU ? (
                  UUU?.role === "2" ? (
                    <Admin />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="/rejected"
              element={
                UUU ? (
                  UUU?.role === "2" ? (
                    <RejectedTask />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="/payment-district-coor"
              element={
                UUU ? (
                  UUU?.role === "2" ? (
                    <DistrictPaymentDetails />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="/assigntask"
              element={
                UUU ? (
                  UUU?.role === "2" ? (
                    <AssignTaskAdmin changeModeOfTask={changeModeOfTask} />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="/detailsps"
              element={
                UUU ? (
                  UUU?.role === "2" ? (
                    <DetailsPs />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="/exel/details"
              element={
                UUU ? (
                  UUU?.role === "2" ? (
                    <DistrictCooeExel />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="/chat"
              element={
                UUU ? (
                  UUU?.role === "2" ? (
                    <Chart />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="/show/user/pdf"
              element={
                UUU ? (
                  UUU?.role === "2" ? (
                    <DistShowUser />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            {/* admin routes */}
            <Route
              path="/user"
              element={
                UUU ? (
                  UUU?.role === "3" ? (
                    <User />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="/learning"
              element={
                UUU ? (
                  UUU?.role === "3" ? (
                    <Learning />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="/tasks"
              element={
                UUU ? (
                  UUU?.role === "3" ? (
                    <TaskPage />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="/profile/card"
              element={
                UUU ? (
                  UUU?.role === "3" ? (
                    <Profile />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="/payment"
              element={
                UUU ? (
                  UUU?.role === "3" ? (
                    <Payment />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="/certificate"
              element={
                UUU ? (
                  UUU?.role === "3" ? (
                    <Certificate />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="/assemblyadmin"
              element={
                UUU ? (
                  UUU?.role === "5" ? (
                    <AssemblyHome />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="/assembly/detailsps"
              element={
                UUU ? (
                  UUU?.role === "5" ? (
                    <AssemblyPsDetails />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="/assembly/assigntask"
              element={
                UUU ? (
                  UUU?.role === "5" ? (
                    <AssemblyAssignTask />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="/assembly/rejected"
              element={
                UUU ? (
                  UUU?.role === "5" ? (
                    <AssemblyRejectedTask />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              path="/users/PDF"
              element={
                UUU ? (
                  UUU?.role === "4" ||
                  UUU?.role === "2" ||
                  UUU?.role === "5" ? (
                    <PDFUser />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
            {/* <Route path="/certificate" element={<Certificate />} /> */}
            {/* <Route path="/payment" element={<Payment />} /> */}
          </Routes>
        </Sidebar>
      </Router>
    </div>
  );
}

export default App;
