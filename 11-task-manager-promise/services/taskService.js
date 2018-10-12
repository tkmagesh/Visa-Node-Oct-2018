const taskDb = require('../data/taskDb');

const taskService = {
	getAll(){
		return taskDb.getData();
	},
	get(taskId){
		return taskDb
			.getData()
			.then(taskList => {
				var task = taskList.find( task => task.id === taskId);
				if (task){
					return task;
				} else {
					throw new Error('Task Not Found');
				}
			});		
	},
	/*addNew(taskData){
		return taskDb
			.getData()
			.then(taskList => {
				taskData.id = taskList.reduce((result, task) => result > task.id ? result : task.id, 0) + 1;
				taskList.push(taskData);
				return taskList;
			})
			.then( taskList => taskDb.saveData(taskList))
			.then(_ => taskData);
	},*/
	async addNew(taskData){
		let taskList = await taskDb.getData();
		taskData.id = taskList.reduce((result, task) => result > task.id ? result : task.id, 0) + 1;
		taskList.push(taskData);
		await taskDb.saveData(taskList)
		return taskData;
	},
	async update(taskIdToUpdate, updatedTask){
		let taskList = await taskDb.getData();
		let existingTask = taskList.find( task => task.id === taskIdToUpdate);
		if (existingTask){
			taskList = taskList.map(task => task.id === taskIdToUpdate ? updatedTask : task);
			await taskDb.saveData(taskList);
			return updatedTask;		
		} else {
			throw new Error('Task Not Found');
		}	
	},
	remove(taskIdToDelete){
		return taskDb
			.getData()
			.then(function(taskList){
				var existingTask = taskList.find(function(task){
					return task.id === taskIdToDelete;
				});	
				if (existingTask){
					taskList = taskList.filter(function(task){
						return task.id !== taskIdToDelete;
					});
					return taskDb.saveData(taskList);
				} else {
					throw new Error('Task Not Found');
				}	
			});
		
	}

};

module.exports = taskService;