import React from "react";
import CarForm from "../components/CarForm"
import Navbar from "../components/Navbar";

function Car() {
    return (
        <div className="Car">
        <Navbar/>
        <CarForm/>
      </div>
    )
}

export default Car