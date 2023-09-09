import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import React from 'react';
import './index.css';



class AddTask extends React.Component{
    constructor(props){
        super(props);
        this.state={
            taskDesc:''
        };
    }

    handleTaskTextChange(e){
        this.setState({
            taskDesc: e.target.value
        });
    }

    handleAddTaskClick(){
        this.props.HandlerToCollectTaskInfo(this.state.taskDesc);
            this.setState({
               taskDesc:''
            });
           

    }
    render(){
        return(
           <>
              <form>
                <input type='text' value={this.state.taskDesc} onChange={(e)=> this.handleTaskTextChange(e)} placeholder='enter task'/>
                <input type='button' value='add task' onClick={() => this.handleAddTaskClick()}/>
              </form>
           </>
        )
    }
}
class TaskList extends React.Component{
    handleTaskClick(taskDesc){
        this.props.HandlerToCollectClickInfo(taskDesc);
}
           
    render(){
        let lists=[];

        for(let i=0; i < this.props.tasks.length; i++){
            let task = this.props.tasks[i];

            let spanAction;

            if(task.isFinished == "true"){
               spanAction=(
                <span className='material-icons' onClick={()=> this.handleTaskClick(task.desc)}>close</span>
               );
            }else{
                spanAction=(
                    <span className='material-icons' onClick={()=> this.handleTaskClick(task.desc)}>done</span>
                   );
            }
            let listItem=(
                <div key={i}>
                  <span>{task.desc}</span>
                 {spanAction}
                </div>
           );
           lists.push(listItem);
        }
 

        return(
            <div className={this.props.forStyling}>
                <div className='list-container'>
                    <div className='title'> {this.props.forStyling}</div>
                    <div className='content'>
                        {lists}
                    </div>
                </div>



            </div>
        );
    }

}
class App extends React.Component{
    constructor(props){
        super(props);
        
        this.state={
            tasks:[{
              desc:"switch of the light",
              isFinished:"false"
            },
            {
                desc:"switch of the fan",
                isFinished:"true"
            },
            {
                desc:"Make a dinner",
                isFinished:"false"
            },
            {
                desc:'make a breakfast',
                isFinished:"true"
            }
              ]
        }
    }
    handleNewTask(taskDesc){
     let oldTask=this.state.tasks.slice();
     oldTask.push({
        desc:taskDesc,
        isFinished:"false"
     });
     this.setState({
        tasks:oldTask
     });
    }

    handleTaskStatusUpdate(task,newStatus){
        let oldTask=this.state.tasks.slice();

        let taskItem=oldTask.find(ot=> ot.desc == task);
        taskItem.isFinished=newStatus;

        this.setState({
            tasks:oldTask
        });
    }
    render(){
     let tasks=this.state.tasks;
     let todoTasks=tasks.filter(t => t.isFinished == "false");
     let doneTasks=tasks.filter(t => t.isFinished == "true");
        return(
       <>
          <div className='add-task'>   
            <AddTask HandlerToCollectTaskInfo={(taskDesc)=> this.handleNewTask(taskDesc)}/>
         </div>
           <div className='task-lists'>
           <TaskList HandlerToCollectClickInfo={(task)=> this.handleTaskStatusUpdate(task,"true")} tasks={todoTasks} purpose="Todo"  forStyling="Todo"/>
           <TaskList HandlerToCollectClickInfo={(task)=> this.handleTaskStatusUpdate(task,"false")}  tasks={doneTasks} purpose="finished" forStyling="Finished"/>
           </div>
       </>
        );
    }
}
ReactDOM.render(<App/>,document.getElementById("root"));
// createRoot(document.getElementById('root')).render(<App/>);

