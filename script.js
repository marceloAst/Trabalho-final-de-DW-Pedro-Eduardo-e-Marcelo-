let isCtrl = false
let isH = false
let studentsList = document.getElementById('studentsList')
let closeStudentsList = document.getElementById('closeStudentsList')
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
    if(isCtrl&&isH){
        switchStudentsList()
    }
})
window.addEventListener('keyup',(event)=>{
    switch (event.keyCode){
        case 17:
            isCtrl=false
            break
        case 72:
            isH=false
            break
    }
    if(isCtrl&&isH){
        switchStudentsList()
    }
})
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
closeStudentsList.onclick = hideStudentsList
// 
let temtudo = document.querySelector(".temtudo")
let principal = document.querySelector(".principal")
let secundaria = document.querySelector(".secundaria")
let buttonclick = document.getElementById("click")
let input = document.getElementById("input")

input.addEventListener("keypress",(event)=>{
    if(event.keyCode===13){
        adicionarNovaTarefa()
    }
})
function adicionarNovaTarefa() {
    mostrarad()
    const tarefa = input.value;
    if (tarefa) {

      input.value = ''; 
      mostrarTarefas(tarefa);
    }
  }
  
function mostrarTarefas(tarefa){
    principal.insertAdjacentHTML(
        "afterbegin",
        `
        <div class="obj">
                <input type="checkbox" class="checkbox" onclick="barrinha(this.parentElement)">
                <p class="en" contenteditable="false">${tarefa}</p>
                <button onclick="edita(this.parentElement)"">editar</button>
                <button onclick="exclui(this.parentElement)"">excluir</button>
            </div>
        `
    )
    principal.querySelector(".en").addEventListener("keypress",(event)=>{
        if(event.keyCode===13){
            edita(event.target.parentElement)
        }
    })
    barrinha()
    }
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
function barrinha(){
    secundaria.innerHTML = (`${clicado()}/ ${principal.querySelectorAll(".obj").length} `)
}
function edita(el){
    let x = el.querySelector(".en")
    if (x.contentEditable=='false'){
        x.contentEditable = true
        const range = document.createRange()
	    const selection = window.getSelection()
        range.selectNodeContents(x)
        range.collapse(false)
        selection.removeAllRanges()
        selection.addRange(range)
        x.focus()
    }
    else{
        x.contentEditable = false
    }
}
function exclui(elem){
    elem.remove()
    barrinha()
}
function mostrarad(){
    let div = document.querySelector(".ads")
    for (const iterator of div.children) {
        if(iterator.classList.contains("active")){
            return
        }
    }
    let anuncio = document.querySelector("#ad"+(Math.floor(Math.random()*div.children.length)+1))
    anuncio.classList.add("active")
}
function fecha(){
    let div = document.querySelector(".ads")
    for (const iterator of div.children) {
        iterator.classList.remove("active")
    }
}

function barrinha(element=false) {
    if(element){
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

    secundaria.innerHTML = `${tarefasConcluidas} / ${totalTarefas}`;
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = `${progressPercentage}%`;
    }
}

const toggleDarkModeButton = document.getElementById('toggleDarkMode');

// Alternar Modo Escuro/Claro

toggleDarkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Alterar o texto do botão

    toggleDarkModeButton.textContent = document.body.classList.contains('dark-mode')
        ? '🌙'
        : '☀️';
});


