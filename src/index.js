document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('create-task-form');
  const taskList = document.getElementById('tasks');
  const sortSelect = document.getElementById('sort-priority');

  function createTask(event) {
    event.preventDefault(); 

    const taskInput = document.getElementById('new-task-description');
    const priorityInput = document.getElementById('task-priority');
    const dueDateInput = document.getElementById('due-date');

    const taskText = taskInput.value;
    const priorityValue = priorityInput.value;
    const dueDate = dueDateInput.value;

    const listItem = document.createElement('li');
    listItem.textContent = `${taskText} (Due: ${dueDate})`;
    listItem.style.color = getPriorityColor(priorityValue);
    listItem.setAttribute('data-priority', priorityValue);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(listItem));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', () => {
      listItem.remove();
    });

    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);

    taskInput.value = '';
    priorityInput.value = 'low'; 
    dueDateInput.value = '';
    
    sortTasks(); 
  }

  function editTask(listItem) {
    const taskText = listItem.textContent.split(' (Due:')[0];
    const dueDate = listItem.textContent.split('(Due: ')[1].slice(0, -1);
    const priorityValue = listItem.getAttribute('data-priority');

    const taskInput = document.getElementById('new-task-description');
    const priorityInput = document.getElementById('task-priority');
    const dueDateInput = document.getElementById('due-date');

    taskInput.value = taskText;
    priorityInput.value = priorityValue;
    dueDateInput.value = dueDate;

    listItem.remove(); 
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'yellow';
      case 'low':
        return 'green';
      default:
        return 'black';
    }
  }

  function sortTasks() {
    const tasks = Array.from(taskList.children);
    tasks.sort((a, b) => {
      const priorityA = a.getAttribute('data-priority');
      const priorityB = b.getAttribute('data-priority');
      return (sortSelect.value === 'ascending') 
        ? priorityOrder(priorityA) - priorityOrder(priorityB)
        : priorityOrder(priorityB) - priorityOrder(priorityA);
    });
    taskList.innerHTML = ''; 
    tasks.forEach(task => taskList.appendChild(task));
  }

  function priorityOrder(priority) {
    switch (priority) {
      case 'high':
        return 3;
      case 'medium':
        return 2;
      case 'low':
        return 1;
      default:
        return 0;
    }
  }

  form.addEventListener('submit', createTask);
  sortSelect.addEventListener('change', sortTasks); 
});
