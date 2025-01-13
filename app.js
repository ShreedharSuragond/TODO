let add_icon = document.getElementById('add_icon')
let todo_inp = document.getElementById('todo_inp')
let todo_list = document.querySelector('.todo_list')
let input_ = document.querySelector('#todo_inp>input')
let add_inp_btn = document.querySelector('#add_inp_btn')
let edit_position;

function renderItems(array) {
    let todo_list = document.querySelector('.todo_list')
    todo_list.innerHTML = ''
    array.forEach((item, idx) => {
        let todo_item = document.createElement('div')
        todo_item.setAttribute('class', 'todo_items')
        todo_item.innerHTML = `
        <div class="todo_num">${idx + 1}</div>
        <p>${item}</p>
        <i class="fa-regular fa-pen-to-square edit_icon" data-id="${idx}"></i>
        <i class="fa-regular fa-trash-can del_icon" data-id="${idx}"></i>
    `
        todo_list.appendChild(todo_item)
    });
}

let getData = JSON.parse(localStorage.getItem('todo') || '["Welcome to Todo App"]')
renderItems(getData)

function openInput() {
    todo_inp.style.visibility = 'visible'
    todo_list.style.opacity = '0.2'
    add_inp_btn.setAttribute('onclick', 'addData()')
    add_inp_btn.innerHTML = 'ADD'
}

function closeInput() {
    todo_inp.style.visibility = 'hidden'
    todo_list.style.opacity = '1'
    input_.value = ''
}

function addData() {
    let inp = input_.value
    if (inp != '') {
        let arr = getData
        arr.push(inp)
        storeData(arr)
    }
    closeInput()
}

function updateData() {
    let arr = getData
    arr.splice(edit_position, 1, input_.value)
    storeData(arr)
    closeInput()
}

function storeData(array) {
    localStorage.setItem('todo', JSON.stringify(array))
    renderItems(array)
}



function del_edit(e) {
    let index = e.target.dataset.id
    if (e.target.classList.contains('del_icon')) {
        let arr = getData
        arr.splice(index, 1)
        storeData(arr)
        return
    } else if (e.target.classList.contains('edit_icon')) {
        let od = document.querySelectorAll('.todo_items>p')[index];
        input_.value = od.innerHTML
        edit_position = index;
        todo_inp.style.visibility = 'visible'
        todo_list.style.opacity = '0.2'
        add_inp_btn.setAttribute('onclick', 'updateData()')
        add_inp_btn.innerHTML = 'Update'
    }
}


 