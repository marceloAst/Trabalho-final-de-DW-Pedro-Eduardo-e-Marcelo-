let temtudo = document.querySelector(".temtudo")
let principal = document.querySelector(".principal")
let secundaria = document.querySelector(".secundaria")
let buttonclick = document.getElementById("click")
let input = document.getElementById("input")
let isCtrl = false
let isH = false
let studentsList = document.getElementById('studentsList')
let closeStudentsList = document.getElementById('closeStudentsList')
if(!localStorage.getItem('tarefas')){
    localStorage.setItem('tarefas',JSON.stringify({tarefas:[]}))
}else{
    console.log(localStorage.getItem('tarefas'))
    for (const elem of JSON.parse(localStorage.getItem('tarefas')).tarefas) {
        principal.insertAdjacentHTML(
            "beforeend",
            `
            <div class="obj ${elem.concluido?'concluido':''}" ${elem.concluido?'style="order: 1"':''}>
                    <input type="checkbox" class="checkbox" onclick="barrinha(this.parentElement)" ${elem.concluido?'checked':''}>
                    <p class="en" onclick="barrinha(this.parentElement,true)" contenteditable="false">${elem.tarefa}</p>
                    <button onclick="edita(this.parentElement)"">editar</button>
                    <button onclick="exclui(this.parentElement)"">excluir</button>
                </div>
            `
        )
    }
    barrinha()

}
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


input.addEventListener("keypress",(event)=>{
    if(event.keyCode===13){
        adicionarNovaTarefa()
    }
})
function adicionarNovaTarefa() {
    mostrarad()
    const tarefa = input.value;
    if (tarefa) {
        console.log(localStorage.getItem('tarefas'))
        let newArray = JSON.parse(localStorage.getItem('tarefas')).tarefas
        newArray.unshift({tarefa: tarefa, concluido: false})
        localStorage.setItem('tarefas',JSON.stringify({tarefas: newArray}))
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
                <p class="en" onclick="barrinha(this.parentElement,true)" contenteditable="false">${tarefa}</p>
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
        window.addEventListener('mousedown',()=>{
            if(event.srcElement.parentElement!=el){
                x.contentEditable = false
                let newArray = JSON.parse(localStorage.getItem('tarefas')).tarefas.map((element,i)=>{
                    if(i===Array.prototype.indexOf.call(principal.querySelectorAll('.obj'),el)){
                        console.log(Array.prototype.indexOf.call(principal.querySelectorAll('.obj'),el), i)
                        element.tarefa=x.innerHTML
                    }
                    return element
                })
                localStorage.setItem('tarefas',JSON.stringify({tarefas:newArray}))
            }
        })
    }
    else{
        x.contentEditable = false
        let newArray = JSON.parse(localStorage.getItem('tarefas')).tarefas.map((element,i)=>{
            if(i===Array.prototype.indexOf.call(principal.querySelectorAll('.obj'),el)){
                console.log(Array.prototype.indexOf.call(principal.querySelectorAll('.obj'),el), i)
                element.tarefa=x.innerHTML
            }
            return element
        })
        localStorage.setItem('tarefas',JSON.stringify({tarefas:newArray}))

    }
}
function exclui(elem){
    console.log(Array.prototype.indexOf.call(principal.querySelectorAll('.obj'),elem))
    let newArray = JSON.parse(localStorage.getItem('tarefas')).tarefas.filter((el,i)=>{
        if(i===Array.prototype.indexOf.call(principal.querySelectorAll('.obj'),elem)){
            console.log(i+', '+Array.prototype.indexOf.call(principal.querySelectorAll('.obj'),elem))
            console.log()
            console.log(el)
            return
        }
        return el
    })
    localStorage.setItem('tarefas',JSON.stringify({tarefas:newArray}))
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

function barrinha(element=false,switchs=false) {
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


barrinha()