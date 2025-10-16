export const toDoStorage = {
  save(task) {
    console.log(task)
    try {
      let currentList = this.getAll()

      if (currentList && currentList.length > 0) {
        currentList.push(task)
        localStorage.setItem('todo-list', JSON.stringify(currentList))
      } else {
        currentList = [task]
        localStorage.setItem('todo-list', JSON.stringify(currentList))
      }
      return true
    } catch (e) {
      console.error('Ошибка сохранения: ', e)
      return false
    }
  },

  changeStatus(taskId) {
    try {
      const currentList = this.getAll()
      const currentTask = currentList.find(item => item.id === taskId)
      if (currentTask) {
        currentTask.doneStatus = !currentTask.doneStatus
        localStorage.setItem('todo-list', JSON.stringify(currentList))
        return true
      }
      return false
    } catch (e) {
      console.error('Ошибка изменения статуса: ', e)
      return false
    }
  },

  remove(taskId) {
    try {
      const currentList = this.getAll()
      const updateList = currentList.filter(item => item.id !== taskId)
      localStorage.setItem('todo-list', JSON.stringify(updateList))
      return true
    } catch (e) {
      console.error('Ошибка удаления задачи: ', e)
      return false
    }
  },

  getAll() {
    try {
      const currentList = localStorage.getItem('todo-list')
      return currentList ? JSON.parse(currentList) : []
    } catch (e) {
      console.error('Ошибка получения данных: ', e)
      return []
    }
  },

  updateTask(taskId, newTaskText) {
    try {
      const currentList = this.getAll()
      const currentTask = currentList.find(item => item.id === taskId)
      if (currentTask) {
        currentTask.task = newTaskText
        localStorage.setItem('todo-list', JSON.stringify(currentList))
        return true
      }
      return false
    } catch (e) {
      console.error('Ошибка обновления задачи: ', e)
      return false
    }
  }
}
