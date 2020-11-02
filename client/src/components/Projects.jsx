import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Projects(props) {
  const [percentFunded, setFundings] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    props.projectInformation.forEach(projectId => {
      getProjectOwner(projectId);
      getProjectDetails(projectId);
      getProjectImage(projectId);
    })
  }, [props.projectInformation]);

  const getProjectOwner = (id) => {
    axios.get(`http://ec2-3-15-177-95.us-east-2.compute.amazonaws.com:3003/project-owner/${id}`)
      .then(owner => {
        let author = owner.data.name;
        setAuthors(authors => [...authors, author]);
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  const getProjectDetails = (id) => {
    axios.get(`http://3.12.73.115:3004/funding/${id}`)
    .then(projectData => {
      let amountFunded = projectData.data.backing.amountFunded, fundingGoal = projectData.data.backing.fundingGoal;
      let percentageFunded = amountFunded/fundingGoal;

      setFundings(percentFunded => [...percentFunded, percentageFunded]);
    })
    .catch(err => {
      throw new Error(err);
    })
  }

  const getProjectImage = (id) => {
    axios.get(`http://localhost:3001/recommended/${id}`)
      .then(image => {
        let url = image.data[0].small;
        setImages(images => [...images, url]);
      })
      .catch(err => {
        throw new Error(err);
      })
  }

  return (
    <div className='projectContainer'>

    </div>
  )
}

export default Projects;