import React from "react";

const Greeting = ({ name }) => {
  const hour = new Date().getHours();
  let greeting = "Hello";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  return (
    <div className="greeting">
      <h2>{greeting}, {name}!</h2>
      <p>Here's your medication schedule for today:</p>
    </div>
  );
};

export default Greeting;
