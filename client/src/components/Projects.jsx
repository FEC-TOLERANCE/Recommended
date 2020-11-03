import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Projects(props) {
  const [image, setImage] = useState('');
  const [funding, setFunding] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    getProjectImage(props.projectInformation);
    getProjectDetails(props.projectInformation);
    getProjectAuthor(props.projectInformation);
  }, [props.projectInformation]);

  const getProjectImage = (id) => {
    axios.get(`http://localhost:3001/recommended/${id}`)
      .then(image => {
        let url = image.data[0].small;
        setImage(url);
      })
      .catch(err => {
        throw new Error(err);
      })
  }

  const getProjectDetails = (id) => {
    axios.get(`http://100.26.210.6:3004/funding/${id}`)
      .then(projectDetails => {
        let currentFunding = (projectDetails.data.backing.amountFunded/projectDetails.data.backing.fundingGoal);
        let title = projectDetails.data.backing.title;
        let description = shortenDescription(projectDetails.data.backing.description);

        setFunding(currentFunding);
        setTitle(title);
        setDescription(description);
      })
  }

  const getProjectAuthor = (id) => {
    axios.get(`http://ec2-3-15-177-95.us-east-2.compute.amazonaws.com:3003/project-owner/${id}`)
      .then(authorDetails => {
        let author = authorDetails.data.name;
        setAuthor(author);
      })
  }

  const shortenDescription = (description) => {
    let max = 220, min = 180;
    let randomNum = Math.floor(Math.random() * (max - min + 1) + min)

    return description.slice(0, randomNum);
  }

  return (
    <div className={`projectContainer${props.id}`}>
      <img className='projectImage' src={image}></img>
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div>By {author}</div>
    </div>
  )
}

export default Projects;