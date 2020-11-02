import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Projects from './components/Projects.jsx';

function Recommended() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    let currentUrl = window.location.href.split('/');
    let projectId = currentUrl[3];

    axios.get(`http://localhost:3001/recommended/${projectId}`)
      .then(project => {
        let recommendedIds = project.data[0].recommended;
        setRecommendations(recommendedIds);
      })
  }, []);

  return (
    <div className='recommendedContainer'>
      <div>
        <h3>WE ALSO RECOMMEND</h3>
        <h3>Discover more</h3>
      </div>
      <Projects projectInformation={recommendations}/>
    </div>
  )
}

ReactDOM.render(<Recommended />, document.getElementById('recommended'));