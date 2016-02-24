'use strict';

const EditScreen = require('./src/components/editScreen');
const React = require('react-native');
const TimerScreen = require('./src/components/timer');
const _ = require('lodash');
const store = require('./src/store');
const styles = require('./src/baseStyles');

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

class HomeScreen extends React.Component {
  render() {
    return (
      <React.View style={styles.containerTop}>
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
      const currentAction =
        this.state.configuration.actions[this.state.current.actionIndex];
      return (
        <TimerScreen
          milliseconds={this.state.current.milliseconds}
          action={currentAction} />
      );
    }
    if (this.state.current.state === 'EDIT') {
      return (
        <React.View style={styles.container}>
          <EditScreen configuration={this.state.configuration} />
        </React.View>
      );
    }
  }
}

React.AppRegistry.registerComponent('Basic', () => Basic);
