import { Dispatcher, Store } from "./flux";

const controlpanelDispatcher = new Dispatcher();

// ------   CONSTANTS ---------------------

const UPDATE_USERNAME = "UPDATE_USERNAME";
const UPDATE_FONTSIZE_PREFERENCE = "UPDATE_FONTSIZE_PREFERENCE";

// ------   ACTIONS ---------------------

const userUpdateChangeAction = name => {
  return {
    type: UPDATE_USERNAME,
    value: name
  };
};

const fontSizePreferenceUpdateAction = size => {
  return {
    type: UPDATE_FONTSIZE_PREFERENCE,
    value: size
  };
};

// ------- DISPATCHING ACTIONS --------------------

document
  .querySelector("#userNameInput")
  .addEventListener("input", ({ target }) => {
    const name = target.value;
    console.info(`[Dispatching] : ${name}`);
    controlpanelDispatcher.dispatch(userUpdateChangeAction(name));
  });

document.forms.fontSizeForm.fontSize.forEach(el => {
  el.addEventListener("change", ({ target }) => {
    controlpanelDispatcher.dispatch(
      fontSizePreferenceUpdateAction(target.value)
    );
  });
});

class UserPrefStore extends Store {
  getInitialState() {
    return {
      userName: "Flo",
      fontSize: "small"
    };
  }

  __onDispatch(action) {
    console.log(`Store received dispatched ${action.type || "someAction"}`);
    switch (action.type) {
      case UPDATE_USERNAME:
        // change internal state of store
        this.__state.userName = action.value;
        // emit change to notfy listeners
        this.__emitChange();
        break;
      case UPDATE_FONTSIZE_PREFERENCE:
        this.__state.fontSize = action.value;
        this.__emitChange();
        break;

      default:
        break;
    }
    this.__emitChange();
  }

  getUserPreferences() {
    // return a copy of the state
    return this.__state;
  }
}

const userPrefStore = new UserPrefStore(controlpanelDispatcher);

userPrefStore.addListener(state => {
  console.info(`Current state: ${JSON.stringify(state)}`);  
  render(state);
});

const render = ({userName, fontSize}) => {
    // update the DOM
    document.querySelector("#userName").innerText = userName;
    document.forms.fontSizeForm.fontSize.value = userName;
    document.querySelector('.container').style.fontSize = fontSize === 'small' ? '18px' : '36px';

}

render(userPrefStore.getUserPreferences);