const express = require('express')
const router = express.Router()
const TodoItem = require('../models/todo_item')
const User = require('../models/user')
const { ensureAuth } = require('../middleware/auth')

// get all
router.get('/', ensureAuth, async(req, res) => {
  try {
    res.json(req.user.todoLists);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// creating todoList
router.post('/add-list', ensureAuth, async(req, res) => {
  try {
    req.user.todoLists.push([]);
    const updatedTodoList = await req.user.save();
    res.json(updatedTodoList.todoLists);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// creating todoItem
router.post('/:listIndex/add-item', ensureAuth, async(req, res) => {
  try {
    const text = req.body.text;
    if (!text) {
      return res.status(404).json({ message: 'Text field is required' })
    }

    const listIndex = req.params.listIndex;

    req.user.todoLists[listIndex].push({
      text,
      isDone: false
    });

    req.user.markModified("todoLists");

    const updatedTodoList = await req.user.save();
    res.json(updatedTodoList.todoLists);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// update one
router.patch('/:listIndex/:itemIndex', ensureAuth, async(req, res) => {
  try {
    const listIndex = req.params.listIndex;
    const itemIndex = req.params.itemIndex;
    const text = req.body.text;
    const isDone = req.body.isDone;

    if (text?.length) {
      req.user.todoLists[listIndex][itemIndex].text = text;
    }
    if (typeof isDone === "boolean") {
      req.user.todoLists[listIndex][itemIndex].isDone = isDone;
    }

    req.user.markModified("todoLists");

    const updatedTodoList = await req.user.save();
    res.json(updatedTodoList.todoLists);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// delete one
router.delete('/:listIndex/delete-item/:itemIndex', ensureAuth, async(req, res) => {
  try {
    const listIndex = req.params.listIndex;
    const itemIndex = req.params.itemIndex;

    req.user.todoLists[listIndex].splice(itemIndex, 1);

    req.user.markModified("todoLists");

    const updatedTodoList = await req.user.save();
    res.json(updatedTodoList.todoLists);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// get item by id Middleware
async function getTodoItem(req, res, next) {
  let todoItem
  // try {
  //   todoItem = await TodoItem.findById(req.params.id)
  //   if (todoItem === null) {
  //     return res.status(404).json({ message: `Can not find todo item id: ${req.params.id}` })
  //   }
  // } catch (err) {
  //   res.status(500).json({ message: err.message })
  // }
  //
  // res.todoItem = todoItem;

  next()
}

module.exports = router
