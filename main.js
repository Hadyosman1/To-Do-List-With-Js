document.title = 'To Do App';
//get elements
let inputToDo = document.querySelector('.form input');
let btnAdd = document.querySelector('.form button');
let TasksDiv = document.querySelector('.tasks');
//==========================

let tasksRepo ; 
if (window.localStorage.getItem('tasks') != null) {
    tasksRepo = JSON.parse(localStorage.getItem('tasks')); 
}else{
    tasksRepo = [] ; // to store the data from input
}



if (tasksRepo.length == 0) {
    TasksDiv.innerHTML= `
    <p class='empty'> There is not any task yet     </p>
    `;
    let empty = document.querySelector(`.empty`);
    empty.onclick = ()=>{
        inputToDo.focus()
    };
};
// ==========================


if (localStorage.getItem( "tasks" )) {
    tasksRepo.forEach((e,i) => {
       
        let task = document.createElement('div');
        let para = document.createElement('p');
        let btnDelete = document.createElement('button');
    // =======================================
        let delContent = document.createTextNode('delete');
        btnDelete.className ='delete-btn';
        task.className='task';
        para.style.paddingLeft ='10px';
        btnDelete.append(delContent);
        let toDoContent = document.createTextNode(`${i+1} ${e.text} `);   
        task.setAttribute('data-id', e.id);
    
        para.append(toDoContent );  
        task.append(para);
        task.append(btnDelete);
        if (e.isDone==true) {
            task.classList.add( "finished");
        }else{
            task.classList.remove( "finished");
        }
        TasksDiv.append(task)
    });
    
}

btnAdd.addEventListener('click',()=>{
    
    if (inputToDo.value.length > 1  ){
        let val = inputToDo.value;

        let task ={
            id:Date.now() ,
            text:val,
            isDone:false
        };
        
        tasksRepo.push(task);
        
        window.localStorage.setItem('tasks', JSON.stringify(tasksRepo));
        inputToDo.value='';
        window.location.reload();
    };

});

let deleteBtn =document.querySelectorAll('.delete-btn');
let task = document.querySelectorAll( '.task');

task.forEach((e)=>{
   e.addEventListener('click',(event)=>{
       let target = event.target ;

      
        if(target.classList.contains("delete-btn")){
            target.parentElement.remove();
            let id = target.parentElement.getAttribute('data-id') ;
            
            tasksRepo.forEach((ele,i)=>{
                if(ele.id == id){
                    tasksRepo.splice(i,1);
                    window.localStorage.setItem('tasks', JSON.stringify(tasksRepo));
                    window.location.reload();
                };
            });

        }    
   });
});

task.forEach((e)=>{
    e.addEventListener('click', (event)=>{

    let target = event.currentTarget;
    id=target.dataset.id; 

        tasksRepo.forEach((ele)=>{
            
            if (ele.id == id ) {
                target.classList.toggle('finished');
                    if (target.classList.contains('finished')) {
                        ele.isDone = true;
                    }else{
                        ele.isDone = false;
                        
                    }
                localStorage.setItem('tasks',JSON.stringify(tasksRepo));
            }
            
        })
    })
})