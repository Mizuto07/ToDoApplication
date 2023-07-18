const $form = document.getElementById('form');
const $input = document.getElementById('input');
const ul = document.getElementById('ul')

const todos = JSON.parse(localStorage.getItem('todos'));





// 入力をtodoリストへ
const add = (todo) => { // ひとつずつ処理する
    // console.log($input.value);
    let todoText = $input.value;

    if (todo) { 
        todoText = todo.text;
    };

    if (todoText) { // inputtextが入力されていたら
        const li = document.createElement('li');
        li.innerText = todoText;
        li.classList.add('list-group-item');

        if (todo && todo.completed) {
            li.classList.add('text-decoration-line-through');
        }

        li.addEventListener('contextmenu', (e) => { // 右クリック押されたら
            e.preventDefault();
            li.remove();
            saveData();
        });

        li.addEventListener('click', () => {
            li.classList.toggle('text-decoration-line-through'); // 打消し線をひく
            saveData()
        });

        ul.appendChild(li);
        input.value = ''
        saveData();
    };
    
};

// todoリストをローカルストレージへ保存
const saveData = () => {
    const lists = document.querySelectorAll('li'); // liタグから全部取ってくる
    let todos = [];
    lists.forEach(list => {
        let todo = {
            text: list.innerText,
            completed: list.classList.contains('text-decoration-line-through')
        };
        todos.push(todo);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
    // console.log(lists);
}

// すでにtodoがあれば順にリストへ追加
if (todos) {
    todos.forEach(todo => {
        add(todo);
    })
}

// formにエンターが押されたら
$form.addEventListener('submit', (event) =>{
    event.preventDefault(); // submitを押されてページがリロードされるのを防ぐ
    console.log($input.value);
    add();
});



