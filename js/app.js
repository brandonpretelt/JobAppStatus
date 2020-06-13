/***
 * Author: Brandon Pretelt
 * Github: brandonpretelt
 * Working Title: JobAppStatus
 * Description: An easier way to track job applications. It is a Kanban style board. 
 * 
 * 
 * ? TODO LIST:  
 * // TODO: Implement Local Storage,
 * TODO: Work on the documentation, 
 * TODO: Date Job Application Added, 
 * TODO: Date Job Application Response, 
 * // TODO: custom modal, 
 * TODO: regex validation,
 * TODO: Add in drag n drop feature?,
 * TODO: Clear jobs onclick,
 * // TODO: Work on variable naming convention,
 * TODO: Dynamically create and add card divs,
 * TODO: Ask for a code review 
 */

'use strict';

loadEventListeners();
loadJobAppStatus();

function loadEventListeners() {
  document.querySelector('button').addEventListener('click', addJobStatus);
}

function getJobStatus() {
    // * this function grabs the job status and returns it
    const select = document.querySelector('.job-app-status___input-select');
    const select__option = select.options[select.selectedIndex].value;
    
    return select__option;
    
}
  
function addJobStatus(){
  /***
   * This function creates and adds the job status elements.
   * It starts off by creating the necessary UI elements and then appends them to the status list div. 
   * It also grabs the main status from the getJobStatus function
   * 
   * 
   * // TODO: Break out certain parts into their own functions so everything stays consistent and succinct.
   * TODO: Possibly implement getJobStatus into this function. 
   * 
   */

  const jobStatus = getJobStatus();
  const icon = document.createElement('i');
  const inputValue = document.querySelector('.job-app___input').value;
  const div = document.createElement('div');
  const statusDiv = document.querySelector('.status');
  
  if (inputValue !== "" && jobStatus !== "---") {
    div.append(document.createTextNode(inputValue));
    statusDiv.appendChild(div);

    switch (jobStatus) {
      case 'accepted': // classValue = fa fa-check, el_a = icon, el_b = div, el_c = statusDiv
          addStatusIndicator('fa fa-check', icon, div, statusDiv);
      break;

      case 'rejected':
          addStatusIndicator('fa fa-times', icon, div, statusDiv);
      break;

      case 'no-answer':
          addStatusIndicator('fa fa-minus', icon, div, statusDiv);
      break;
    }

    saveJobApp(statusDiv.innerHTML);
  } else {
    showModal('pop-up error', 'Enter status and value');
  }

  document.querySelector('.job-app___input').value = "";
}

function addStatusIndicator(classValue, el_a, el_b, el_c) {
    el_a.className = classValue;
    el_b.appendChild(el_a);
    el_c.appendChild(el_b);
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
  
  jobs.forEach((job)=>{
    console.log(job);
  })

  showModal('pop-up confirm', 'Saved Successfully.');
}

function loadJobAppStatus() {
  // * Grabs jobs from LocalStorage and loads them into the
  // * status div.

  const jobs = JSON.parse(localStorage.getItem('job-apps'));
  const statusDiv = document.querySelector('.status');
  
  try {
    jobs.forEach((job)=>{
      statusDiv.innerHTML = job;
    });
  } catch(e) {
    console.log(`Error: ${e.message}`);
  }

}

function showModal(type, msg) {
  // * Creates a modal depending on class TYPE and adds a MSG to it

  const modalDiv = document.createElement('div');
  
  const card = document.querySelector('.card');
  const container = document.querySelector('.container');
  
  modalDiv.className = type;
  modalDiv.appendChild(document.createTextNode(msg));
  
  container.insertBefore(modalDiv, card);

  setTimeout(clearModal, 3000);
}

function clearModal() {
    document.querySelector('.pop-up').remove();
}
