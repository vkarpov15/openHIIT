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
  },
  seconds: {
    fontSize: 100,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    width: 260,
    color: '#0BD2FD',
    textAlign: 'center'
  },
  secondsWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  secondsWrapperInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iterationCount: {
    color: '#CCBC1D',
    fontSize: 35,
    fontWeight: 'bold'
  }
});

class StopTimerButton extends React.Component {
  render() {
    const stop = () => store.dispatch({ type: 'STOP_TIMER' });
    return (
      <React.TouchableHighlight onPress={stop} style={styles.button}>
        <React.Text style={styles.timerControl}>
          &#9726; Stop Timer
        </React.Text>
      </React.TouchableHighlight>
    );
  }
}

class TimerScreen extends React.Component {
  render() {
    const percent = this.props.milliseconds /
      this.props.action.durationMilliseconds;
    const _style = {
      height: (percent * 80),
      marginTop: 110 - (percent * 80),
      backgroundColor: '#EB219B',
      width: 20
    };
    return (
      <React.View style={styles.containerTop}>
        <React.Text style={timerStyles.header}>
          {this.props.action.name}
        </React.Text>
        <React.View style={timerStyles.secondsWrapper}>
          <React.Text style={_style}></React.Text>
          <React.View style={timerStyles.secondsWrapperInner}>
            <React.Text style={timerStyles.seconds}>
              {(this.props.milliseconds / 1000).toFixed(1)}
            </React.Text>
          </React.View>
          <React.Text style={_style}></React.Text>
        </React.View>
        <React.Text style={timerStyles.iterationCount}>
          {this.props.iteration + 1} / {this.props.numIterations}
        </React.Text>
        <StopTimerButton></StopTimerButton>
      </React.View>
    );
  }
}

module.exports = TimerScreen;
