import "./style.css";

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: Array<Todo> = [];

const todosContainer = document.querySelector(
  ".todoContainer"
) as HTMLDivElement;
const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;
const myForm = document.getElementById("form") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 100),
  };

  todos.push(todo);
  todoInput.value = "";
  renderTodo(todos);
};

const generateTodoItem = (item: Todo) => {
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "todo";

  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = item.isCompleted;
  checkBox.onchange = () => {
    todos.find((elem) => {
      if (elem.id === item.id) {
        item.isCompleted = checkBox.checked;
      }
    });
    para.className = checkBox.checked ? "textCut" : "";
  };

  const para: HTMLParagraphElement = document.createElement("p");
  para.innerText = item.title;
  para.className = item.isCompleted ? "textCut" : "";

  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deleteBtn";
  btn.onclick = () => {
    deleteTodo(item.id);
  };

  todo.append(checkBox, para, btn);
  todosContainer.append(todo);
};

const deleteTodo = (id: string) => {
  const idx = todos.findIndex((item) => item.id === id);
  todos.splice(idx, 1);
  renderTodo(todos);
};

const renderTodo = (todos: Todo[]) => {
  todosContainer.innerText = "";
  todos.forEach((todo) => {
    generateTodoItem(todo);
  });
};
