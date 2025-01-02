import React, { useState } from "react";
import "./css/header.css";
import NetflixLogo from "../../assets/images/netflix-logo (1).png";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Header() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <div className="header_outer_container">
      <div className="header_container">
        <div className="header_left">
          <ul>
            <li>
              <img
                width="100"
                src={NetflixLogo}
                alt="Netflix Logo"
                onError={(e) => (e.target.src = "/defaultLogo.png")} // Fallback image
              />
            </li>
            <li>Home</li>
            <li>TVShows</li>
            <li>Movies</li>
            <li>Latest</li>
            <li>MyList</li>
            <li>Browse by Languages</li>
          </ul>
        </div>
        <div className="header_right">
          <ul>
            <li onClick={() => setIsSearchVisible(!isSearchVisible)}>
              {isSearchVisible ? <input type="text" /> : <SearchIcon />}
            </li>
            <li>
              <NotificationsNoneIcon />
            </li>
            <li>
              <AccountBoxIcon />
            </li>
            <li>
              <ArrowDropDownIcon />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
