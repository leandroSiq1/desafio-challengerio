const displayAll = document.querySelector("#displayAll");
const displayActive = document.querySelector("#displayActive");
const displayCompleted = document.querySelector("#displayCompleted");

const All = [];
const Active = [];
const Completed = [];

const Todo = {
  
  keyPress(event) {
    if (event.key === "Enter") {
      this.getValue();
    }
    return;
  },

  getValue() {
    const input = document.querySelector("#input");

    value = input.value;
    input.value = "";

    if (value === "") {
      return;
    } else {
      All.push({ description: value, state: "", display: "flex" });
      Active.push({ description: value, state: "", display: "flex" });
      Completed.push({ description: value, state: "", display: "none" });
    }

    App.init();
  },

  createTask(textTask, index, state, display) {
    const div = document.createElement("div");
    const divActive = document.createElement("div");

    const HTML = `
    <div class="check ${state}">
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

    div.classList = `task ${(true ? state : "" )}`;
    div.dataset.index = index;
    div.innerHTML = HTML;

    divActive.classList = `task ${(true ? state : "" )}`;
    divActive.dataset.index = index;
    divActive.innerHTML = HTML;
    divActive.style.display = display;

    displayAll.appendChild(div);
    displayActive.appendChild(divActive);  
  },

  createTaskCompleted(textTask, index, state, display) {
    const divCompleted = document.createElement("div");
    
    const HTML = `
      <div class="check active">
        <div class="box-check" style="cursor: no-drop;">
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

    divCompleted.classList = `task active`;
    divCompleted.dataset.index = index;
    divCompleted.innerHTML = HTML;
    divCompleted.style.display = display;

    displayCompleted.appendChild(divCompleted);
  },

  remove(element) {
    index = Number(element.parentNode.dataset.index);

    All.splice(index, 1);
    Active.splice(index, 1);
    Completed.splice(index, 1);

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

    this.validateCheck(task);
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
  },

  validateCheck(element) {
    index = element.dataset.index;
    boxActive = displayActive.childNodes;
    
    boxActive.forEach((task) => {
      if (task.dataset.index === index && task.classList.length === 1) {
        task.style.display = "none";
        task.classList.add(".");

        Active[index].state = "active";
        Active[index].display = "none";
        
        displayCompleted.children[index].style.display = "flex";

        All[index].state = "active";
        All[index].display = "none";
        
        return;
      }

      if (task.dataset.index === index && task.classList.length === 2) {
        task.style.display = "flex";
        task.classList.remove(".");
        task.classList.remove("active");
        task.childNodes[1].classList.remove("active");
        
        Active[index].display = "flex";
        displayCompleted.children[index].style.display = "none";
        All[index].state = "";
      }

    });
  }
}

const App = {
  
  init() {
    displayAll.innerHTML = "";
    displayActive.innerHTML = "";
    displayCompleted.innerHTML = "";

    All.forEach((element, index) => {
      Todo.createTask(element.description, index, element.state, element.display);
    });

    Completed.forEach((element, index) => {
      Todo.createTaskCompleted(element.description, index, element.state, element.display);
    });
  },

  reload() {
    this.init();
  }

}

App.init();