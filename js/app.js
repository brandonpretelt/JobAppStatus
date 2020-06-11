/***
 * ? This application is to monitor your job application status.
 * ? All you need to do is enter in your job application name and then wait. 
 * 
 * // TODO: Implement Local Storage,
 * TODO: Date Job Application Added, 
 * TODO: Date Job Application Response, 
 * TODO: custom modal for validation, 
 * TODO: regex validation,
 * TODO: Add in drag n drop feature?
 * TODO: Clear jobs onclick
 * 
 */

'use strict';

loadEventListeners();

function loadEventListeners() {
  document.querySelector('button').addEventListener('click', addJobStatus);
} 

function getJobStatus() {
    // * this function grabs the job status and returns it
    const SelectEl = document.querySelector('.job-app-status___input-select');
    const SelectEl__option = SelectEl.options[SelectEl.selectedIndex].value;
  
    return SelectEl__option;
    
}
  
function addJobStatus(){
  // * This function creates and adds job status 
    
  // * This section grabs all the UI elements and creates what is needed. It also grabs the status from the getJobStatus function;
  const jobStatus = getJobStatus();
  const iconEl = document.createElement('i');
  // const UIappListEl = document.querySelector('.application-list');
  // const UIappListOutEl = document.createElement('div');
  const SelectEl = document.querySelector('.job-app-status___input-select');
  
  // const SelectEl__optionText = SelectEl.options[SelectEl.selectedIndex].text;
  const inputValueEl = document.querySelector('.job-app___input').value;
  const divEl = document.createElement('div');
  const statusDivEl = document.querySelector('.status');
    
  if (inputValueEl === "") {
    alert('Try again');
    document.querySelector('.job-app___input').focus();
    SelectEl.options[SelectEl.selectedIndex] = 0;
  }
    
  if (jobStatus > -1 || jobStatus !== "") {
    divEl.appendChild(document.createTextNode(inputValueEl));
    statusDivEl.appendChild(divEl);

    switch (jobStatus) {
      case 'accepted':
        iconEl.className = 'fa fa-check';
        divEl.appendChild(iconEl);
        statusDivEl.appendChild(divEl);
      break;

      case 'rejected':
        iconEl.className = 'fa fa-times';
        divEl.className = 'grid-layout';
        divEl.appendChild(iconEl);
        statusDivEl.appendChild(divEl);
      break;

      case 'no-answer':
        iconEl.className ='fa fa-question';
        divEl.appendChild(iconEl);
        statusDivEl.appendChild(divEl);
      break;

      default:
        console.log('Default settings');
        break;
    }

  }


  // TESTING LOCALSTORAGE STUFF

  if (statusDivEl.innerHTML === null || statusDivEl.innerHTML === "") {
    console.log('nope');
  } else {
    saveJobApp(statusDivEl.innerHTML);
  }

  document.querySelector('.job-app___input').value = "";
}

function saveJobApp(job_name) {
  /**   
   * * This function takes in the name of the company/job app as a parameter and
   * * and saves it to the local storage for later use. 
   *
   */
  let jobs;
  
  if (localStorage.getItem('job-apps') === null) {
    jobs = [];
    // console.log('booooring');
  } else {
    jobs = JSON.parse(localStorage.getItem('job-apps'));
  }

  jobs.push(job_name);

  localStorage.setItem('job-apps', JSON.stringify(jobs)); 

  console.log('saved');
}

function loadJobApp() {
  const jobs = JSON.parse(localStorage.getItem('job-apps'));
  const statusDivEl = document.querySelector('.status');  
  if (jobs === null) {
    console.log('too bad')
  } else {
    for (let i = 0; i<jobs.length;i++) {
      statusDivEl.innerHTML = jobs[i];
    }
    console.log(jobs);
  }
}

loadJobApp(); // testing out the load function  
