/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter} from 'react-native-bluetooth-escpos-printer';

const App = () => {
  const [isBlueEnabled, setIsBlueEnabled] = useState(false);
  const [foundDevices, setFoundDevices]   = useState([]);
  const [pairedDevices, setPairedDevices] = useState([]);
  const [isLoading, setIsLoading]         = useState(false);
  const [errorMsg, setErrorMsg]           = useState('');

  BluetoothManager.isBluetoothEnabled()
  .then(enabled => {
    setIsBlueEnabled(enabled);
  })
  .catch(err => console.log('Error', err));

  const scanDevice = async () => {
    setIsLoading(true);
    const devices = await BluetoothManager.scanDevices();

    try {
      const parsedDevices = JSON.parse(devices);

      setPairedDevices(parsedDevices.paired);
      setFoundDevices(parsedDevices.found);
    } catch (e) {
      setErrorMsg("Error when scanning bluetooth devices: " + e);
    }

    console.log(foundDevices, pairedDevices, errorMsg);
    setIsLoading(false);
  }

  const connectDevice = address => {
    BluetoothManager.connect(row.address)
    .then((s)=>{
        this.setState({
            loading:false,
            boundAddress:row.address,
            name:row.name || "UNKNOWN"
        })
    },(e)=>{
        this.setState({
            loading:false
        })
        alert(e);
    })
  }

  return (
    <SafeAreaView style={Colors.lighter}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={Colors.lighter}>
        <View style={{ backgroundColor: Colors.white }}>
          <Text>Welcome to RISHOBAR!</Text>

          { isLoading && (<Text>Loading...</Text>) }

          <Text>Bluetooth Enable: { String(isBlueEnabled) }</Text>

          <Button title="Scan Devices" onPress={ scanDevice }/>

          <Text>Found Devices:</Text>
          {
            foundDevices.length > 0 && foundDevices.map((device, idx) =>
              <TouchableOpacity key={idx} activeOpacity={0.8}>
                <Text>{device.name}: {device.address}</Text>
              </TouchableOpacity>
            )
          }

          <Text>Paired Devices:</Text>
          {
            pairedDevices.length > 0 && pairedDevices.map((device, idx) =>
              <TouchableOpacity style={styles.button} key={idx} activeOpacity={0.8}>
                <Text>{device.name}: {device.address}</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#3DCC91",
    padding: 3,
    marginHorizontal: 15,
    borderRadius: 5,
  }
});

export default App;
