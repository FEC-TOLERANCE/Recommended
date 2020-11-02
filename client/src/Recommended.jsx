import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function Recommended() {
  const [percentFunded, setFundings] = useState(0);
  const [authors, setAuthors] = useState('');

  useEffect(() => {
    let currentUrl = window.location.href.split('/');
    let projectId = currentUrl[3];

    axios.get(`http://localhost:3001/recommended/${projectId}`)
      .then(projects => {
        console.log(projects);
      })
  }, []);

  const getProjectOwner = (id) => {
    axios.get(`http://ec2-3-15-177-95.us-east-2.compute.amazonaws.com:3003/project-owner/${id}`)
      .then(owner => {
        let author = owner.data.name;
        setAuthor(author);
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  const getFundingInformation = (id) => {
    axios.get(`http://3.12.73.115:3004/funding/${id}`)
    .then(projectData => {
      let amountFunded = projectData.data.backing.amountFunded, fundingGoal = projectData.data.backing.fundingGoal;
      setFunding(amountFunded/fundingGoal);
    })
    .catch(err => {
      throw new Error(err);
    })
  }

  return (
    <div className='recommendedContainer'>
      <div>

      </div>
    </div>
  )
}

ReactDOM.render(<Recommended />, document.getElementById('recommended'));