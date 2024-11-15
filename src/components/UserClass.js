import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      userInfo: {
        name: "Aravind",
        location: "Bengaluru",
      },
    };
    // console.log("child constructor");
  }
  async componentDidMount() {
    // console.log("Child Didmount called")
    const data = await fetch("https://api.github.com/users/aravindhalahalli");
    const res = await data.json();
    this.setState({
      userInfo: res,
    });
    console.log(res);
  }
  componentDidUpdate(){
    console.log("component did update called")
  }
  render() {
    // console.log("child Render");
    // const { name, location, email } = this.props;
    const { name, location, email, avatar_url } = this.state.userInfo;
    const { count } = this.state;

    const handleIncrementCount = () => {
      this.setState({
        count: this.state.count + 1,
      });
    };
    const handleDecrementCount = () => {
      this.setState({
        count: this.state.count - 1,
      });
    };

    const handleResetCount = () => {
      this.setState({
        count: 0,
      });
    };
    return (
      <div className="user-card">
        <h1>Count - {count}</h1>
        <button onClick={handleIncrementCount}>Increment Count</button>
        <button onClick={handleDecrementCount}>Decrement Count</button>
        <button onClick={handleResetCount}>Reset Count</button>
        <h2>Name - {name}</h2>
        <h3>Loc - {location}</h3>
        <h4>Email - {email}</h4>
      </div>
    );
  }
}

export default UserClass;
