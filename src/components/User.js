import React, { useState } from "react";

const User = ({ name, location, email }) => {
  const [count, setCount] = useState(0);

  const handleIncrementCount = () => {
    setCount((prev) => prev + 1);
  };
  const handleDecrementCount = () => {
    setCount((prev) => prev - 1);
  };
  const handleResetCount = () => {
    setCount(0);
  };
  
  return (
    <div className="user-card">
      <h1>count - {count}</h1>
      <button onClick={handleIncrementCount}>Increment Count</button>
      <button onClick={handleDecrementCount}>Decrement Count</button>
      <button onClick={handleResetCount}>Reset Count</button>
      <h2>Name - {name}</h2>
      <h3>Loc - {location}</h3>
      <h4>Email - {email}</h4>
    </div>
  );
};
export default User;
