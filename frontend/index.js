//getting html elements
let titleTextBox = document.getElementById("titleTextBox");
let priorityTextBox = document.getElementById("priorityTextBox");
let dateTextBox = document.getElementById("dateTextBox");
let addButton = document.getElementById("addButton");
let todoItemsList = document.getElementById("todoItemsList");

//adding event listener to button
addButton.addEventListener("click", () => {
  //getting values of text boxes
  let title = titleTextBox.value;
  let priority = priorityTextBox.value;
  let date = dateTextBox.value;

  fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      priority: priority,
      date: date,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        createTaskItem(result);
      }
    });
});

//function to populate all list items
function populateTodoList() {
  //clear the div innerHTML
  //   todoItemsList.innerHTML = "";

  //fetching the movies from our URL
  fetch("http://localhost:3000/todos")
    .then((response) => response.json())
    .then((tasks) => {
      tasks.forEach((task) => {
        createTaskItem(task);
      });
    });
}

function createTaskItem(task) {
  //create inner html elements that will be populated
  let divTask = document.createElement("div");
  let divTitle = document.createElement("div");
  let divPriority = document.createElement("div");
  let divDate = document.createElement("div");
  let deleteButton = document.createElement("button");

  divTask.setAttribute("data-id", task.id);

  divTitle.innerHTML = `<b>Title:</b> ${task.title}`;
  divTask.appendChild(divTitle);

  divPriority.innerHTML = `<b>Priority:</b> ${task.priority}`;
  divTask.appendChild(divPriority);

  divDate.innerHTML = `<b>Date:</b>${task.date}`;
  divTask.appendChild(divDate);

  deleteButton.innerHTML = "Delete";
  divTask.appendChild(deleteButton);

  todoItemsList.appendChild(divTask);

  deleteButton.addEventListener("click", (event) => {
    const el = event.target;
    const id = el.parentNode.getAttribute("data-id");
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    }).then(() => divTask.remove());
  });
}

populateTodoList();
