import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const ENTER_KEY = 13;
const ESC_KEY = 27;

class TaskListCreateModal extends React.Component {
   constructor() {
      super();
      this.state = { name: '' }
   }

   handleClose() {
      const { onClose } = this.props;
      if (onClose) onClose();
      this.clearStateName();
   }

   handleSubmit() {
      const { onSubmit } = this.props;
      if (onSubmit) onSubmit({ name: this.state.name });
      this.clearStateName();
   }

   handleKeyDown(e) {
      if (e.keyCode === ENTER_KEY) {
         this.handleSubmit();
      }
      if (e.keyCode === ESC_KEY) {
         this.handleClose();
      }
   }

   clearStateName() {
      this.setState({ name: '' });
   }

   handleTextChange(e) {
      this.setState({ name: e.target.value });
   }

   renderTextField() {
      return (
         <TextField
            fullWidth
            value={this.state.name}
            ref={c => this.taskInput = c}
            hintText='e.g. movies to watch'
            floatingLabelText='Enter task name'
            onChange={this.handleTextChange.bind(this)}
            onKeyDown={this.handleKeyDown.bind(this)}
         />
      );
   }

   renderDialog() {
      const actions = [
         <FlatButton
            label='Cancel'
            onClick={this.handleClose.bind(this)}
         />,
         <FlatButton
            label='Submit'
            primary={true}
            disabled={!this.state.name}
            onClick={this.handleSubmit.bind(this)}
         />
      ];
      return (
         <Dialog
            contentStyle={{ maxWidth: 400, height: 350 }}
            actions={actions}
            open={this.props.isOpen}
            onRequestClose={this.handleClose.bind(this)}
         >
            <h3 className="TaskListCreateModal">Add task</h3>
            {this.renderTextField()}
         </Dialog>
      );
   }

   render() {
      return (
         <MuiThemeProvider>
            {this.renderDialog()}
         </MuiThemeProvider>
      );
   }
}

TaskListCreateModal.propTypes = {
   isOpen: React.PropTypes.bool,
   onSubmit: React.PropTypes.func,
   onClose: React.PropTypes.func,
}

export default TaskListCreateModal;
