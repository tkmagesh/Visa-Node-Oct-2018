var express = require('express');
var router = express.Router();

var taskService = require('../services/taskService');

router.get('/', function(req, res, next){
	taskService.getAll(function(err, taskList){
		if (err){
			res.sendStatus(500);
		} else {
			res.json(taskList);		
		}
	});
});

router.get('/:id', function(req, res, next){
	var taskId = parseInt(req.params.id);
	taskService.get(taskId, function(err, task){
		if (err){
			res.sendStatus(404);		
		} else {
			res.json(task);				
		}
	});

});

router.post('/', function(req, res, next){
	var newTask = req.body;
	taskService.addNew(newTask, function(err, task){
		if (err){
			res.sendStatus(500);
			return;
		}
		res.status(201).json(task);
	});
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