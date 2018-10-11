var express = require('express');
var router = express.Router();

var taskService = require('../services/taskService');

router.get('/', function(req, res, next){
	res.json(taskService.getAll());
});

router.get('/:id', function(req, res, next){
	var taskId = parseInt(req.params.id);
	try{
		var task = taskService.get(taskId);
		res.json(task);
	} catch (err) {
		res.sendStatus(404);
	}
});

router.post('/', function(req, res, next){
	var newTask = req.body;
	newTask.id = taskList.reduce(function(result, task){
		return result > task.id ? result : task.id;
	}, 0) + 1;
	taskList.push(newTask);
	res.status(201).json(newTask);
});

router.put('/:id', function(req, res, next){
	var updatedTask = req.body,
		taskIdToUpdate = parseInt(req.params.id);
	var existingTask = taskList.find(function(task){
		return task.id === taskIdToUpdate;
	});
	if (existingTask){
		taskList = taskList.map(function(task){
			return task.id === taskIdToUpdate ? updatedTask : task;
		});
		res.status(200).json(updatedTask);
	} else {
		res.sendStatus(404);
	}
})

router.delete('/:id', function(req, res, next){
	var taskIdToDelete = parseInt(req.params.id);
	var existingTask = taskList.find(function(task){
		return task.id === taskIdToDelete;
	});
	if (existingTask){
		taskList = taskList.filter(function(task){
			return task.id !== taskIdToDelete;
		});
		res.sendStatus(200);
	} else {
		res.sendStatus(404);
	}
})


module.exports = router;