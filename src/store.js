const redux = require('redux');

const store = redux.createStore(reducer);
module.exports = store;

function reducer(state, action) {
  state = !!state ? _.cloneDeep(state) : getDefaultState();
  return match(action.type, {
    START_TIMER: () => {
      if (state.interval) {
        clearInterval(state.current.interval);
      }
      const start = () => store.dispatch({ type: 'TICK_100' });
      state.current.interval = setInterval(start, 100);
      state.current.milliseconds =
        state.configuration.actions[0].durationMilliseconds;
      state.current.iterations = 0;
      state.current.actionIndex = 0;
      state.current.state = 'IN_PROGRESS';
      return state;
    },
    STOP_TIMER: () => {
      if (state.current.interval) {
        clearInterval(state.current.interval);
      }
      state.current.interval = null;
      state.current.iterations = 0;
      state.current.actionIndex = 0;
      notification.stop();
      state.current.state = 'HOME';
      return state;
    },
    EDIT: () => {
      state.current.state = 'EDIT';
      return state;
    },
    TICK_100: () => {
      state.current.milliseconds = state.current.milliseconds - 100;
      if (state.current.milliseconds <= 0) {
        if (state.current.actionIndex + 1 < state.configuration.actions.length) {
          state.current.milliseconds =
            state.configuration.actions[++state.current.actionIndex].durationMilliseconds;
        } else if (state.current.iterations < state.configuration.iterations) {
          ++state.current.iterations;
          state.current.actionIndex = 0;
          state.current.milliseconds =
            state.configuration.actions[0].durationMilliseconds;
        } else {
          state.dispatch({ type: 'DONE' });
        }
        notification.play();
      }
      return state;
    },
    DONE: () => {
      if (state.current.interval) {
        clearInterval(state.current.interval);
      }
      state.current.interval = null;
      state.current.done = true;
      notification.stop();
      doneNotification.play();
      return state;
    },
    SAVE_CONFIGURATION: () => {
      state.current.state = 'HOME';
      state.configuration.iterations =
        parseInt(action.configuration.iterations, 10);
      const actions = action.configuration.actions;
      state.configuration.actions = _.map(actions, action => {
        const ms = parseInt(action.durationSeconds, 10) * 1000;
        return {
          name: action.name,
          durationMilliseconds: Math.round(ms)
        };
      });
      return state;
    },
    RESET_AFTER_DONE: () => {
      state.current.done = false;
      return state;
    },
    DEFAULT: () => state
  });
}

function getDefaultState() {
  return {
    current: {
      interval: null,
      milliseconds: 0,
      iterations: 0,
      actionIndex: 0,
      state: 'EDIT'
    },
    configuration: {
      iterations: 8,
      actions: [
        { name: 'Go!', durationMilliseconds: 20000 },
        { name: 'Relax!', durationMilliseconds: 10000 }
      ]
    }
  };
}

function match(val, map) {
  if (!map[val]) {
    return map['DEFAULT']();
  }
  return map[val]();
}
