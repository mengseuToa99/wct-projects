import Nav from '../component/Navigation';
import React, { useState, useEffect } from 'react';
import { auth, database, storage } from '../component/DatabaseConfig';
import { ref, getDatabase, get, push, set } from 'firebase/database';
import '../Css/Report.css';
import { ref as storageRef, getDownloadURL, uploadBytes } from 'firebase/storage';
import { set as setDatabase, child } from 'firebase/database';


 
  const ReportPage = () => {
    
    const [setDataFromDatabase] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [authorState, setAuthorState] = useState("author");
    const [selectedBuilding, setSelectedBuilding] = useState('');
    const [selectedFloor, setSelectedFloor] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');
 
    const dbRef = ref(database); 
    const entriesRef = child(dbRef, 'entries'); 


  
    useEffect(() => {
      const fetchData = async () => {
          try {
              // Check if the user is authenticated before fetching data
              if (auth.currentUser) {
                  const db = getDatabase(database);
                  const entriesRef = ref(db, 'entries');
                  const snapshot = await get(entriesRef);
  
                  if (snapshot.exists()) {
                      setDataFromDatabase(snapshot.val());
                  } else {
                      console.log('No data available');
                  }
              } else {
                  console.log('User not authenticated');
              }
          } catch (error) {
              console.error('Error fetching data:', error.message);
          }
      };
  
      fetchData();
  }, []);
  

  const updateRoom = () => {
    // Get the floor and room elements
    var floor = document.getElementById("floor");
    var room = document.getElementById("room");
    // Clear the room options
    room.innerHTML = "";
    // Create a default option
    var defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.innerHTML = "Please select a room";
    // Append the default option to the room menu
    room.appendChild(defaultOption);
    // Check if the floor value is not empty
    if (floor.value !== "") {
      // Loop from 0 to 1
      for (var i = 0; i < 10; i++) {
        // Create a new option
        var option = document.createElement("option");
        option.value = floor.value + 0 + i;
        option.innerHTML = "Room " + floor.value + 0 + i;
        // Append the option to the room menu
        room.appendChild(option);
      }
    }
  };

  const toggleSlider = () => {
    // Toggle between "author" and "anonymous"
    setAuthorState((prevAuthorState) => (prevAuthorState === selectedUser ? "anonymous" : selectedUser));
    updateSlider();
  };

  const updateSlider = () => {
    var checkbox = document.querySelector('.toggle-btn input');
    var slider = document.querySelector('.toggle-btn .toggle-slider');

    if (checkbox.checked) {
      slider.style.transform = 'translateX(30px)';
      slider.style.backgroundColor = '#ffff00';
    } else {
      slider.style.transform = 'translateX(0)';
      slider.style.backgroundColor = '#fff';
    }
  };

  const storeData = () => {
    // Get values from the form
    const building = selectedBuilding;
    const status = "Unchecked";
    const floor = selectedFloor;
    const room = selectedRoom;
    const detail = document.getElementById('detail').value;
    const date = document.getElementById('date').value;
    const imageInput = document.getElementById('image');
  
    // Ensure an image is selected
    if (!imageInput.files[0]) {
      alert('Please select an image.');
      return;
    }
    // Declare imageFile here
    let imageFile;
  
    const id = push(ref(database, 'entries')).key;
    set(ref(database, 'entries/' + id), data);
    // Upload the image to Firebase Storage
    const imageRef = storageRef(storage, `images/${id}/${imageFile.name}`);
    uploadBytes(imageRef, imageFile)
      .then(() => getDownloadURL(imageRef))
      .then((imageUrl) => {
        // Create an object with the data and image URL
        const data = {
          id,
          email: userEmail,
          building,
          status,
          floor,
          room,
          detail,
          date,
          author: authorState,
          imageUrl,
        };

        // Store the data in Firebase under the "entries" node with the unique ID
        setDatabase(child(ref(database), `entries/${id}`), data);

        // Clear the form after storing data
        document.getElementById('dataForm').reset();

        alert('Data stored successfully!');
      })
      .catch((error) => {
        console.error('Error uploading image:', error.message);
        alert('Error uploading image. Please try again.');
      });
  };
  


//   const textarea = document.querySelector('textarea');

//   textarea.addEventListener('input', function () {
//     this.style.height = 'auto';
//     this.style.height = (this.scrollHeight) + 'px';
//   });

  return (
    <>
      <Nav />
      <header className="ask">
        <span style={{ color: 'yellow' }}>Re</span>porting
      </header>

      <section className="reporting">
        <div className="date-container">
          <label htmlFor="date">Select Date:</label>
          <input type="date" id="date" className="date-input" />
        </div>

        <form className="card">
        <select id="building" onChange={(e) => { updateRoom(); setSelectedBuilding(e.target.value); }} value={selectedBuilding}>
            <option value="">Building</option>
            <option value="1">building A</option>
            <option value="2">building B</option>
            <option value="3">building C</option>
            <option value="4">building D</option>
            <option value="5">Stem building</option>
          </select>
        </form>

        <form className="card">
          <select id="floor" onChange={(f) => { updateRoom(); setSelectedFloor(f.target.value); }} value={selectedFloor}>
            <option value="">Floor</option>
            <option value="1">Floor 1</option>
            <option value="2">Floor 2</option>
            <option value="3">Floor 3</option>
          </select>
        </form>

        <form className="card">
          <select id="room" required value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
            <option value="">Room</option>
            {/* Add room options based on your logic */}
          </select>
        </form>

        <section className="addimage">
          <form>
            <label htmlFor="image">Image:</label>
            <input type="file" id="image" accept="image/*" />
          </form>
        </section>

        <section className="function">
          <div className="hidename">
            <i className="bi bi-eye-slash-fill"></i> &nbsp; &nbsp;Hide Name :
          </div>
          <div className="toggle-container">
            <label className="toggle-btn">
              <input type="checkbox" onChange={() => toggleSlider()} />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </section>

        <section className="input-box">
          <form id="dataForm">
            <textarea rows="1" id="detail" placeholder="Write more details..."></textarea>
          </form>
        </section>
        <form action="#">
          <button type="button" onClick={() => storeData()}>Post</button>
        </form>

      </section>
    </>
  );
};

export default ReportPage;
