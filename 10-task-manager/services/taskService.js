var taskList = [
	{id : 1, name : 'Learn JavaScript', isCompleted : false},
	{id : 2, name : 'Explore Bangalore', isCompleted : true}
];

var taskService = {
	getAll(){
		return taskList;
	},
	get(id){
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
		
	}
};

module.exports = taskService;