const appContainer = document.querySelector('#todo');
const target = document.querySelector('#todo__list');
const input = document.querySelector('#todo__entry-input');
let todoArray = [];

const getEntry = () => {
    let value = input.value;
    if (!value.length) return;

    return value && value[0].toUpperCase() + value.slice(1);
}

const setEntry = (value) => {
    if (value === '' || value ==='0' || value === null) {
        return input.value = '';
    }
}

const setInputHint = (text) => {
    const hint = document.querySelector('#todo__entry-hint');

    hint.textContent = text;
}

const showHideList = (target) => {
    console.log(target.children.length);
    if (target.children.length < 0) {
        target.classList.add('hide');
    } else {
        target.classList.remove('hide')
    }
}

const createTodoItem = (text) => {
    const item = document.createElement('li');
    const btnHolder = document.createElement('div');
    const content = text;
    let items = target.querySelectorAll('li').length;

    item.className = 'todo__list-item';

    if (content) {
        item.id = items.toFixed();
        item.textContent = content;

        item.append(btnHolder);
        btnHolder.append(btnDone(item));
        btnHolder.append(btnRemove(item));

        setEntry(null);
    } else {
        return;
    }

    return item;
}

const btnDone = (item) => {
    const done = document.createElement('button');

    done.textContent = 'Done';
    done.className = 'todo__button todo__button--done';
    done.addEventListener('click', () => {
        todoArray = JSON.parse(localStorage.getItem(key));
        item.classList.toggle('todo__list-item--done');

        todoArray.map(obj => {
            if (obj.id === item.id && obj.finished === false) {
                obj.finished = true;
            } else {
                obj.finished = false;
            }
        });

        localStorage.setItem(key, JSON.stringify(todoArray));
    })

    return done;
}

const btnRemove = (item) => {
    const remove = document.createElement('button');

    remove.textContent = 'Remove';
    remove.className = 'todo__button todo__button--remove';
    remove.addEventListener('click', () => {
        let filtered;
        todoArray = JSON.parse(localStorage.getItem(key));

        filtered = todoArray.filter(i => i.id !== item.id);

        localStorage.setItem(key, JSON.stringify(filtered));
        item.remove();

        showHideList(target);
    })

    return remove;
}

const todoApp = (key) => {
    const form = document.querySelector('#todo__entry');
    let localData = localStorage.getItem(key);

    console.log(localData);
    if (localData) {
        todoArray = JSON.parse(localData);

        for (let i = 0; i < todoArray.length; i++) {
            let todoItem = createTodoItem(todoArray[i].msg);

            todoItem.id = todoArray[i].id;

            target.append(todoItem);
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let content = getEntry();

        if (content) {
            setInputHint('');

            let todoItem = createTodoItem(content);
            console.log(todoItem);
            let itemObj = {
                id: todoItem.id,
                finished: false,
                msg: content
            }

            todoArray.push(itemObj);
            localStorage.setItem(key, JSON.stringify(todoArray));

            showHideList(target);
            target.append(todoItem);
        }
        else {
            setInputHint('Enter your note');
        }


    });
}

