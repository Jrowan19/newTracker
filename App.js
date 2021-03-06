import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import RunInfo from './components/RunInfo';
import RunInfoNumeric from './components/RunInfoNumeric';
import haversine from 'haversine';
import StopWatch from './components/StopWatch';

let id = 0;

class App extends Component {
  state = {
    markers: [],
    watchID: null
  };

  componentDidMount() {
    let watchID = navigator.geolocation.watchPosition(position => {
      console.log(position);

      let distance = 0;
      if (this.state.previousCoordinate) {
        distance =
          this.state.distance +
          haversine(this.state.previousCoordinate, position.coords, {
            unit: 'mile'
          });
        this.distanceInfo.setState({ value: distance.toFixed(2) + 'mi' });
      }
      this.speedInfo.setState({ value: position.coords.speed + 'mp/h' });

      let x = position.coords.heading;
      if ((x > 0 && x <= 23) || (x > 338 && x <= 360))
        this.directionInfo.setState({ value: 'N' });
      else if (x > 23 && x <= 65) this.directionInfo.setState({ value: 'NE' });
      else if (x > 65 && x <= 110) this.directionInfo.setState({ value: 'E' });
      else if (x > 110 && x <= 155)
        this.directionInfo.setState({ value: 'SE' });
      else if (x > 155 && x <= 203) this.directionInfo.setState({ value: 'S' });
      else if (x > 203 && x <= 248)
        this.directionInfo.setState({ value: 'SW' });
      else if (x > 248 && x <= 293) this.directionInfo.setState({ value: 'W' });
      else if (x > 293 && x <= 338)
        this.directionInfo.setState({ value: 'NW' });
      this.setState(
        {
          markers: [
            ...this.state.markers,
            {
              coordinate: position.coords,
              key: id++
            }
          ],
          previousCoordinate: position.coords,
          distance,
          watchID
        },
        null,
        {
          distanceFilter: 10,
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000
        }
      );
    });

    setInterval = () => {
      this.distanceInfo.setState({ value: Math.random() * 15 });
      this.speedInfo.setState({ value: Math.random() * 15 });
      this.directionInfo.setState({
        value: this.directionInfo.state === 'N' ? 'NW' : 'N'
      }),
        1;
    };
  }

  // componentWillUnmount() {
  //   navigator.geolocation.stopWatch(this.state.watchID);
  // }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.map}
          showsUserLocation
          followsUserLocation
          initialRegion={{
            latitude: 37.33307,
            longitude: -122.0324,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
          }}
        >
          <MapView.Polyline
            coordinates={this.state.markers.map(marker => marker.coordinate)}
            strokeWidth={5}
          />
        </MapView>
        {/* <View style={styles.ic1}>
          <StopWatch />
        </View> */}
        <View style={styles.infoWrapper}>
          <RunInfoNumeric
            title="Distance"
            unit="mi"
            ref={info => (this.distanceInfo = info)}
          />
          <RunInfoNumeric
            title="Speed"
            unit="0 km/h"
            ref={info => (this.speedInfo = info)}
          />
          <RunInfo
            title="Direction"
            value="NE"
            ref={info => (this.directionInfo = info)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  infoWrapper: {
    flexDirection: 'row',
    flex: 1
  },
  map: {
    flex: 1
  }
});
export default App;
