export const clearCompleted = (tasks) => tasks.filter((task) => !task.completed);

export const addTasktoList = (tasks, description) => {
  const newTask = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  return [...tasks, newTask];
};

export const deleteTask = (tasks, index) => tasks.filter((task) => task.index !== index);

export const editTaskDescription = (tasks, index, newDescription) => {
  const updatedTasks = [...tasks];
  updatedTasks[index] = { ...updatedTasks[index], description: newDescription };
  return updatedTasks;
};