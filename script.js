let temtudo = document.querySelector(".temtudo")
let principal = document.querySelector(".principal")
let secundaria = document.querySelector(".secundaria")
let buttonclick = document.getElementById("click")
let input = document.getElementById("input")
let isCtrl = false
let isH = false
let studentsList = document.getElementById('studentsList')
let closeStudentsList = document.getElementById('closeStudentsList')
const toggleDarkModeButton = document.getElementById('toggleDarkMode');

//verifica se a dark já foi declarada no localstorage, se não foi basicamente inica como false
if(!localStorage.getItem('dark')){
    localStorage.setItem('dark','false')
}else{
    //muda o dark-mode de acordo com o localstorage
    if(localStorage.getItem('dark')==='true'){
        document.body.classList.toggle('dark-mode');
    
        // Alterar o texto do botão
        toggleDarkModeButton.textContent = document.body.classList.contains('dark-mode')
            ? '🌙'
            : '☀️';
    }
    
}
//verifica se a tarefas já foi declarada no localstorage, se não foi basicamente inica como []
if(!localStorage.getItem('tarefas')){
    localStorage.setItem('tarefas',JSON.stringify({tarefas:[]}))
}else{
    //se já foi, percorre a lista de tarefas adicionando uma dive pra cada tarefa
    for (const elem of JSON.parse(localStorage.getItem('tarefas')).tarefas) {
        principal.insertAdjacentHTML(
            "beforeend",
            `
            <div class="obj ${elem.concluido?'concluido':''}" ${elem.concluido?'style="order: 1"':''}>
                    <input type="checkbox" class="checkbox" onclick="barrinha(this.parentElement)" ${elem.concluido?'checked':''}>
                    <p class="en" onclick="barrinha(this.parentElement,true)" contenteditable="false"></p>
                    <div class="editaExclui">
                        <i onclick="edita(this.parentElement.parentElement)" class="ti ti-pencil"></i>
                        <i onclick="exclui(this.parentElement.parentElement)" class="ti ti-trash"></i>
                    </div>
                </div>
            `
        )
        principal.querySelectorAll(".en")[principal.querySelectorAll(".en").length-1].textContent=elem.tarefa
        // pra funcionar o enter
        principal.querySelectorAll(".en")[principal.querySelectorAll(".en").length-1].addEventListener("keypress",(event)=>{
            if(event.keyCode===13){
                edita(event.target.parentElement)
            }
        })
    }

    barrinha()
}
//verifica quando se pressiona as teclas 'ctrl' keyCode = 17 e 'H' keyCode = 72
window.addEventListener('keydown',(event)=>{
    switch (event.keyCode){
        case 17:
            isCtrl=true
            break
        case 72:
            if(isCtrl){
                event.preventDefault()
            }
            isH=true
            break
    }
    //se ctrl e H forem pressionados altera a visibilidade da lista de estudantes(modal)
    if(isCtrl&&isH){
        switchStudentsList()
    }
})
//verifica quando se solta as teclas 'ctrl' keyCode = 17 e 'H' keyCode = 72
window.addEventListener('keyup',(event)=>{
    switch (event.keyCode){
        case 17:
            isCtrl=false
            break
        case 72:
            isH=false
            break
    }

})
//altera a visibilidade do modal, removendo ou adicionando a classe active
function switchStudentsList(){
    if(studentsList.classList.contains('active')){
        hideStudentsList()
        return
    }
    showStudentsList()
}
function hideStudentsList(){
    studentsList.classList.remove('active')
}
function showStudentsList(){
    studentsList.classList.add('active')
}

//adiciona o evento ao x do modal
closeStudentsList.onclick = hideStudentsList



input.addEventListener("keypress",(event)=>{
    if(event.keyCode===13){
        adicionarNovaTarefa()
    }
})
function adicionarNovaTarefa() {
    mostrarad()
    const tarefa = input.value;
    if (tarefa) {
        //clona o array tarefas do localStorage
        let newArray = JSON.parse(localStorage.getItem('tarefas')).tarefas
        //adiciona a tarefa no começo do novo array
        newArray.unshift({tarefa: tarefa, concluido: false})
        //atualiza o localStorage
        localStorage.setItem('tarefas',JSON.stringify({tarefas: newArray}))
      input.value = ''; 
      mostrarTarefas(tarefa);
    }
    

  }
// a parte interna da div, já declarada como um html
function mostrarTarefas(tarefa){
    principal.insertAdjacentHTML(
        "afterbegin",
        `
        <div class="obj">
                <input type="checkbox" class="checkbox" onclick="barrinha(this.parentElement)">
                <p class="en" onclick="barrinha(this.parentElement,true)" contenteditable="false"></p>
                <div class="editaExclui">
                    <i onclick="edita(this.parentElement.parentElement)" class="ti ti-pencil"></i>
                    <i onclick="exclui(this.parentElement.parentElement)" class="ti ti-trash"></i>
                </div>
            </div>
        `
    )
    principal.querySelector(".en").textContent=tarefa
    // pra funcionar o enter
    principal.querySelector(".en").addEventListener("keypress",(event)=>{
        if(event.keyCode===13){
            edita(event.target.parentElement)
        }
    })
    // pra atualizar o progresso toda vez que atualizar o html
    barrinha()
    }
// verifica se um elemento foi clicado
function clicado(){
    let x = principal.querySelectorAll(".obj")
    let contador = 0
    for (const i of x) {
        if(i.querySelector(".checkbox").checked){
            contador ++
        }  
    }
    return contador
}
function editaLocalStorage(el,x){
    //clona o array tarefas do localStorage, onde se edita o valor em tarefas usando a posição do el na div.principal
    let newArray = JSON.parse(localStorage.getItem('tarefas')).tarefas.map((element,i)=>{
        if(i===Array.prototype.indexOf.call(principal.querySelectorAll('.obj'),el)){
            console.log(Array.prototype.indexOf.call(principal.querySelectorAll('.obj'),el), i)
            element.tarefa=x.innerHTML
        }
        return element
    })

    //atualiza o localStorage
    localStorage.setItem('tarefas',JSON.stringify({tarefas:newArray}))
}
// basicamente, é a funçao para editar
function edita(el){
    let x = el.querySelector(".en")
    if (x.contentEditable=='false'&&!el.classList.contains('concluido')){
        x.contentEditable = true
        const range = document.createRange()
	    const selection = window.getSelection()
        range.selectNodeContents(x)
        range.collapse(false)
        selection.removeAllRanges()
        selection.addRange(range)
        x.focus()
  
        //verifica se o mouse clicou fora do p, se sim desativa a edição e salva no localStorage
        window.addEventListener('mousedown',()=>{
            if((event.srcElement.parentElement!=el&&!event.srcElement.parentElement.classList.contains('editaExclui'))||(!event.srcElement.classList.contains('en')&&!(event.srcElement.classList.contains('ti-pencil')))){
                x.contentEditable = false
                editaLocalStorage(el,x)
            }
        })
    }
    else{
        //se clicou em editar e já estava editando tira a edição e salva no localStorage
        x.contentEditable = false
        editaLocalStorage(el,x)
    }
}
// funçao para excluir elementos
function exclui(elem){
    //clona o array tarefas do localStorage, filtrando o elemneto na posição do elem na div.principal
    let newArray = JSON.parse(localStorage.getItem('tarefas')).tarefas.filter((el,i)=>{
        if(i===Array.prototype.indexOf.call(principal.querySelectorAll('.obj'),elem)){
            return
        }
        return el
    })
    //atualiza o localStorage
    localStorage.setItem('tarefas',JSON.stringify({tarefas:newArray}))
    elem.remove()
    barrinha()
}
// funçao para os ads
function mostrarad(){
    let div = document.querySelector(".ads")
    for (const iterator of div.children) {
        if(iterator.classList.contains("active")){
            return
        }
    }
    // basicamente, vai pegar 1 dos 3 ads de forma aleatória
    let anuncio = document.querySelector("#ad"+(Math.floor(Math.random()*div.children.length)+1))
    anuncio.classList.add("active")
}
// o x dos ads
function fecha(){
    let div = document.querySelector(".ads")
    // vai remover uma classe dos ads, fazendo assim a div sumir
    for (const iterator of div.children) {
        iterator.classList.remove("active")
    }
}
// a barra de progresso
function barrinha(element=false,switchs=false) {
    //se não tiver editando, quando clica no p muda o checkbox, se tiver marcado desmarca, se não marca
    if(switchs){
        if(element.querySelector('.en').contentEditable=='false'){
            element.querySelector('input').checked=!element.querySelector('input').checked
        }
    }
    if(element){
        let newArray = JSON.parse(localStorage.getItem('tarefas')).tarefas.map((el,i)=>{
            if(i===Array.prototype.indexOf.call(principal.querySelectorAll('.obj'),element)){
                console.log(Array.prototype.indexOf.call(principal.querySelectorAll('.obj'),element), i)
                el.concluido=element.querySelector('input').checked
            }
            return el
        })
        localStorage.setItem('tarefas',JSON.stringify({tarefas:newArray}))
        element.style.order=element.querySelector('input').checked?1:0
        if(element.querySelector('input').checked){
            element.classList.add('concluido')
        }else{
            element.classList.remove('concluido')
        }
    
    }
    const totalTarefas = principal.querySelectorAll(".obj").length;
    const tarefasConcluidas = clicado();
    const progressPercentage = totalTarefas === 0 ? 0 : (tarefasConcluidas / totalTarefas) * 100;
    // vai mostrar o progresso
    secundaria.innerHTML = `${tarefasConcluidas} / ${totalTarefas}`;
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = `${progressPercentage}%`;
    }
}

/* opacidade e risco */
document.querySelectorAll('.obj input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
        const taskText = event.target.nextElementSibling;
        if (event.target.checked) {
            taskText.classList.add('completed');
        } else {
            taskText.classList.remove('completed');
        }
    });
});


// Alternar Modo Escuro/Claro

toggleDarkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    //armazena o estado no localstorage
    localStorage.setItem('dark',document.body.classList.contains('dark-mode'))
    // Alterar o texto do botão
    toggleDarkModeButton.textContent = document.body.classList.contains('dark-mode')
        ? '🌙'
        : '☀️';
});

// pra barrinha sempre mostrar
barrinha()