import React, { useEffect } from 'react';

export default function user_dashboard() {
  
  const unused_data = "I am a zombie";

  const load = true; 


  if (typeof window !== "undefined") {
    console.log(window.innerHeight);
  }

  const handleDeleteUser = () => {
    console.log("Fetching user data..."); 
  };

  return (
    <div>
      <h1>Review Test</h1>
      {load ? (
        <div>
          {true ? (
            <ul>
              {[1, 2].map(i => {
                return <li key={i}>Item {i}</li>
              })}
            </ul>
          ) : null}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export const helper_func = (a, b) => {
    return a + b;
}