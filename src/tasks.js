
import { generate as id } from "shortid"; // generate random ID
import { Dispatcher, ReduceStore } from "./flux";

const taskDispatcher = new Dispatcher();

// -------- constants --------

const CREATE_TASK = 'CREATE_TASK';
const COMPLETE_TASK = 'COMPLETE_TASK';
const SHOW_TASK = 'SHOW_TASK';


// -------- action creators --------

const createNewTaskAction = (content) => {
    return {
        type: CREATE_TASK,
        value: content
    }
}

const showTaskAction = (show) => {
    return {
        type: SHOW_TASK,
        value: show
    }
}

const completeTaskAction = (id, isComplete) => {
    return {
        type: COMPLETE_TASK,
        id,
        value: isComplete
    }
}


class TaskStore extends ReduceStore {
  getInitialState() {
    return {
      tasks: [
        { id: id(), content: "Update CSS styles", completed: false },
        { id: id(), content: "Add unit tests", completed: false },
        { id: id(), content: "Learn artifcial intellogence", completed: false }
      ],
      showComplete: true
    };
  }

  reduce(state, action){
      console.log(`Reducing...${JSON.stringify(state)} ${JSON.stringify(action)}`);

      // reducers (reduce functions) ALWAYS return a state ora copy of state
      return state
  }

  getState(){
      return this.__state;
  }
}

// template for task (vanilla JS compoennt)
const taskComponenent = ({content, complete, id}) => (
    `<section>
        ${content} <input type="checkbox" name="taskCompleteChecl" data-taskId=${id} ${complete ? 'checked' : ''}>
    </section>`
);

// render updates what appears on the page based on state of appp
const render = () => {
    const tasksSection = document.querySelector('#tasks');
    // get a ref to the state
    const state = taskStore.getState();

    // choose tp display or not completed tasks
    const rendered = state.tasks
                        .filter(task => task.showComplete ? true : !task.showComplete)
                        .map(taskComponenent).join('');

    // add rendered tasks to the DOM
    tasksSection.innerHTML = rendered;
}

const taskStore = new TaskStore(taskDispatcher);

taskDispatcher.dispatch('TEST_DISPATCH');

render();