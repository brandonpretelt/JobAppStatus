/***
 * ? This application is to monitor your job application status.
 * ? All you need to do is enter in your job application name and then wait. 
 * 
 * TODO: Implement Local Storage, Date Job Application Added, Date Job Application Response, custom modal for validation, regex validation
 * 
 */

'use strict';

loadEventListeners();

function loadEventListeners() {
  document.querySelector('button').addEventListener('click', addJobStatus);
} 

function getJobStatus() {
    // * this function grabs the job status and returns it
    const UISelect = document.querySelector('.job-app-status___input-select');
    const UISelect__option = UISelect.options[UISelect.selectedIndex].value;
  
    return UISelect__option;
    
  }
  
  function addJobStatus(){
    // * This function creates and adds job status 
    
    // * This section grabs all the UI elements and creates what is needed. It also grabs the status from the getJobStatus function;
    const jobStatus = getJobStatus();
    const UIiconEl = document.createElement('i');
    const UIappListEl = document.querySelector('.application-list');
    const UIappListOutEl = document.createElement('div');
    const UISelect = document.querySelector('.job-app-status___input-select');
    
    const UISelect__optionText = UISelect.options[UISelect.selectedIndex].text;
    const UIinputValue = document.querySelector('.job-app___input').value;
    const UIDivEl = document.createElement('div');
    const UIStatusDivEl = document.querySelector('.status');
    
    if (UIinputValue === "") {
      alert('Try again');
      document.querySelector('.job-app___input').focus();
      UISelect.options[UISelect.selectedIndex] = 0;
    }
    
    if (jobStatus > -1 || jobStatus !== "") {
      UIDivEl.appendChild(document.createTextNode(UIinputValue));
      UIStatusDivEl.appendChild(UIDivEl);

      switch (jobStatus) {
        case 'accepted':
          UIiconEl.className = 'fa fa-check';
          UIDivEl.appendChild(UIiconEl);
          UIStatusDivEl.appendChild(UIDivEl);
          break;

        case 'rejected':
          UIiconEl.className = 'fa fa-times';
          UIDivEl.className = 'grid-layout';
          UIDivEl.appendChild(UIiconEl);
          UIStatusDivEl.appendChild(UIDivEl);
          break;

        case 'no-answer':
          UIiconEl.className ='fa fa-question';
          UIDivEl.appendChild(UIiconEl);
          UIStatusDivEl.appendChild(UIDivEl);
          break;

        default:
          console.log('Default settings');
          break;
      }

      
      /* if (jobStatus === "accepted") {
        UIiconEl.className = "fa fa-check";
        UIDivEl.appendChild(UIiconEl);
        UIStatusDivEl.appendChild(UIDivEl);
      }
      
      if (jobStatus === "no-answer") {
        UIiconEl.className = "fa fa-question";
        UIDivEl.appendChild(UIiconEl);
        UIStatusDivEl.appendChild(UIDivEl);
      }
      
      if (jobStatus === 'rejected') {
        UIiconEl.className = "fa fa-times";
        UIDivEl.appendChild(UIiconEl);
        UIStatusDivEl.appendChild(UIDivEl);
      } */
    }

    document.querySelector('.job-app___input').value = "";
  }
  
