const express = require('express')
const router = express.Router()
const TodoItem = require('../models/todo_item')

// get all
router.get('/', async(req, res) => {
  try {
    const todoItems = await TodoItem.find();
    res.json(todoItems);
  } catch (error) {
    res.status(500).json({ message: err.message })
  }
})

// get one
router.get('/:id', getTodoItem,  (req, res) => {
  res.json(res.todoItem)
})

// creating one
router.post('/', async(req, res) => {
  const todoItem = new TodoItem ({
    text: req.body.text
  })
  try {
    const newTodoItems = await todoItem.save();
    res.json(newTodoItems);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// update one
router.patch('/:id', getTodoItem, async(req, res) => {
  if (req.body.text !== null) {
    res.todoItem.text = req.body.text;
  }
  if (req.body.isDone !== null) {
    res.todoItem.isDone = req.body.isDone;
  }
  try {
    const updatedTodoItem = await res.todoItem.save();
    res.json(updatedTodoItem);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// delete one
router.delete('/:id', getTodoItem, async(req, res) => {
  try {
    await res.todoItem.remove()
    res.json({ message: 'Successfully deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// get item by id Middleware
async function getTodoItem(req, res, next) {
  let todoItem
  try {
    todoItem = await TodoItem.findById(req.params.id)
    if (todoItem === null) {
      return res.status(404).json({ message: `Can not find todo item id: ${req.params.id}` })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }

  res.todoItem = todoItem;
  next()
}

module.exports = router
