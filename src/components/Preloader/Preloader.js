import React from "react";
import './Preloader.css';

export default function Preloader() {
    return(
        <>
            <i className="circle-preloader__animation"></i>
            <p className="circle-preloader__text">Searching for news...</p>
        </>
    )
}