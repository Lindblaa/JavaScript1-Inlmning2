let todos = []

// Selectors
const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todo-input');
const output = document.querySelector('#todoDiv');
const invalidFeedback = document.querySelector('.invalid-feedback')



//Functions
const getJson = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
    todos = await res.json()
    // const data = await res.json()
    // todos = data;

    todoList();
    
    console.log(todos)
}

getJson();

const todoList = () => {
    output.innerHTML = ''
    todos.forEach(todo => {
            output.appendChild(createTodoElement(todo))
            
        })
    }



//Skapa nytt element/card

    const createTodoElement = todo => {
        
        //Parent till hela Todon.
        let card = document.createElement('div');
        card.classList.add('todo-output-group', 'container', 'd-flex');
        
        let title = document.createElement('p');
        title.classList.add('m-0', 'h4');
        title.innerText = todo.title
        
        //Parent-div till knapparna
        let buttons = document.createElement('div');
        buttons.classList.add('buttons');
        
        //Check- och delete-knappar
        let check = document.createElement('button');
        check.classList.add('btn', 'btn-success', 'btn-sm');
        check.innerText = '✓'
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteBtn.innerText = 'X'
        
        
        //Para ihop parents med childrens
        card.appendChild(title);
        card.appendChild(buttons);
        buttons.appendChild(check);
        buttons.appendChild(deleteBtn);
        
   
   //Check-knappens event och funktion
        check.addEventListener('click', () => {
            
            if(todo.completed = !todo.completed) {
                card.classList.add('todo-completed')
                checkTodo(todo)
            }

            else if(!todo.completed) {
                card.classList.remove('todo-completed')
                checkTodo(todo)
            }
        });
        


        function checkTodo(todo) {
            if(todo.completed){
                card.classList.add('todo-completed')
            }
        }


        
    //Delete-event
        deleteBtn.addEventListener('click', () => {
            if(todo.completed) {
                removeTodo(todo.id, card)
            }
        })
            checkTodo(todo);
            return card;
        
    }
    
 








//Delete-funktionen

function removeTodo(id, todo) {
    todos = todos.filter(todo => todo.id !== id)
    console.log(id)
    todoList()
    //Delete från "databasen"
    const deleteJson = async () => {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos/' + id, {
            method: 'DELETE',
            });

        if(!res.ok) {
            const message = 'Error with Status code: ' + res.status;
            throw new Error(message);
        }
        console.log(res)
        const data = await res.json();
    }
    catch (error) {
        console.log('Error: ' + err);
    }
            
    console.log(todos)
    }
    
    deleteJson()
    
}




const createNewTodo = title => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10', {
        method: 'POST',
        body: JSON.stringify({
            id: 1,
            title: todoInput.value,
            userId: Date.now().toString(),
        }),
    })
    .then(res => res.json())
    .then(data => {
        todos.unshift(data);
        todoList();
    })
}



//Event listeners
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if(todoInput.value !== ''){
        todoInput.classList.remove('is-invalid');
        const todo = {
            title: todoInput.value,
            userId: Date.now().toString(),
            completed: false
        }
        todos.push(todo);
        todoList();
        console.log(todos)
        todoInput.value = '';
    }
    else {
        todoInput.classList.add('is-invalid');
        todoInput.focus();
        console.log(todoInput.value)
        return false
    }
})

