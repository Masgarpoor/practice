const todoList = JSON.parse(localStorage.getItem("list")) || [];
renderToDoList();

document.querySelector(".js-add-button").addEventListener("click", () => {
  addList();
}); 

document
  .querySelector(".js-name-input")
  .addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addList();
    }
  });

document
  .querySelector(".js-date-input")
  .addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addList();
    }
  });

function addList() {
  const nameElement = document.querySelector(".js-name-input");
  const dateElement = document.querySelector(".js-date-input");
  const item = {
    name: nameElement.value,
    date: dateElement.value,
  };

  if (item.name !== "") {
    todoList.push(item);
    nameElement.value = "";
    dateElement.value = "";
    renderToDoList();
  } else {
    alert("Please enter Todo name!");
  }
}

function renderToDoList() {
  let htmlGenerator = "";

  todoList.forEach((todoObject, index) => {
    const { name, date } = todoObject;

    const html = `
        <div class='todo-grid'>
          <p class='item'>${name}</p>
          <p class='item'>${date}</p>
          <button class='button delete-button js-delete-todo-button'>Delete</button>
          <button class='button start-button js-start-todo-button'>Start</button>
        </div>
        `;
    htmlGenerator += html;
  });

  document.querySelector(".js-todo-list").innerHTML = htmlGenerator;
  document
    .querySelectorAll(".js-delete-todo-button")
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        todoList.splice(index, 1);
        renderToDoList();
      });
    });

  localStorage.setItem("list", JSON.stringify(todoList));
}
