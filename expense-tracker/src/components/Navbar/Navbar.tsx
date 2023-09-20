import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/cash-logo.jpg";
import { useUserContext } from "../../contexts/userContext";
import {toast} from "react-toastify";
export default function Navbar() {
  const {user} = useUserContext();

  return (
    <header className="navbar-box">
      <div className="logo">
        <img src={Logo} />
        <div className="company-name">Pocket Sense</div>
      </div>

      <nav className="nav-links">
        <Link className='link' to="/">Home</Link>
        <Link className='link' to="/login">Login</Link>
        
        <Link className='link' to="/dashboard" onClick={(event: React.MouseEvent)=>{
          if(user.id === "-1"){
            event.preventDefault();
            toast.warn("You are not logged in.");
          }
        }}>Dashboard</Link>
        
      </nav>
    </header>
  );
}
