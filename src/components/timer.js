const React = require('react-native');
const _ = require('lodash');
const store = require('../store');
const styles = require('../baseStyles');

const timerStyles = React.StyleSheet.create({
  header: {
    color: '#EB219B',
    fontSize: 70,
    fontWeight: 'bold',
    marginBottom: 20
  }
});

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
        <React.Text style={timerStyles.header}>
          {this.props.action.name}
        </React.Text>
        <React.Text style={styles.timer}>
          {(this.props.milliseconds / 1000).toFixed(1)}
        </React.Text>
        <StopTimerButton></StopTimerButton>
      </React.View>
    );
  }
}

module.exports = TimerScreen;
