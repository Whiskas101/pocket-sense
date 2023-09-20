import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

import "./MainLayout.css";
import UserContextProvider from "../../contexts/userContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function MainLayout() {
  return (
    <>
      <UserContextProvider>
        <Navbar />
        <main>
          {/* so that we can access the userid and budget globally within main */}

          <Outlet />
        </main>
      </UserContextProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={1900}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
      <footer>
        {/* <div className="waves">
                    <div className="wave" id="wave1"></div>
                    <div className="wave" id="wave2"></div>
                    <div className="wave" id="wave3"></div>
                    <div className="wave" id="wave4"></div>
                    <div className="wave" id="wave5"></div>
                </div> */}
      </footer>
    </>
  );
}
