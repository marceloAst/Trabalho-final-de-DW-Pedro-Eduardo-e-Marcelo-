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