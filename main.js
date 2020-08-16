document.getElementById('issueInputForm').addEventListener('submit', submitIssue);
const totalIssue=JSON.parse(localStorage.getItem('issues'));
const closedIssue=totalIssue.filter(issue=>issue.status=="Closed");
document.getElementById('open-issue').innerText=totalIssue.length- closedIssue.length;
function submitIssue(e) {
  if(document.getElementById('issueDescription').value.length<1){
    alert('Description is required');
    return;
  }
  if(document.getElementById('issueAssignedTo').value.length<1){
    alert('your name is required');
    return;
  }
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';
  let issues = [];
  const issue = { id, description, severity, assignedTo, status};
  
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  console.log(issues);
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
  let tIssue=JSON.parse(localStorage.getItem('issues'));
  const cIssue=tIssue.filter(issue=>issue.status=="Closed");
  document.getElementById('total-issue').innerText=tIssue.length;
  document.getElementById('open-issue').innerText=tIssue.length- cIssue.length;
}
var totalIssueLength=0;
const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  let tIssue=JSON.parse(localStorage.getItem('issues'));
  const cIssue=tIssue.filter(issue=>issue.status=="Closed");
  document.getElementById('total-issue').innerText=tIssue.length;
  document.getElementById('open-issue').innerText=tIssue.length- cIssue.length;
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue=>issue.id != id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
  let tIssue=JSON.parse(localStorage.getItem('issues'));
  const cIssue=tIssue.filter(issue=>issue.status=="Closed");
  document.getElementById('total-issue').innerText=tIssue.length;
  document.getElementById('open-issue').innerText=tIssue.length- cIssue.length;
}

console.log(totalIssue.length);
document.getElementById('total-issue').innerText=totalIssue.length;

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i]

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" id="${id}" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
  
}

