document.addEventListener("DOMContentLoaded", () => {
    loadAssignments();
});

function addAssignment() {
    let assignmentInput = document.getElementById("assignmentInput");
    let deadlineInput = document.getElementById("deadlineInput");
    let assignmentName = assignmentInput.value.trim();
    let deadline = deadlineInput.value;

    if (assignmentName === "") {
        alert("Please enter an assignment name.");
        return;
    }

    let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
    assignments.push({ name: assignmentName, deadline: deadline, completed: false });

    localStorage.setItem("assignments", JSON.stringify(assignments));
    assignmentInput.value = "";
    deadlineInput.value = "";
    loadAssignments();
}

function loadAssignments() {
    let assignmentList = document.getElementById("assignmentList");
    assignmentList.innerHTML = "";

    let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

    assignments.forEach((assignment, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span style="text-decoration: ${assignment.completed ? 'line-through' : 'none'}">
                ${assignment.name} (Deadline: ${assignment.deadline || 'No deadline'})
            </span>
            <button class="complete" onclick="markCompleted(${index})">Complete</button>
            <button class="delete" onclick="deleteAssignment(${index})">Delete</button>
        `;
        assignmentList.appendChild(li);
    });
}

function markCompleted(index) {
    let assignments = JSON.parse(localStorage.getItem("assignments"));
    assignments[index].completed = !assignments[index].completed;

    localStorage.setItem("assignments", JSON.stringify(assignments));
    loadAssignments();
}

function deleteAssignment(index) {
    let assignments = JSON.parse(localStorage.getItem("assignments"));
    assignments.splice(index, 1);

    localStorage.setItem("assignments", JSON.stringify(assignments));
    loadAssignments();
}

function displayFileName() {
    let fileInput = document.getElementById("fileInput");
    let submissionList = document.getElementById("submissionList");
    let fileName = fileInput.files[0]?.name;
    
    if (fileName) {
        let li = document.createElement("li");
        li.textContent = fileName;
        submissionList.appendChild(li);
    }
}

function submitAssignment() {
    alert("Assignment submitted successfully!");
}
