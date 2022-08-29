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
router.patch('/:list/:id', ensureAuth, async(req, res) => {
  const todoItem = req.user.todoLists[req.params.list][req.params.id];

  if (todoItem === undefined) {
    return res.status(404).json({ message: 'The todo item is not found' })
  }

  if (req.body.text !== null) {
    todoItem.text = req.body.text;
  }
  if (req.body.isDone !== null) {
    todoItem.isDone = req.body.isDone;
  }

  // сохранить в БД

  // if (req.body.text !== null) {
  //   res.todoItem.text = req.body.text;
  // }
  // if (req.body.isDone !== null) {
  //   res.todoItem.isDone = req.body.isDone;
  // }
  // try {
  //   const updatedTodoItem = await res.todoItem.save();
  //   res.json(updatedTodoItem);
  // } catch (err) {
  //   res.status(400).json({ message: err.message })
  // }
  const ress = res;
  const reqq = req;
  res.json({ hi: 'mom' });
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
