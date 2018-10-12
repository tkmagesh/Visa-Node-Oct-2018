var taskDb = require('../data/taskDb');

var taskService = {
	getAll(callback){
		taskDb.getData(callback);
	},
	get(taskId){
		taskDb.getData(function(err, taskList){
			var task = taskList.find(function(task){
				return task.id === taskId;
			});
			if (task){
				callback(null, task);
			} else {
				callback( new Error('Task Not Found'));
			}
		});
		
	},
	addNew(taskData, callback){
		taskDb.getData(function(err, taskList){
			if (err){
				callback(err);
				return;
			}
			taskData.id = taskList.reduce(function(result, task){
				return result > task.id ? result : task.id;
			}, 0) + 1;
			taskList.push(taskData);
			taskDb.saveData(taskList, function(err){
				if (err){
					callback(err);
					return;
				}
				callback(null, taskData);
			});
			
		});
		
	},
	update(taskIdToUpdate, updatedTask){
		var existingTask = taskList.find(function(task){
			return task.id === taskIdToUpdate;
		});
		if (existingTask){
			taskList = taskList.map(function(task){
				return task.id === taskIdToUpdate ? updatedTask : task;
			});
			return updatedTask;
		} else {
			throw new Error('Task Not Found');
		}
	},
	remove(taskIdToDelete){
		var existingTask = taskList.find(function(task){
			return task.id === taskIdToDelete;
		});
		if (existingTask){
			taskList = taskList.filter(function(task){
				return task.id !== taskIdToDelete;
			});
		} else {
			throw new Error('Task Not Found');
		}
	}

};

module.exports = taskService;