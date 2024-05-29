const Task = require("../model/task");

const taskController ={};

taskController.createTask =async (req,res) => {

    try {
        const {task,isComplete} = req.body;
        const {userId} = req
        const newTask = new Task({task,isComplete,author: userId});
        await newTask.save();
        res.status(200).json({status:'OK',data: newTask});

    } catch(err) {
        res.status(400).json({status:'Fail',error : err});
    }
};

taskController.getTask= async(req,res) => {

    try{
        const taskList = await Task.find({}).select("-__v").populate("author").select("-__v"); 
        res.status(200).json({status:'OK',data: taskList});

    } catch(err){
        res.status(400).json({status:'Fail',error : err});
    }
};

taskController.updateTask = async(req,res) =>{

    try{

        const { id } = req.params;
        const { isComplete } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(id, { isComplete }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Todo not found' });
          }
       await updatedTask.save();
        res.status(200).json({status:'OK',data: updatedTask});
        
    } catch(err){
        res.status(400).json({status:'Fail',error : err});
    }
}

 taskController.deleteTask = async (req, res) => {

    try {
          const { id } = req.params;
          const deleteItem = await Task.findByIdAndDelete(id);
          res.status(200).json({ status: "OK", data: deleteItem });

        } catch (error) {
          res.status(400).json({ status: "Fail", error });
        }
      };

module.exports = taskController;