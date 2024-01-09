import React, { useEffect } from "react";
import Nav from "../component/Navigation";
import ReportCard from "../component/ReportCard";
import profilelogo from "../Image/profilelogo.png";
import { firebase } from "../component/DatabaseConfig";
import styles from "../Css/User.module.css";

const UserPage = () => {
  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      console.log('User logged out successfully');
      window.location.href = "/Main/Main.html";
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  useEffect(() => {
    // Any code specific to the useEffect hook
    return () => {
      // Cleanup code if needed
    };
  }, []);

  return (
    <>
      <Nav />
      <div id={styles['profileContainer']}>
      <label>
        <img id={styles['profileImage']} src={profilelogo} alt="Profile" />
      </label>
      
      <div className={styles.username}>Welcome</div>
      <h1 className={styles['reportList']}>
        <i className="bi bi-calendar3-event"></i>&nbsp;&nbsp;&nbsp; &nbsp;Report History :
      </h1>
      </div>
      <ul id={styles['reportList']}></ul>
      <ReportCard />
      <div className={styles['btnContainer']}>
        <button id={styles.Logout} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default UserPage;
