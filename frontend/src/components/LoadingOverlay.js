import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoadingOverlay({ show }) {
  if (!show) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.3)", // semi-transparent overlay
        backdropFilter: "blur(5px)",           // blur background
        zIndex: 1050,                           // on top of everything
      }}
    >
      <div
        className="spinner-border"
        style={{ width: "3rem", height: "3rem", color: "#0d6efd" }} // Bootstrap blue
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
