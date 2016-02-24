const React = require('react-native');
const store = require('../store');
const styles = require('../baseStyles');

class EditScreenSaveButton extends React.Component {
  render() {
    const stop = () => store.dispatch({
      type: 'SAVE_CONFIGURATION',
      configuration: this.props.configuration
    });
    return (
      <React.TouchableHighlight onPress={stop} style={editScreenStyles.button}>
        <React.Text style={editScreenStyles.buttonText}>
          &#x2714; Save
        </React.Text>
      </React.TouchableHighlight>
    );
  }
}

class EditScreenCancelButton extends React.Component {
  render() {
    const stop = () => store.dispatch({
      type: 'CANCEL_EDIT'
    });
    return (
      <React.TouchableHighlight onPress={stop} style={editScreenStyles.button}>
        <React.Text style={editScreenStyles.buttonText}>
          &#x2718; Cancel
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
  columnHeader: {
    width: 120,
    fontSize: 15,
    color: '#ffffff',
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'Righteous'
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
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  button: {
    margin: 20,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#EB219B'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'Righteous'
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
        <React.View
          style={editScreenStyles.actionWrapper}>
          <React.Text style={editScreenStyles.columnHeader}>
            Name
          </React.Text>
          <React.Text style={editScreenStyles.columnHeader}>
            Seconds
          </React.Text>
        </React.View>
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
        <React.View
          style={editScreenStyles.buttons}>
          <EditScreenSaveButton configuration={this.state} />
          <EditScreenCancelButton />
        </React.View>
      </React.View>
    );
  }
}

module.exports = EditScreen;
