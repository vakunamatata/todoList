
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const showAllButton = document.getElementById('showAllButton');
const showCompletedButton = document.getElementById('showCompletedButton');
const showPendingButton = document.getElementById('showPendingButton');

let tasks = [];
// добавление задачи
addTaskButton.addEventListener('click', () => {
   const taskName = taskInput.value.trim();

   if (!taskName) {
         alert('название задачи не может быть пустым');
         return;
     }

     tasks.push({ text: taskName, completed: false });
     taskInput.value = '';
     displayTasks();
   });
// отображение задачи
   function displayTasks(filter = 'all') {
      taskList.innerHTML = '';
      const filteredTasks = tasks.filter(task => {
          if (filter === 'completed') return task.completed;
          if (filter === 'pending') return !task.completed;
          return true; 
      });

   filteredTasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.textContent = task.text;
      if (task.completed) {
          li.style.textDecoration = 'line-through';
          li.style.color = 'gray';
      }

      li.addEventListener('click', () => {
          task.completed = !task.completed;
          displayTasks(filter);
      });
// редактирование
      li.addEventListener('dblclick', () => {
          const newText = prompt('Редактировать задачу:', task.text);
          if (newText) {
              task.text = newText;
              displayTasks(filter);
          }
      });
    //   удаление
      const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation(); 
            tasks.splice(index, 1);
            displayTasks(filter);
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
};
showAllButton.addEventListener('click', () => displayTasks('all'));
showCompletedButton.addEventListener('click', () => displayTasks('completed'));
showPendingButton.addEventListener('click', () => displayTasks('pending'));

displayTasks('all');