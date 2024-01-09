import React from "react";
import Nav from "../component/Navigation";
import ReportCard from "../component/ReportCard";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
       <>
       <Nav />

       <header className="ask">What <span style={{ color: "yellow" }}>&nbsp;happened?</span></header>
          <div className="container">
              <div className="btn-container"> 
              <Link to="/reporting">
              <button id="reportButton">Report</button>
            </Link> 
                  <button id="reportButton">Report</button>
                  <select id="filterSelect">
                      <option value="filter button">Filter Button</option>
                      <option value="all">All</option>
                      <option value="year">By Year</option>
                      <option value="month">By Month</option>
                      <option value="fixed">Fixed</option>
                      <option value="fixing">Fixing</option>
                  </select>
              </div>
              
              <h1 className="report-list"><i className="bi bi-calendar3-event"></i>&nbsp;&nbsp;&nbsp;&nbsp;Report Today :</h1>
              <ul id="report-list"></ul>
              <ReportCard />
            
             
          </div>
       </>
    );
}

export default HomePage;
