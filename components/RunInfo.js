import React, { Component } from 'react';
import { Text, View } from 'react-native';
import SharedStyles from '../SharedStyles';

class RunInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }
  formatValue() {
    return this.state.value;
  }

  render() {
    let value = this.state.value ? this.formatValue() : '-';
    return (
      <View
        style={[
          SharedStyles.runInfoWrapper,
          { flex: 1, flexDirection: 'column-reverse' }
        ]}
      >
        <Text style={SharedStyles.runInfoTitle}>
          {this.props.title.toUpperCase()}
        </Text>
        <Text style={SharedStyles.runInfoValue}>{value}</Text>
      </View>
    );
  }
}

export default RunInfo;
