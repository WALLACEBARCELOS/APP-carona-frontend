import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Easing, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { format } from 'date-fns';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Feather';

const RequestRideScreen = () => {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date());
  const [passengers, setPassengers] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const titleAnim = useState(new Animated.Value(0))[0];
  const inputAnim = useState(new Animated.Value(0))[0];
  const buttonAnim = useState(new Animated.Value(0))[0];

  const today = new Date().toISOString().split('T')[0];

  const handleDateChange = (day) => {
    if (day.dateString >= today) {
      setDate(new Date(day.dateString));
    }
    setShowDatePicker(false);
  };

  const handleIncrement = () => {
    if (passengers < 4) {
      setPassengers(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (passengers > 1) {
      setPassengers(prev => prev - 1);
    }
  };

  const handleSearch = () => {
    console.log('Search for rides', {
      departure,
      destination,
      date: format(date, 'yyyy-MM-dd'),
      passengers,
    });
  };

  const handleOutsidePress = () => {
    setShowDatePicker(false);
    Keyboard.dismiss();
  };

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(inputAnim, {
        toValue: 1,
        duration: 1000,
        delay: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 1000,
        delay: 600,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      })
    ]).start();
  }, [titleAnim, inputAnim, buttonAnim]);

  const titleStyle = {
    opacity: titleAnim,
    transform: [
      {
        translateY: titleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-50, 0],
        }),
      },
    ],
  };

  const inputStyle = {
    opacity: inputAnim,
    transform: [
      {
        translateY: inputAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  };

  const buttonStyle = {
    opacity: buttonAnim,
    transform: [
      {
        translateY: buttonAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        <Animated.Text style={[styles.title, titleStyle]}>Buscar Carona</Animated.Text>

        <Animated.View style={[styles.inputContainer, inputStyle]}>
          <TextInput
            style={styles.input}
            placeholder="De (Local de Partida)"
            placeholderTextColor="#d0d0d0"
            value={departure}
            onChangeText={setDeparture}
          />

          <TextInput
            style={styles.input}
            placeholder="Para (Destino)"
            placeholderTextColor="#d0d0d0"
            value={destination}
            onChangeText={setDestination}
          />

          <TouchableOpacity style={styles.datePicker} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateText}>{format(date, 'dd/MM/yyyy')}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <View style={styles.calendarWrapper}>
              <Calendar
                markedDates={{
                  [today]: { disabled: true, selected: true, selectedColor: '#00d8ff' }
                }}
                onDayPress={handleDateChange}
                minDate={today}
                theme={{
                  textSectionTitleColor: '#00d8ff',
                  todayTextColor: '#00d8ff',
                  dayTextColor: '#000',
                  selectedDayBackgroundColor: '#00d8ff',
                  selectedDayTextColor: '#fff',
                  disabledDayTextColor: '#888',
                  arrowColor: '#00d8ff',
                  monthTextColor: '#00d8ff',
                  backgroundColor: '#1e1e1e',
                  textDisabledColor: '#888',
                }}
                style={styles.calendar}
              />
            </View>
          )}

          <View style={styles.passengerBox}>
            <Text style={styles.passengerLabel}>Número de Passageiros:</Text>
            <View style={styles.passengerControl}>
              <TouchableOpacity style={styles.iconButton} onPress={handleDecrement}>
                <Icon name="minus" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.passengerCount}>{passengers}</Text>
              <TouchableOpacity style={styles.iconButton} onPress={handleIncrement}>
                <Icon name="plus" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.passengerInfo}>O máximo de passageiros é 4.</Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.buttonContainer, buttonStyle]}>
          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#00d8ff',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#00d8ff',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#2a2a2a',
    color: '#fff',
    fontSize: 16,
  },
  datePicker: {
    height: 50,
    borderColor: '#00d8ff',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#2a2a2a',
  },
  dateText: {
    fontSize: 16,
    color: '#fff',
  },
  calendarWrapper: {
    position: 'absolute',
    top: 100, 
    left: 20,
    right: 20,
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    zIndex: 10,
  },
  calendar: {
    marginBottom: 15,
  },
  passengerBox: {
    borderColor: '#00d8ff',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#2a2a2a',
  },
  passengerLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  passengerControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    width: 50,
    height: 50,
    borderColor: '#00d8ff',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
  },
  passengerCount: {
    fontSize: 18,
    color: '#fff',
    marginHorizontal: 20,
  },
  passengerInfo: {
    fontSize: 14,
    color: '#d0d0d0',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    height: 60,
    borderRadius: 10,
    backgroundColor: '#00d8ff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00d8ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 6,
    marginBottom: 20,
  },
  buttonText: {
    color: '#1e1e1e',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default RequestRideScreen;
