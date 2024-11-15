import React from "react";
import UserClass from "./UserClass";
import UserContext from "../utils/UserContext";

class AboutClass extends React.Component {
  constructor(props) {
    super(props);
    // console.log("Parent constructor called")
  }
  componentDidMount() {
    // console.log("Parent Didmount called")
  }
  render() {
    // console.log("Parent render called")
    return (
      <div>
        <h1>About us</h1>
        <h2>Namaste React series</h2>
        <div>
          <UserContext.Consumer>
            {({ loggedInUser }) => <h1>{loggedInUser}</h1>}
          </UserContext.Consumer>
        </div>
        <UserClass
          name="Aravind from Classy"
          location="Bengaluru"
          email="aravind@gmail.com"
        />
      </div>
    );
  }
}

export default AboutClass;
