import { Store } from "./Store";

export class ReduceStore extends Store {
    constructor(dispatcher){
        super(dispatcher); // will create a listeners array
    }

    reduce(state, action){
        throw new Error('Subclasses must override reduce method of a Flux Reducestore');
    }

    // override the method of the Store
    __onDispatch(action){
        // create new state based on previous state and action
        const newState =this.reduce(this.__state, action)

        // Is new state different from old state ?
        if (newState !== this.__state) {
            this.__state = newState
            // automatic notification of listeners
            this.__emitChange();
        }
    }
}