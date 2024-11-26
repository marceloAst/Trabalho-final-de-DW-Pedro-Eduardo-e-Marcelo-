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
            event.preventDefault()
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
            event.preventDefault()
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
function adicionarNovaTarefa() {
    const tarefa = input.value;
    if (tarefa) {

      input.value = ''; 
      mostrarTarefas(tarefa);
    }
  }
function mostrarTarefas(tarefa){
    principal.insertAdjacentHTML(
        "beforeend",
        `
        <div class="obj">
                <input type="checkbox" class="checkbox" onclick="barrinha()">
                <input type="text" class="en" value=${tarefa} disabled>
                <button onclick="edita(this.parentElement)"">editar</button>
                <button onclick="exclui(this.parentElement)"">excluir</button>
            </div>
        `
    )
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
    if (x.disabled){
        x.disabled = false
    }
    else{
        x.disabled = true
    }
}
function exclui(){}

