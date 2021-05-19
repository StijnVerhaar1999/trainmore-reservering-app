import React, { useState } from "react";

import Authentication from "./Components/Authentication";
import Reservation from "./Components/Reservation";

import "./styles/styles.css";

const App = () => {
  const [url] = useState("https://api.sportschoolplanner.app");
  // const [url] = useState("http://localhost:3001");
  const [userData, setUserData] = useState({ auth: false });

  let authForm;
  let reservForm;

  if (!userData.auth) {
    authForm = <Authentication url={url} onAuthSubmit={setUserData} />;
  }
  if (userData.auth) {
    reservForm = (
      <Reservation url={url} id={userData.id} club={userData.club} />
    );
  }

  return (
    <div className="App">
      {authForm}
      {reservForm}
    </div>
  );
};

export default App;
