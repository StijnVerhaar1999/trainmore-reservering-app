import React, { useState } from "react";
import { useCookies } from "react-cookie";

import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";

import "../styles/styles.css";

import axios from "axios";

const Authentication = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [checkedCookie, setCheckedCookie] = useState(!!cookies.save);
  let [userData, setUserData] = useState({
    email: `${cookies.email ? cookies.email : ""}`,
    birthday: "",
    birthdayDay: `${cookies.day}`,
    birthdayMonth: `${cookies.month}`,
    birthdayYear: `${cookies.year}`,
    validation_type: "birthdate",
    id: "",
    club: "",
    auth: false,
  });

  const setCookieForUser = (email, day, month, year) => {
    var oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    setCookie("email", email, { path: "/", expires: oneYearFromNow });
    setCookie("day", day, { path: "/", expires: oneYearFromNow });
    setCookie("month", month, { path: "/", expires: oneYearFromNow });
    setCookie("year", year, { path: "/", expires: oneYearFromNow });
    setCookie("save", true, { path: "/", expires: oneYearFromNow });
  };

  const callAuthentication = async () => {
    const { birthdayDay, birthdayMonth, birthdayYear, email } = userData;
    let fullBirthday = `${birthdayDay}-${birthdayMonth}-${birthdayYear}`;
    try {
      const response = await axios({
        method: "post",
        url: `${props.url}/authenticateUser`,
        data: {
          birthday: fullBirthday,
          email: userData.email,
          validation_type: userData.validation_type,
        },
      });

      if (response.status !== 200 || response.data === "") {
        return;
      }

      if (checkedCookie) {
        setCookieForUser(email, birthdayDay, birthdayMonth, birthdayYear);
      } else {
        removeCookie("email", { path: "/" });
        removeCookie("day", { path: "/" });
        removeCookie("month", { path: "/" });
        removeCookie("year", { path: "/" });
        removeCookie("save", { path: "/" });
      }

      const id = response.data.ppl_id;
      const club = response.data.club;

      userData = { ...userData, auth: true, id, club };
      props.onAuthSubmit(userData);
    } catch (error) {
      console.log(error);
    }
  };

  let today = new Date();
  let thisYear = today.getFullYear();
  let daysInMonth = [];
  let monthsInYear = [
    "Januari",
    "Februari",
    "Maar",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Augustus",
    "September",
    "October",
    "November",
    "December",
  ];
  let totalYears = [];

  for (let x = 1; x <= 31; x++) {
    daysInMonth.push(x);
  }

  for (let x = thisYear; x >= thisYear - 100; x--) {
    totalYears.push(x);
  }

  return (
    <div className="authentication-app">
      <h2 className={"login-tag"}>Login met je trainmore account</h2>
      <div className={"login-input"}>
        <TextField
          name="email"
          variant="outlined"
          value={userData.email}
          onChange={(e) =>
            setUserData({ ...userData, [e.target.name]: e.target.value })
          }
          label="E-mail:"
        />
      </div>
      <div className={"date-select"}>
        <InputLabel className={"date-select-tag"} htmlFor="birthday">
          Geboortedatum
        </InputLabel>
        <div className={"date-select-selector"}>
          <Select
            native
            name="birthdayDay"
            defaultValue={userData.birthdayDay}
            onChange={(e) =>
              setUserData({ ...userData, [e.target.name]: e.target.value })
            }
            id="birth-day"
          >
            <option aria-label="None" value="Day">
              Dag
            </option>
            {daysInMonth.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
          <Select
            native
            name="birthdayMonth"
            defaultValue={userData.birthdayMonth}
            onChange={(e) =>
              setUserData({ ...userData, [e.target.name]: e.target.value })
            }
            id="birth-month"
          >
            <option aria-label="None" value="">
              Maand
            </option>
            {monthsInYear.map((value, index) => {
              return (
                <option key={index} value={index + 1}>
                  {value}
                </option>
              );
            })}
          </Select>
          <Select
            native
            name="birthdayYear"
            defaultValue={userData.birthdayYear}
            onChange={(e) =>
              setUserData({ ...userData, [e.target.name]: e.target.value })
            }
            id="birth-year"
          >
            <option aria-label="None" value="">
              Jaar
            </option>
            {totalYears.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className={"login-checkbox"}>
        <Checkbox
          checked={checkedCookie}
          onChange={() => setCheckedCookie(!checkedCookie)}
          color="primary"
          name={"saveDataChecker"}
        ></Checkbox>
        <label onClick={() => setCheckedCookie(!checkedCookie)}>
          Onthoud mij
        </label>
      </div>
      <div className={"login-btn"}>
        <Button
          variant="contained"
          color="primary"
          onClick={callAuthentication}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Authentication;
