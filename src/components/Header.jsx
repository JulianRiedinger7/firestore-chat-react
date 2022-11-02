import { useAuthContext } from "../context/AuthContext";
import { IoMdChatboxes } from "react-icons/io";
import { Link } from "react-router-dom";
import SelectChannel from "./SelectChannel";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import { useChatContext } from "../context/ChatContext";
import UserPopup from "./UserPopup";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { user } = useAuthContext();
  const { popupUser, setPopupUser } = useChatContext();

  useEffect(() => {
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <header className="dark:bg-slate-700 h-20 p-4 dark:text-white shadow-xl text-black">
        <nav>
          <ul className="flex justify-between items-center gap-3 flex-1 w-full">
            <li>
              <IoMdChatboxes size={45} color={"#06B6D4"} />
            </li>
            <li>
              <SelectChannel />
            </li>
            <li className="flex items-center gap-2">
              {!darkMode ? (
                <MdLightMode
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setDarkMode(!darkMode)}
                />
              ) : (
                <MdDarkMode
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setDarkMode(!darkMode)}
                />
              )}
              {/* <Link to="/dashboard"> */}
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-12 aspect-square rounded-full"
                onClick={() => {
                  if (popupUser) {
                    setPopupUser(false);
                  } else {
                    setPopupUser(true);
                  }
                }}
              />
              {/* </Link> */}
            </li>
          </ul>
        </nav>
      </header>
      {popupUser && <UserPopup />}
    </>
  );
};

export default Header;
