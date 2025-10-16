import './style.scss'
import ToDoItem from './toDoItem/toDoItem.js'
import { toDoStorage } from './utils/storage'

const form = document.querySelector('.form')
const list = document.querySelector('.list')
const input = form.querySelector('.form__input')

document.addEventListener('DOMContentLoaded', () => {
  const currentList = toDoStorage.getAll()

  if (currentList && currentList.length > 0) {
    currentList.forEach(item => {
      const newItem = new ToDoItem(item.id, item.task, item.doneStatus, false)
      list.append(newItem.domEl)
    })
  }
})

form.addEventListener('submit', e => {
  e.preventDefault()
  const value = input.value
  if (value) {
    const item = new ToDoItem(null, value, false, true)
    list.append(item.domEl)
    input.value = ''
  } else {
    form.classList.add('form--error')
  }
})

input.addEventListener('input', () => {
  form.classList.remove('form--error')
})
