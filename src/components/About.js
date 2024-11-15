import React, { useEffect } from "react";
import User from "./User";
import UserClass from "./UserClass";

const About = () => {
  
  
  useEffect(() => {
    // API CALL
  }, []);


  return (
    <div>
      <h1>About us</h1>
      <h1>Namaste React Js web series</h1>
      <User
        name="Aravind"
        location="Karantaka"
        email="aravindhalahalli.81@gmail.com"
      />
    </div>
  );
};

export default About;
