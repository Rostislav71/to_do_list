
let   ul = document.querySelector('.list__body');

let inputSomthing = document.querySelector('.input__somthing');

let btnAdd = document.querySelector('.add'),
    btnClose = document.querySelector('.close__btn');
    check = document.querySelector('.check');

let err = document.querySelector('.err');    

let listItemArr = [];

// function fonList(){
//     for(let i = 0 ; i < listItem.length; i++){
//         if( i % 2 == 0){
//             list.style.backgroundColor = '#eee';
//         }
//     }
// }
// fonList();

let listArr = [];

if(localStorage.getItem('todo')){
    listArr = JSON.parse(localStorage.getItem('todo'));
    displayMessage();
}



function displayMessage(){

    displayList = '';
    if(listArr.length === 0 ){
        ul.innerHTML = '';
    }
    listArr.forEach(function(item , i){
        displayList += `
        <li class = "list__item ${item.checker ? 'checked' : '' }">
           <input onclick = "completedTask(${i})" type = "checkbox" class = "check" id = "item_${i}" ${item.checker ? 'checked' : '' }  >
           <label for = "item_${i}">${item.todo}</label>
           <button onclick = "deleteTask(${i})" class = "close__btn">X</button>
        </li>
      `
      ul.innerHTML = displayList;
      listItemArr = document.querySelectorAll('.list__item');
    });
}

btnAdd.addEventListener('click' , () =>{
    if(inputSomthing.value == ''){
        err.innerHTML = "empty field";
       inputSomthing.style.border = "1px solid rgb(180, 13, 13)";
    }
    else{
        let newList = {
            todo: inputSomthing.value,
            checker: false
        };
        inputSomthing.style.border = "none";
        err.innerHTML = "";
        
        listArr.unshift(newList);
        displayMessage();
        localStorage.setItem('todo' , JSON.stringify(listArr));
        inputSomthing.value = '';
        
        
    }
});
const deleteTask = index => {
    listArr.forEach(function(item , i){  
     
        listArr.splice(index , 1);
        localStorage.setItem('todo' , JSON.stringify(listArr));
        displayMessage();
        
    
    });
}

const completedTask = i => {
   listArr[i].checker = !listArr[i].checker;
    if(listArr[i].checker){
        listItemArr[i].classList.add('checked');
    }
    else{
        listItemArr[i].classList.remove('checked');
    }
     localStorage.setItem('todo' , JSON.stringify(listArr));
     displayMessage();
}
