const express = require('express')
const router = express.Router()
const TodoItem = require('../models/todo_item')
const User = require('../models/user')
const { ensureAuth } = require('../middleware/auth')

// get all lists
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

// delete todoList
// ...

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

// update todoItem
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

// change places todoItems
router.patch('/swap-items', ensureAuth, async(req, res) => {
  try {
    const listIndex1 = req.body.listIndex1;
    const itemIndex1 = req.body.itemIndex1;
    const listIndex2 = req.body.listIndex2;
    const itemIndex2 = req.body.itemIndex2;

    console.log(listIndex1)
    console.log(itemIndex1)
    console.log(listIndex2)
    console.log(itemIndex2)

    if (listIndex1 === listIndex2) {
      let temp = req.user.todoLists[listIndex1][itemIndex1];
      req.user.todoLists[listIndex1][itemIndex1] = req.user.todoLists[listIndex1][itemIndex2];
      req.user.todoLists[listIndex1][itemIndex2] = temp;
    }

    console.log(req.user.todoLists[listIndex1]);

    req.user.markModified("todoLists");

    const updatedTodoList = await req.user.save();
    res.json(updatedTodoList.todoLists);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// delete todoItem
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

module.exports = router
