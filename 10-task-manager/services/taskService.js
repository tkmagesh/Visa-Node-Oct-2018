var taskList = [
	{id : 1, name : 'Learn JavaScript', isCompleted : false},
	{id : 2, name : 'Explore Bangalore', isCompleted : true}
];

var taskService = {
	getAll(){
		return taskList;
	},
	get(taskId){
		var task = taskList.find(function(task){
			return task.id === taskId;
		});
		if (task){
			return task;
		} else {
			throw new Error('Task Not Found');
		}
	},
	addNew(taskData){
		taskData.id = taskList.reduce(function(result, task){
			return result > task.id ? result : task.id;
		}, 0) + 1;
		taskList.push(taskData);
		return taskData;
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