import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Projects from './components/Projects.jsx';

function Recommended() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    let currentUrl = window.location.href.split('/');
    let projectId = currentUrl[3];

    axios.get(`http://ec2-54-67-1-177.us-west-1.compute.amazonaws.com:3001/recommended/${projectId}`)
      .then(project => {
        let recommendedIds = project.data[0].recommended;
        setRecommendations(recommendedIds);
      })
      .catch(err => {
        throw new Error(err);
      })
  }, []);

  return (
    <div className='recommendedContainer'>
      <div className='smallHeaderSection'>
        <h3 className='alsoRecommend'>WE ALSO RECOMMEND</h3>
        <a className='discoverMore' href=''>Discover more</a>
      </div>
      <div className='projectsContainer'>
        {recommendations.map((recommendation, index) => {
          return (
            <div key={index} className='currentProject'>
              <Projects projectInformation={recommendation} id={index+1}/>
            </div>
          )
        })}
      </div>
    </div>
  )
}

ReactDOM.render(<Recommended />, document.getElementById('recommended'));