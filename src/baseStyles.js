const React = require('react-native');

module.exports = React.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000'
  },
  containerTop: {
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
  doneHeader: {
    color: '#EB219B',
    fontWeight: 'bold',
    fontSize: 45,
    fontFamily: 'Righteous'
  },
  home: {
    color: '#EB219B',
    fontSize: 30
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
