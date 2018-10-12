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
	taskService.addNew(newTask);
	res.status(201).json(newTask);
});

router.put('/:id', function(req, res, next){
	var updatedTask = req.body,
		taskIdToUpdate = parseInt(req.params.id);
	try{
		taskService.update(taskIdToUpdate, updatedTask);
		res.status(200).json(updatedTask);
	} catch(err) {
		res.sendStatus(404);
	}
});

router.delete('/:id', function(req, res, next){
	var taskIdToDelete = parseInt(req.params.id);
	try{
		taskService.remove(taskIdToDelete);
		res.sendStatus(200);
	} catch(err) {
		res.sendStatus(404);
	}
});


module.exports = router;