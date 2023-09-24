import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

import "./MainLayout.css";
import UserContextProvider from "../../contexts/userContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Wave from "react-wavify";

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

        <div className="wave-holder">
          <div className="custom-wave">
            <Wave
              fill="#D7FFc0"
              paused={false}
              style={{ display: "flex" }}
              options={{
                height: 25,
                amplitude: 15,
                speed: 0.7,
                points: 2,
              }}
            />
          </div>
          <div className="custom-wave">
            <Wave
              fill="#b1ee9f"
              paused={false}
              style={{ display: "flex" }}
              options={{
                height: 30,
                amplitude: 40,
                speed: 0.3,
                points: 2,
              }}
            />
          </div>
          <div className="custom-wave">
          <Wave
            fill="#436c3f"
            paused={false}
            style={{ display: "flex" }}
            options={{
              height: 60,
              amplitude: 35,
              speed: 0.4,
              points: 3,
            }}
          />
          </div>
          
        </div>
      </footer>
    </>
  );
}
