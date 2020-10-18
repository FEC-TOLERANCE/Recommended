import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function Recommended() {

  useEffect(() => {
    let currentUrl = window.location.href.split('/');
    let projectId = currentUrl[3];

    axios.get(`http://localhost:3004/funding/${projectId}`)
      .then(projectData => {
        console.log(projectData.data);
      })
      .catch(err => {
        throw new Error(err);
      })
  }, []);

  return (
    <div>
      Recommended
    </div>
  )
}

ReactDOM.render(<Recommended />, document.getElementById('recommended'));