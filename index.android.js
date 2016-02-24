'use strict';

const EditScreen = require('./src/components/editScreen');
const React = require('react-native');
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

React.AppRegistry.registerComponent('Basic', () => Basic);
