const displayAll = document.querySelector("#displayAll");
const displayActive = document.querySelector("#displayActive");
const displayCompleted = document.querySelector("#displayCompleted");

const All = [];
const Active = [];
const Completed = [];

const Todo = {
  
  keyPress(event) {

    if (event.key === "Enter") {
      Todo.getValue();
    }

    return;
  },

  getValue() {
    const input = document.querySelector("#input");

    value = input.value;
    input.value = "";

    All.push({ description: value })
    Active.push({ description: value })

    App.init();
  },

  createTask(textTask, index) {
    const div = document.createElement("div");
    const divActive = document.createElement("div");
    const divCompleted = document.createElement("div");

    const HTML = `
    <div class="check">
      <div onclick="Todo.check(this)" class="box-check">
        <div class="circle-check"></div>
      </div>
    </div>

    <div class="content-task">
      <p>${textTask}</p>       
    </div>

    <div onclick="Todo.remove(this)" class="icon-remove">
      <i class="far fa-trash-alt"></i>
    </div>
  `

    div.classList = "task";
    div.dataset.index = index;
    div.innerHTML = HTML;

    divActive.classList = "task";
    divActive.dataset.index = index;
    divActive.innerHTML = HTML;

    displayAll.appendChild(div);
    displayActive.appendChild(divActive);
  },

  remove(element) {
    index = Number(element.parentNode.dataset.index);

    All.splice(index, 1);
    Active.splice(index, 1);

    App.reload();
  },

  check(element) {
    const task = element.parentNode.parentNode;

    if (task.childNodes[1].classList.length === 1) {
      task.childNodes[1].classList.add("active");
      task.classList.add("active");
    } else {
      task.childNodes[1].classList = "check";
      task.classList = "task";
    }

    console.log(task.childNodes[1].classList.length);

    // console.log("checar a Task");
  },

  validateLink(element) {
    const nav = document.querySelectorAll(".links");
    links = nav[0].childNodes;

    links.forEach((link) => {
      link.classList = "";
    });

    element.classList = "active";

    if (element.id === "active") {
      displayActive.style.display = "flex";
      displayAll.style.display = "none";
      displayCompleted.style.display = "none";
    }

    if (element.id === "all") {
      displayAll.style.display = "flex";
      displayActive.style.display = "none";
      displayCompleted.style.display = "none";
    }

    if (element.id === "completed") {
      displayCompleted.style.display = "flex";
      displayAll.style.display = "none";
      displayActive.style.display = "none";
    }
  }
}

const App = {
  
  init() {
    displayAll.innerHTML = "";
    displayActive.innerHTML = "";

    // e criar as task na div all e active
    All.forEach((element, index) => {
      Todo.createTask(element.description, index);
    });

    // console.log(All);
  },

  reload() {
    this.init();
  }

}

App.init();