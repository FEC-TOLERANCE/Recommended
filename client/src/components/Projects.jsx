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
    axios.get(`http://ec2-54-67-1-177.us-west-1.compute.amazonaws.com:3001/recommended/${id}`)
      .then(image => {
        let url = image.data[0].small;
        setImage(url);
      })
      .catch(err => {
        throw new Error(err);
      })
  };

  const getProjectDetails = (id) => {
    axios.get(`http://100.26.210.6:3004/funding/${id}`)
      .then(projectDetails => {
        let currentFunding = Math.floor((projectDetails.data.backing.amountFunded/projectDetails.data.backing.fundingGoal)*100);
        let title = projectDetails.data.backing.title;
        let description = shortenDescription(projectDetails.data.backing.description);

        setFunding(currentFunding);
        setTitle(title);
        setDescription(description);
      })
      .catch(err => {
        throw new Error(err);
      })
  };

  const getProjectAuthor = (id) => {
    axios.get(`http://ec2-3-15-177-95.us-east-2.compute.amazonaws.com:3003/project-owner/${id}`)
      .then(authorDetails => {
        let author = authorDetails.data.name;
        setAuthor(author);
      })
      .catch(err => {
        throw new Error(err);
      })
  };

  const shortenDescription = (description) => {
    const min = 120, max = 160;
    let randomNum = Math.floor(Math.random() * (max - min + 1) + min)

    return description.slice(0, randomNum);
  };

  const highlightText = (e) => {
    e.currentTarget.style.textDecoration = 'underline';
    e.currentTarget.style.cursor = 'pointer';
  };

  const normalText = (e) => {
    e.currentTarget.style.textDecoration = '';
  };

  return (
    <div className={`projectContainer${props.id}`}>
      <img className='projectImage' src={image}></img>
      <div className='fundingWrapper'>
      <div className='fundingPercentage' style={{width: funding < 100 ? `${funding}%` : '100%'}}></div>
      </div>
      <div className='projectDetails' onMouseOver={e => highlightText(e)} onMouseOut={e => normalText(e)}>
        <h4 className='projectTitle'>{title}</h4>
        <p className='projectDescription'>{description}</p>
      </div>
      <div className='projectAuthor'>By&nbsp;
        <a className='author-fullName' href=''>{author}</a>
      </div>
    </div>
  )
};

export default Projects;