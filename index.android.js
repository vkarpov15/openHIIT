'use strict';

const React = require('react-native');
const Sound = require('react-native-sound');
const _ = require('lodash');
const redux = require('redux');

const store = redux.createStore(reducer);
const doneNotification = new Sound('alarm.mp3', Sound.MAIN_BUNDLE);
const notification = new Sound('notify.mp3', Sound.MAIN_BUNDLE);

class StartTimerButton extends React.Component {
  render() {
    const start = () => store.dispatch({ type: 'START_TIMER' });
    return (
      <React.TouchableHighlight onPress={start} style={styles.button}>
        <React.Text style={styles.timerControl}>
          &#x25B6; Start Workout!
        </React.Text>
      </React.TouchableHighlight>
    );
  }
}

class EditTimerButton extends React.Component {
  render() {
    const edit = () => store.dispatch({ type: 'EDIT' });
    return (
      <React.TouchableHighlight onPress={edit} style={styles.button}>
        <React.Text style={styles.timerControl}>
          &#x270e; Edit Workout
        </React.Text>
      </React.TouchableHighlight>
    );
  }
}

class StopTimerButton extends React.Component {
  render() {
    const stop = () => store.dispatch({ type: 'STOP_TIMER' });
    return (
      <React.TouchableHighlight onPress={stop} style={styles.button}>
        <React.Text style={styles.timerControl}>
          &#9726; Stop Timer!
        </React.Text>
      </React.TouchableHighlight>
    );
  }
}

class EditScreenSaveButton extends React.Component {
  render() {
    const stop = () => store.dispatch({
      type: 'SAVE_CONFIGURATION',
      configuration: this.props.configuration
    });
    return (
      <React.TouchableHighlight onPress={stop} style={styles.button}>
        <React.Text style={styles.timerControl}>
          &#x2714; Save
        </React.Text>
      </React.TouchableHighlight>
    );
  }
}

const editScreenStyles = React.StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#000000',
    alignItems: 'center'
  },
  input: {
    backgroundColor: '#FFFFFF',
    width: 120,
    fontSize: 25,
    padding: 3,
    margin: 10
  },
  inputHeader: {
    color: '#0BD2FD',
    fontSize: 30,
    fontFamily: 'Righteous',
    paddingLeft: 5,
    marginBottom: 10,
    marginTop: 25,
    width: 260,
    backgroundColor: '#232323'
  },
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: 280
  }
});

class EditScreen extends React.Component {
  constructor(props) {
    super();
    const convertAction = (action) => {
      const ms = action.durationMilliseconds;
      return {
        name: action.name,
        durationSeconds: Math.floor(ms / 1000).toString()
      };
    };
    this.state = {
      iterations: props.configuration.iterations.toString(),
      actions: _.map(props.configuration.actions, convertAction)
    };
  }

  render() {
    const handler = text => {
      this.state.iterations = text;
      this.setState(this.state);
    };
    const changeActionName = action => name => {
      action.name = name;
      this.setState(this.state);
    };
    const changeActionDuration = action => duration => {
      action.durationSeconds = duration;
      this.setState(this.state);
    };
    return (
      <React.View style={editScreenStyles.container}>
        <React.Text style={editScreenStyles.inputHeader}>
          Iterations
        </React.Text>
        <React.View
          style={editScreenStyles.actionWrapper}>
          <React.TextInput
            keyboardType="numeric"
            style={editScreenStyles.input}
            value={this.state.iterations}
            onChangeText={handler} />
        </React.View>
        <React.Text style={editScreenStyles.inputHeader}>
          Actions
        </React.Text>
        {
          this.state.actions.map(action => {
            return (
              <React.View
                style={editScreenStyles.actionWrapper}
                key={action.name}>
                <React.TextInput
                  keyboardType="default"
                  style={editScreenStyles.input}
                  value={action.name}
                  onChangeText={changeActionName(action)} />
                <React.TextInput
                  keyboardType="numeric"
                  style={editScreenStyles.input}
                  value={action.durationSeconds}
                  onChangeText={changeActionDuration(action)} />
              </React.View>
            );
          })
        }
        <EditScreenSaveButton configuration={this.state} />
      </React.View>
    );
  }
}

class TimerScreen extends React.Component {
  render() {
    return (
      <React.View style={styles.container}>
        <React.Text style={styles.timer}>
          {(this.props.milliseconds / 1000).toFixed(1)}
        </React.Text>
        <StopTimerButton></StopTimerButton>
      </React.View>
    );
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <React.View style={styles.container}>
        <React.Text style={styles.homeHeader}>
          Current Workout
        </React.Text>
        <React.Text style={styles.home}>
          {this.props.configuration.iterations} iterations of
        </React.Text>
        {
          this.props.configuration.actions.map(action => {
            return (
              <React.Text style={styles.home} key={action.name}>
                &bull; {action.name}&nbsp;
                ({(action.durationMilliseconds / 1000).toFixed(0)} seconds)
              </React.Text>
            );
          })
        }
        <StartTimerButton />
        <EditTimerButton />
      </React.View>
    );
  }
}

class Basic extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    store.subscribe(() => { this.setState(store.getState()) });
  }

  render() {
    // Home screen
    if (this.state.current.state === 'HOME') {
      return (
        <HomeScreen configuration={this.state.configuration} />
      );
    }
    // Timer in progress
    if (this.state.current.state === 'IN_PROGRESS') {
      return (
        <TimerScreen milliseconds={this.state.current.milliseconds} />
      );
    }
    if (this.state.current.state === 'EDIT') {
      return (
        <EditScreen configuration={this.state.configuration} />
      );
    }
  }
}

const styles = React.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  homeHeader: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 45,
    fontFamily: 'Righteous'
  },
  home: {
    color: '#EB219B',
    fontSize: 30
  },
  timer: {
    fontSize: 100,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    color: '#0BD2FD'
  },
  button: {
    margin: 20,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#333333'
  },
  timerControl: {
    color: '#FFFFFF',
    fontSize: 30,
    fontFamily: 'Righteous'
  },
  input: {
    backgroundColor: '#FFFFFF'
  }
});

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

React.AppRegistry.registerComponent('Basic', () => Basic);
