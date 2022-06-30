const add = document.querySelector("#add");

const todos = JSON.parse(localStorage.getItem("todo")) || [];

const handleClick = () => {
  const todo = prompt();
  if (!todo || todo.length === 0) return;
  addTodo(todo);
};

const getNextId = () => {
  let id = 0;
  todos.forEach((todo) => {
    if (todo.id > id) id = todo.id;
  });
  id++;
  return id;
};

const saveStorage = () => {
  localStorage.setItem("todo", JSON.stringify(todos));
};

function handleDelete() {
  const canDelete = confirm("confirm");
  if (!canDelete) return;
  const element = document.querySelector(`#${this.id}`);
  element.addEventListener("click", handleDelete, false);
  element.remove();
  const id = this.id.split("todo_")[1];
  const i = todos.findIndex((t) => t.id == id);
  todos.splice(i, 1);
  saveStorage();
}

const printTodo = (newId, todo) => {
  const id = `todo_${newId}`;
  const html = `<div id="${id}" class="todo">${todo}</div>`;
  document.querySelector("#ft_list").insertAdjacentHTML("afterbegin", html);
  document
    .querySelector(`#${id}`)
    .addEventListener("click", handleDelete, false);
};

const addTodo = (todo) => {
  const id = getNextId();
  printTodo(id, todo);
  todos.push({ id, todo });
  saveStorage();
};

add.addEventListener("click", handleClick, false);
todos.forEach((todo) => {
  printTodo(todo.id, todo.todo);
});
