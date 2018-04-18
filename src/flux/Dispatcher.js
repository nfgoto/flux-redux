export class Dispatcher {
    constructor(){
        this.__listeners = [];
    }

    dispatch(action){
        this.__listeners.forEach(listener => {
            // each listener will be a different function that ets passed the action
            listener(action)
        });
    }

    register(listener){
        this.__listeners.push(listener);
    }
}