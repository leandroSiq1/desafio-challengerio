const App = {
    init() {

        Todo.all.forEach((element, index) => {
            Todo.createHtmlTask(element.description, index);
        });

        DOM.validateDisplays();
    },

    reload() {
        DOM.clearTaskHtml();

        App.init();
    },
}

const DOM = {

    displayAll: document.querySelector("#displayAll"),
    displayActive: document.querySelector("#displayActive"),
    displayCompleted: document.querySelector("#displayCompleted"),
    
    clearTaskHtml() {
        displayAll.innerHTML = "";
        displayActive.innerHTML = "";
    },

    innerHTMLDisplay(divTask1, divTask2) {
       displayAll.append(divTask1);
       displayActive.append(divTask2);
    },

    toggle(element) {
        const links = document.querySelectorAll("nav p");

        links.forEach((element) => {
            if(element.classList[1] == "activeLink") {
                element.classList.remove("activeLink");
            }
        });

        element.classList.toggle("activeLink");
        this.validateDisplays();
    },

    validateDisplays() {
        const links = document.querySelectorAll("nav p");
        displayAll.style.display = "none";
        displayActive.style.display = "none";
        displayCompleted.style.display = "none";

        links.forEach((element) => {
            if (element.classList.length === 2) {
                if (element.classList[0] === "all") {

                    displayAll.style.display = "flex";

                } else if (element.classList[0] === "active") {

                    displayActive.style.display = "flex";

                } else if (element.classList[0] === "completed") {

                    displayCompleted.style.display = "flex";

                }
            }
        });
    }
}

const Todo = {

    all: [],
    active: [],

    keyPress(event) {
        if(event.key == "Enter") {
            this.getValue();
        }
    },

    remove(taskIndex) {
        index = Number(taskIndex.index);  
        this.all.splice(index, 1);
        this.active.splice(index, 1);

        App.reload();
    },

    getValue() {
        const input = document.querySelector("#input");
        value = input.value;
        input.value = "";

        if (value === "") {
            return;
        }

        this.addValue({ description: value });
    },

    addValue(description) {

        this.all.push(description);
        this.active.push(description);

        this.createTask();
    },

    createTask() {
        DOM.clearTaskHtml();

        this.all.forEach((element, index) => {
            this.createHtmlTask(element.description, index)
        });
    },

    createHtmlTask(descriptionTask, index) {
        const div1 = document.createElement("div");
        const div2 = document.createElement("div");
        const i1 = document.createElement("i");
        const i2 = document.createElement("i");
        
        const HTML = `
            <div class="task-content">
                <div class="check">
                    <div class="check-ball">
                        <div onclick="Todo.check(this)" class="ball-check"></div>
                    </div>
                </div>

                <p>${descriptionTask}</p>
                <hr>    
            </div>
        `
        div1.classList.add("task");
        div2.classList.add("task");
        i1.classList.add("far", "fa-trash-alt");
        i2.classList.add("far", "fa-trash-alt");

        i1.addEventListener('click', (event) => {
            index = event.path[1].dataset;
            this.remove(index);
        });

        i2.addEventListener('click', (event) => {
            index = event.path[1].dataset;
            this.remove(index);
        });

        div1.dataset.index = index;
        div2.dataset.index = index;
        i1.dataset.index = index;
        i2.dataset.index = index;

        div1.innerHTML = HTML;
        div2.innerHTML = HTML;
        div1.appendChild(i1);
        div2.appendChild(i2);

        DOM.innerHTMLDisplay(div1, div2);
    },

    check(element) {
        const hr = element.parentNode.parentNode.parentNode.children[2];
        const descriptionTask = element.parentNode.parentNode.parentNode.parentNode;

        element.classList.toggle("active-check");
        hr.classList.toggle("active");

        console.log(descriptionTask);
    }
}

App.init();