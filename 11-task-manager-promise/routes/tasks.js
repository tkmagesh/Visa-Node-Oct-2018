var express = require('express');
var router = express.Router();

var taskService = require('../services/taskService');

router.get('/', function(req, res, next){
	taskService
		.getAll()
		.then(function(taskList){
			res.json(taskList);
		})
		.catch(function(err){
			res.sendStatus(500);
		})
});

router.get('/:id', function(req, res, next){
	var taskId = parseInt(req.params.id);
	taskService
		.get(taskId)
		.then(function(task){
			res.json(task);
		})
		.catch(function(err){
			res.sendStatus(404);
		});
});

router.post('/', function(req, res, next){
	var newTask = req.body;
	taskService
		.addNew(newTask)
		.then(function(newTask){
			res.status(201).json(newTask)
		})
		.catch(function(){
			res.sendStatus(500);
		});
});

router.put('/:id', function(req, res, next){
	var updatedTask = req.body,
		taskIdToUpdate = parseInt(req.params.id);
	taskService
		.update(taskIdToUpdate, updatedTask)
		.then(function(updatedTask){
			res.status(200).json(updatedTask);
		})
		.catch(function(err){
			res.sendStatus(404);	
		});
	
});

router.delete('/:id', function(req, res, next){
	var taskIdToDelete = parseInt(req.params.id);
	taskService
		.remove(taskIdToDelete)
		.then(function(){
			res.sendStatus(200);	
		})
		.catch(function(err){
			res.sendStatus(404);	
		});
});


module.exports = router;