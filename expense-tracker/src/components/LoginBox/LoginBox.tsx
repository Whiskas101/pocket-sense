import { useState } from "react";
import "./LoginBox.css";
import axios from "axios";
import { useUserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import {toast } from "react-toastify";

export default function LoginBox() {
  const [uname, setuname] = useState("");
  const [pass, setPass] = useState("");

  const { setUser } = useUserContext();
  const navigate = useNavigate();

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setuname(event.target.value);
  }
  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPass(event.target.value);

  }

  async function handleLogin(event: React.MouseEvent) {
    event.preventDefault();
    //Do not accept empty username or pass
    if((uname.length === 0) || (pass.length === 0)) {
      toast.warn("Cannot have empty fields!");
      return;
    };
    //api call to database here
    const result = await axios.post("http://localhost:8000/user/login", {
      username: uname,
      password: pass,
    });
    console.log(result);
    //we only do something if we get a valid response, i.e a User JSON Object
    if (result.data.user.id) {
      const { id, budget, username } = result.data.user;
      const UserData = {
        id: id,
        budget: budget,
        username: username,
      };
      toast(`Welcome ${username}`)
      //"saving the user id and budget to be used later on in the site"
      setUser(UserData);
      navigate('/dashboard');
    }else{
      toast.warn('Incorrect Username or Password', {
        position: "bottom-center",
        autoClose: 1900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  }

  async function handleRegister(event: React.MouseEvent) {
    event.preventDefault();
    if((uname.length === 0) || (pass.length === 0)){
      toast.warn('Please enter a valid username or password', {
        position: "bottom-center",
        autoClose: 1900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        return;
    }
    //api call to register user
    const result = await axios.post("http://localhost:8000/user/register", {
      username: uname,
      password: pass,
    });
    
    console.log(result);
    if(!result.data[0]){
      handleLogin(event);
    }else{
      //do nothing as user already exists\
      console.log("User already exists");
      toast.warn('Username is already taken!', {
        position: "bottom-center",
        autoClose: 1900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  }

  return (
    <div className="login-box">
      <form className="login-area">
        <div className="login-text">Login</div>
        <div className="input-area">
          <input
            name="username"
            placeholder="Username"
            onChange={handleUsernameChange}
            autoComplete="off"
            spellCheck="false"
          />
          <input
            name="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            autoComplete="off"
            spellCheck="false"
            type="password"
          />
        </div>
        <div className="submit-area">
          <button className="loginbox-btn" type="submit" onClick={handleLogin}>
            Sign in
          </button>
          <button
            className="loginbox-btn"
            type="submit"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </form>
      
    </div>
  );
}
