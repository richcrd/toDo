// Info de Fechas
const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

// Contenedor de Tareas
const tasksContainer = document.getElementById('tasksContainer');

// Seteadores de la info de fechas
const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
    dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
    dateMonth.textContent = date.toLocaleString('es', { month: 'short' });
    dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};

// Función para crear un elemento de tarea con texto y botón de eliminar
function createTaskElement(value) {
    const task = document.createElement('div');
    task.classList.add('task', 'roundBorder');

    const taskTextContainer = document.createElement('div'); // Contenedor para el texto de la tarea
    taskTextContainer.classList.add('taskTextContainer');

    const taskText = document.createElement('span');
    taskText.textContent = value;
    taskText.classList.add('taskText');
    taskTextContainer.appendChild(taskText);

    task.appendChild(taskTextContainer);

    const deleteButton = createDeleteButton(task);
    task.appendChild(deleteButton);

    task.addEventListener('click', () => toggleTaskState(task));
    return task;
}

// Función para crear un botón de eliminar y asignarle un manejador de eventos
function createDeleteButton(task) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('deleteButton');
    deleteButton.addEventListener('click', () => deleteTask(task));
    return deleteButton;
}

// Función para añadir una tarea al contenedor
function addTaskToContainer(task) {
    tasksContainer.prepend(task);
}

// Función para añadir una nueva tarea desde el formulario
const addNewTask = event => {
    event.preventDefault(); // Evita que el formulario se envíe
    const { value } = event.target.elements.taskText; // Obtiene el valor del campo de texto
    if (!value) return; // Si no hay valor, retorna sin hacer nada

    // Verifica si la tarea cumple con el mínimo de caracteres
    if (value.length < 3) {
        alert('La tarea debe tener al menos 3 caracteres.');
        return;
    }

    // Verifica si ya hay 10 tareas y muestra un mensaje si se excede
    if (tasksContainer.children.length >= 10) {
        alert('¡No se pueden agregar más de 10 tareas!');
        return;
    }

    // Crea un elemento de tarea y lo añade al contenedor
    const task = createTaskElement(value);
    addTaskToContainer(task);
    event.target.reset(); // Reinicia el formulario
};

// Función para cambiar el estado de una tarea (completada/no completada)
const toggleTaskState = task => {
    task.classList.toggle('done'); // Alterna la clase 'done'
};

// Función para eliminar una tarea del contenedor
const deleteTask = task => {
    tasksContainer.removeChild(task); // Elimina la tarea del contenedor
};

// Función para obtener un arreglo ordenado de tareas
const getOrderedTasks = () => {
    const done = [];
    const toDo = [];
    tasksContainer.childNodes.forEach(el => {
        el.classList.contains('done') ? done.push(el) : toDo.push(el);
    });
    return [...toDo, ...done];
};

// Función para renderizar las tareas ordenadas en el contenedor
const renderOrderedTasks = () => {
    getOrderedTasks().forEach(el => tasksContainer.appendChild(el));
};

// Configura la fecha y muestra las tareas existentes
setDate();