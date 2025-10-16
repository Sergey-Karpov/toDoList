import { toDoStorage } from '../utils/storage'

export default class ToDoItem {
  constructor(id = null, task, doneStatus = false, isNew = false) {
    this.task = task
    this.id = id ? id : crypto.randomUUID()
    this.doneStatus = doneStatus
    this.isNew = isNew
    this.domEl = this.#init()
    this.btnChangeStatus
    this.btnRemove
    this.btnEdit
    this.editTaskInput

    this.#updateVisualState()
  }

  #init() {
    const toDoItemEl = document.createElement('li')
    toDoItemEl.classList.add('toDoItem')

    const toDoItemTitle = document.createElement('h2')
    toDoItemTitle.classList.add('toDoItem__title')
    toDoItemTitle.textContent = this.task

    const toDoItemActions = document.createElement('div')
    toDoItemActions.classList.add('toDoItem__actions')

    // edit form
    const editForm = document.createElement('form')
    editForm.classList.add('toDoItem__editForm')
    const editInput = document.createElement('input')
    this.editTaskInput = editInput
    editInput.classList.add('input')
    editInput.type = 'text'
    editInput.name = 'edit-input'

    // save changes btn
    const saveChangesBtn = document.createElement('button')
    saveChangesBtn.textContent = 'сохранить'
    saveChangesBtn.addEventListener('click', e => {
      e.preventDefault()
      this.domEl.classList.remove('toDoItem--edit')
      this.#saveChanges()
    })
    editForm.append(editInput, saveChangesBtn)

    // change status btn
    const toDoItemChangeStatus = document.createElement('button')
    toDoItemChangeStatus.classList.add('toDoItem__btn')
    toDoItemChangeStatus.textContent = 'выполнить'
    this.btnChangeStatus = toDoItemChangeStatus
    this.btnChangeStatus.addEventListener('click', () => {
      this.#changeStatus()
    })

    // edit task text btn
    const toDoItemEdit = document.createElement('button')
    toDoItemEdit.classList.add('toDoItem__btn')
    toDoItemEdit.textContent = 'редактировать'
    this.btnEdit = toDoItemEdit
    this.btnEdit.addEventListener('click', () => {
      this.#editTaskText()
    })

    // remove item btn
    const toDoItemRemove = document.createElement('button')
    toDoItemRemove.classList.add('toDoItem__btn')
    toDoItemRemove.textContent = 'удалить'
    this.btnRemove = toDoItemRemove
    this.btnRemove.addEventListener('click', () => {
      this.#removeItem()
    })

    toDoItemActions.append(toDoItemChangeStatus, this.btnEdit, toDoItemRemove)
    toDoItemEl.append(toDoItemTitle, editForm, toDoItemActions)

    console.log(this.isNew)
    if (this.isNew) {
      toDoStorage.save({
        id: this.id,
        task: this.task,
        doneStatus: this.doneStatus
      })
    }

    return toDoItemEl
  }

  #updateVisualState() {
    if (this.doneStatus) {
      this.domEl.classList.add('toDoItem--done')
      this.btnChangeStatus.textContent = 'вернуть'
    } else {
      this.domEl.classList.remove('toDoItem--done')
      this.btnChangeStatus.textContent = 'выполнить'
    }
  }

  #changeStatus() {
    this.doneStatus = !this.doneStatus
    this.#updateVisualState()
    toDoStorage.changeStatus(this.id)
  }

  #editTaskText() {
    this.domEl.classList.add('toDoItem--edit')
    this.editTaskInput.value = this.task
  }

  #saveChanges() {
    const newTaskText = this.editTaskInput.value.trim()
    if (newTaskText) {
      this.task = newTaskText
      this.domEl.querySelector('.toDoItem__title').textContent = this.task
      toDoStorage.updateTask(this.id, this.task)
    }
  }

  #removeItem() {
    toDoStorage.remove(this.id)
    this.domEl.classList.add('toDoItem--remove')
    setTimeout(() => {
      this.domEl.remove()
    }, 300)
  }
}
