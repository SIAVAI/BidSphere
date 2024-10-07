import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Main = () => {
  return (
    <div className="">
      {/* Navbar */}
      <Navbar></Navbar>
      {/* Outlet */}
      <div className="min-h-[calc(100vh-300px)] my-10">
        <Outlet></Outlet>
      </div>
      {/* Footer */}
      <div className="">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Main;
