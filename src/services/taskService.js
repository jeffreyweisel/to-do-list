export const getAllTasks = () => {
    return fetch('http://localhost:8088/tasks').then((response) => response.json())
  }
  
  //function that posts saved task to database
  export const saveTask = async (task) => {
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    }
  
    return await fetch("http://localhost:8088/tasks", postOptions)
  }
  
  //function that puts saved task to either complete or incomplete depending on button that is pressed
  export const putListItems = async (task) => {
    const putOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    }
  
    return await fetch(`http://localhost:8088/tasks/${task.id}`, putOptions)
  }
  
  //function that deletes task from database when delete button is pressed
  export const deleteListItem = async (task) => {
    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
      
    }
    return await fetch(`http://localhost:8088/tasks/${task.id}`, deleteOptions)
  
  }