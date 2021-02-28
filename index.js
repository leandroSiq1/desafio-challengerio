// METODOS QUE A APLICAÇÃO POSSIVELMENTE VAI TER QUE TER 
// 1º init; 2º addTarefa; 3º RemoveTarefa; 4º checkTarefa

// 1º para armazenar todas as tarefas
// preciso adicionar um index para cada tarefa

// 2º para armazenar todas as tarefas que ainda nao foram dado check

// 3º para armazenar as tarefas concluidas

// quando adicionarmos uma tarefas, adicionaremos uma div com asinformações da tarefa em 2 arrays, all e active

// quando uma tarefa for excluida ela vai ser retirada de todos os array

// quando uma tarefa for concluida ela tem que sair do active e ir pro complete

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
        // nao é possivel enviar a mesma div para ambos display uma opção é criar uma fucntion
        // que percorre o array do active e cria novas divs, ou tentar clonar essa div que esta 
        // entrando na function

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

        // to pensando em ja adicionar em todos os arrays, porém na div completed 
        // as div estaram em display: none; e quando dar o check vai verificar o index
        // e pegar a div do index no array e dar o display: flex;
    }
}

App.init();

// removeTaskTheActive() {
    // var dar um forEach no Array all e verificar a classe de cada item
    // e ver se tem a class check se sim ele vai remover do active e adicionar a classe do risquinho e adicionar ao array completed e dar return

    // se nao tiver a classe check remover a task de todos os arrays
    // e atualizar o html
// },

// checkTask() {
    // vai pegar a div e verificar qual é o index da div
    // e adicionar a class check do risquinho
    // e verificar em qual pocisão ela esta nos arrays
    // remover dos arrays e adicionar a tarefa no array completed
    // e atualizar o HTML
// }

