import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import TaskListsActions from '../actions/TaskListsActions.js';
import TasksActions from '../actions/TasksActions.js';
import TasksPage from '../components/TasksPage.jsx';
import TaskCreateModal from '../components/TaskCreateModal.jsx';

class TasksPageContainer extends React.Component {
   constructor() {
      super();
      this.state = { isCreatingTask : false }
   }

   componentWillMount() {
      this.props.TasksActions.loadTasks(this.props.params.id);
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.params.id !== this.props.params.id) {
         this.props.TasksActions.loadTasks(nextProps.params.id);
      }
   }

   handleTaskStatusChange(taskId, { isCompleted }) {
      this.props.TasksActions.updateTaskStatus({
         taskListId: this.props.params.id,
         taskId: taskId,
         isCompleted: isCompleted
      });
   }

   handleTaskAdd() {
      this.setState({ isCreatingTask: true });
   }

   handleTaskSubmit(task) {
      this.props.TasksActions.createTask({
         taskListId: this.props.params.id,
         ...task
      });
      this.handleTaskCreateModalClose();
   }

   handleTaskCreateModalClose() {
      this.setState({ isCreatingTask: false });
   }

   handleTaskUpdate(taskId, { text }) {
      this.props.TasksActions.updateTask({
         taskListId: this.props.params.id,
         taskId: taskId,
         text: text
      });
   }

   handleTaskDelete(taskId) {
      this.props.TasksActions.deleteTask({
         taskListId: this.props.params.id,
         taskId: taskId
      });
   }

   handleTaskListDelete() {
      this.props.TaskListsActions.deleteTaskList({
         taskListId: this.props.params.id
      });
      this.props.router.push('/lists');
   }

   render() {
      return (
         <div>
            <TasksPage
               tasks={this.props.tasks}
               isLoadingTask={this.props.isLoading}
               onTaskListDelete={this.handleTaskListDelete.bind(this)}
               onTaskAdd={this.handleTaskAdd.bind(this)}
               onTaskDelete={this.handleTaskDelete.bind(this)}
               onTaskStatusChange={this.handleTaskStatusChange.bind(this)}
               onTaskUpdate={this.handleTaskUpdate.bind(this)}
            />
            <TaskCreateModal
               isOpen={this.state.isCreatingTask}
               onSubmit={this.handleTaskSubmit.bind(this)}
               onClose={this.handleTaskCreateModalClose.bind(this)}
            />
         </div>
      )
   }
}

function mapStateToProps(store) {
   return {
      tasks: store.tasks.tasks,
      isLoading: store.tasks.isLoading
   }
}

function mapDispatchToProps(dispatch) {
   return {
      TaskListsActions: bindActionCreators(TaskListsActions, dispatch),
      TasksActions: bindActionCreators(TasksActions, dispatch)
   }
}

TasksPageContainer.propTypes = {
   tasks: React.PropTypes.array,
   isLoading: React.PropTypes.bool,
   router: React.PropTypes.object.isRequired,
   TaskListsActions: React.PropTypes.object,
   TasksActions: React.PropTypes.object
}

const wrappedComponent = withRouter(TasksPageContainer)
export default connect(mapStateToProps, mapDispatchToProps)(wrappedComponent);
