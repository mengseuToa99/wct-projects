import React from "react";
import { Link } from "react-router-dom";
import logo from "../Image/logo.png";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHouse, faFlag, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faFlag as farFlag } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "../Css/Navigation.module.css";

library.add(faHouse, faFlag, faRightToBracket, farFlag);


function Nav() {
    return (
      <>
        <header>
          <img src={logo} className={styles.logoNav} />
          <h2 className={styles.logoName}>URMS</h2>
          <nav className="navigator">
            <Link to="/" > <FontAwesomeIcon className={styles.iconNav} icon={faHouse} id="here" /></Link>
            <Link to="/about" > <FontAwesomeIcon className={styles.iconNav} icon={farFlag} /></Link>
            <Link to="/login" > <FontAwesomeIcon className={styles.iconNav} icon={faRightToBracket} id="myIcon"/></Link>
          </nav>            
        </header>
      </>
    );
  }
  

export default Nav;