/***
 * ? This application is to monitor your job application status.
 * ? All you need to do is enter in your job application name and then wait. 
 * 
 * // TODO: Implement Local Storage,
 * TODO: Work on the documentation, 
 * TODO: Date Job Application Added, 
 * TODO: Date Job Application Response, 
 * TODO: custom modal for validation, 
 * TODO: regex validation,
 * TODO: Add in drag n drop feature?,
 * TODO: Clear jobs onclick,
 * TODO: Work on naming convention
 */

'use strict';

loadEventListeners();
loadJobAppStatus();

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
  /***
   * This function creates and adds the job status elements.
   * It starts off by creating the necessary UI elements and then appends them to the status list div. 
   * It also grabs the main status from the getJobStatus function
   * 
   * 
   * TODO: Break out certain parts into their own functions so everything stays consistent and succinct.
   * TODO: Possibly implement getJobStatus into this function. 
   * 
   */

  const jobStatus = getJobStatus();
  const iconEl = document.createElement('i');
  const inputValueEl = document.querySelector('.job-app___input').value;
  const divEl = document.createElement('div');
  const statusDivEl = document.querySelector('.status');
    
  if (inputValueEl === "") {
    alert('Try again');
    document.querySelector('.job-app___input').focus();
  } else if (inputValueEl !== "") {
      
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
          break;
      }

    }
}

  if (statusDivEl.innerHTML === null || statusDivEl.innerHTML === "") {
    return;
  } else {
    saveJobApp(statusDivEl.innerHTML);
  }
  

  document.querySelector('.job-app___input').value = "";
}

function saveJobApp(job_name) {
  /**   
   * * This function takes in the name of the company/job app as a parameter and
   * * saves it to the local storage for later use. 
   */

  let jobs;
  
  if (localStorage.getItem('job-apps') === null) {
    jobs = [];
  } else {
    jobs = JSON.parse(localStorage.getItem('job-apps'));
  }

  jobs.push(job_name);

  localStorage.setItem('job-apps', JSON.stringify(jobs)); 

  alert("Saved successfully.")
}

function loadJobAppStatus() {
  // * Grabs jobs from LocalStorage and loads them into the
  // * status div.

  const jobs = JSON.parse(localStorage.getItem('job-apps'));
  const statusDivEl = document.querySelector('.status');
  
  try {
    jobs.forEach((job)=>{
      statusDivEl.innerHTML = job;
    });
  } catch(e) {
    console.log(e.message);
  }
  
}
