import React, { useState, useEffect } from 'react';
import styles from'../Css/Admin.module.css';
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  // Your Firebase configuration
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const database = getDatabase();

const AdminPage = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateStatusElement = (statusElement, newStatus) => {
    // Customize this if needed
  };

  const deleteReport = (reportId) => {
    // Customize your deleteReport logic
  };

  const updateStatus = (reportId, newStatus) => {
    // Customize your updateStatus logic
  };

  useEffect(() => {
    const populateReportList = () => {
      const entriesRef = ref(database, 'entries');

      onValue(entriesRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const newReportData = Object.values(data);
          setReportData(newReportData);
        } else {
          setReportData([]);
        }

        setLoading(false);
      }, (error) => {
        console.error('Error fetching data:', error.message);
        setError('Error fetching data. Please try again.');
        setLoading(false);
      });
    };

    populateReportList();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <header className="admin"><span style={{ color: 'yellow' }}>Ad</span>min</header>
      <div className="container">
        <h1 className="report-list"><i className="bi bi-calendar3-event"></i>&nbsp;&nbsp;&nbsp;&nbsp;Report Today :</h1>
        <ul id="report-list">
          {reportData.length > 0 ? (
            reportData.map(report => (
              <li key={report.id}>
                <div className="report-item">
                  {/* Image */}
                  <img className="report-image" src={report.imageUrl} alt="Report Image" />

                  {/* Report Content */}
                  <div className="report-content">
                    <div className="report-status">{`Status: ${report.status}`}</div>
                    <div className="report-building">{`Building: ${report.building}`}</div>
                    <div className="report-floor">{`Floor: ${report.floor}`}</div>
                    <div className="report-room">{`Room: ${report.room}`}</div>
                    <div className="report-detail">{`Detail: ${report.detail}`}</div>
                    {report.author ? (
                      <div className="report-author">{`Reported by: ${report.author}`}</div>
                    ) : (
                      <div className="report-anonymous">Anonymous</div>
                    )}
                    <div className="report-date">{`Date: ${report.date}`}</div>
                  </div>

                  {/* Button Container */}
                  <div className="button-container">
                    <button className="delete-button" onClick={() => deleteReport(report.id)}>
                      <i className="bi bi-trash3"></i>
                    </button>
                    <button className="check-button" onClick={() => updateStatus(report.id, 'Checking')}>
                      <i className="bi bi-eye-fill"></i>
                    </button>
                    <button className="fixing-button" onClick={() => updateStatus(report.id, 'Fixing')}>
                      <i className="bi bi-wrench"></i>
                    </button>
                    <button className="fixed-button" onClick={() => updateStatus(report.id, 'Fixed')}>
                      <i className="bi bi-check-circle"></i>
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No data available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
