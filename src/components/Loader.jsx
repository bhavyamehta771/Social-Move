import React from 'react'
import "./css/Loader.css"

const Loader = ({run}) => {
  return (
    <div className={`${run?'':'hidden'}`}>
        <div className="loader">
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
      </div>
    </div>
  );
}

export default Loader
