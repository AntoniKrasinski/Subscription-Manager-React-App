import React from "react";
import { Link } from "react-router";

const Langing = () => {
  return (
    <div className="flex justify-center items-center">
      <div>
        <Link to={"/login"}>Get Started</Link>
        <a href="https://github.com" target="_blank">
          View Repo
        </a>
      </div>
    </div>
  );
};

export default Langing;
