const React = require('react-native');
const _ = require('lodash');
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
    padding: 25,
    backgroundColor: '#000000',
    alignItems: 'center'
  },
  containerStyle: {
    flex: 1
  },
  input: {
    backgroundColor: '#FFFFFF',
    width: 110,
    fontSize: 25,
    padding: 3,
    margin: 10
  },
  columnHeader: {
    width: 110,
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
    width: 280,
    backgroundColor: '#232323'
  },
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: 300
  },
  buttons: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: 280
  },
  button: {
    marginRight: 20,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    width: 130,
    backgroundColor: '#EB219B',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'Righteous'
  },
  cancelText: {
    color: '#CCBC1D',
    fontSize: 40
  },
  addActionButton: {
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    width: 90,
    backgroundColor: '#0BD2FD',
    alignItems: 'center',
    marginTop: 5
  },
  addActionText: {
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
    const removeAction = index => () => {
      this.state.actions.splice(index, 1);
      this.setState(this.state);
    };
    const addAction = () => {
      this.state.actions.push({ name: 'New', durationSeconds: '10' });
      this.setState(this.state);
    };
    return (
      <React.ScrollView
        contentContainerStyle={editScreenStyles.container}
        style={editScreenStyles.containerStyle}>
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
          this.state.actions.map((action, index) => {
            return (
              <React.View
                style={editScreenStyles.actionWrapper}
                key={index}>
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
                <React.TouchableHighlight onPress={removeAction(index)}>
                  <React.Text style={editScreenStyles.cancelText}>
                    &#x2718;
                  </React.Text>
                </React.TouchableHighlight>
              </React.View>
            );
          })
        }
        <React.TouchableHighlight
          onPress={addAction}
          style={editScreenStyles.addActionButton}>
          <React.Text style={editScreenStyles.addActionText}>
            + Add
          </React.Text>
        </React.TouchableHighlight>
        <React.View
          style={editScreenStyles.buttons}>
          <EditScreenSaveButton configuration={this.state} />
          <EditScreenCancelButton />
        </React.View>
      </React.ScrollView>
    );
  }
}

module.exports = EditScreen;
