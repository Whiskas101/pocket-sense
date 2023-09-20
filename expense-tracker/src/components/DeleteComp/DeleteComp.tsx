import "./DeleteComp.css";

import DeleteIcon from "../../assets/delete.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../contexts/userContext";

export default function DeleteComp() {
  const [visible, setVisibility] = useState(true);
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();

  async function deleteUser() {
    console.log("attemped to delete a user");
    const result = await axios.post("http://localhost:8000/user/delete", {
      userid: user.id,
    });
    console.log(result);
    const defaultUser = {
      id: "-1",
      username: "None",
      budget: "None",
    };
    setUser(defaultUser);

    navigate("/");
  }

  return (
    <>
      <div className="DeleteComp">
        {visible ? (
          <div>
            <div className="delete">
              <img src={DeleteIcon}></img>
              Delete My Data
            </div>
            <button
              className="del-cmp-btn"
              onClick={() => setVisibility(false)}
            >
              Yes
            </button>
          </div>
        ) : (
          <></>
        )}

        {!visible ? (
          <div>
            <div>All your data will be deleted. Proceed?</div>
            <button className="del-cmp-btn" onClick={deleteUser}>
              Yes
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
