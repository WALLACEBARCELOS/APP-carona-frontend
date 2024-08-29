import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Easing, Platform, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { format } from 'date-fns';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Feather';

const OferecerCarona = () => {
  // Estados para armazenar as informações da carona
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [meetingPoint, setMeetingPoint] = useState('');
  const [arrivalPoint, setArrivalPoint] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [seats, setSeats] = useState(1);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carPlate, setCarPlate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Animações para título, campos de entrada e botão
  const titleAnim = useState(new Animated.Value(0))[0];
  const inputAnim = useState(new Animated.Value(0))[0];
  const buttonAnim = useState(new Animated.Value(0))[0];

  const today = new Date().toISOString().split('T')[0];

  // Função para alterar a data da viagem
  const handleDateChange = (day) => {
    if (day.dateString >= today) {
      setDate(new Date(day.dateString));
    }
    setShowDatePicker(false);
  };

  // Função para aumentar o número de assentos disponíveis
  const handleIncrement = () => {
    if (seats < 4) {
      setSeats(prev => prev + 1);
    }
  };

  // Função para diminuir o número de assentos disponíveis
  const handleDecrement = () => {
    if (seats > 1) {
      setSeats(prev => prev - 1);
    }
  };

  // Função para publicar a carona
  const handlePublish = () => {
    console.log('Oferta de carona', {
      departure,
      destination,
      meetingPoint,
      arrivalPoint,
      date: format(date, 'yyyy-MM-dd'),
      time,
      seats,
      price,
      description,
      carModel,
      carPlate,
    });
  };

  // Função para fechar o calendário ao clicar fora dele
  const handleOutsidePress = () => {
    setShowDatePicker(false);
    Keyboard.dismiss();
  };

  // Efeito para animações de entrada na tela
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
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.Text style={[styles.title, titleStyle]}>Oferecer Carona</Animated.Text>

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

          <TextInput
            style={styles.input}
            placeholder="Ponto de Encontro"
            placeholderTextColor="#d0d0d0"
            value={meetingPoint}
            onChangeText={setMeetingPoint}
          />

          <TextInput
            style={styles.input}
            placeholder="Ponto de Chegada"
            placeholderTextColor="#d0d0d0"
            value={arrivalPoint}
            onChangeText={setArrivalPoint}
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

          <TextInput
            style={styles.input}
            placeholder="Horário de Partida"
            placeholderTextColor="#d0d0d0"
            value={time}
            onChangeText={setTime}
          />

          <View style={styles.seatBox}>
            <Text style={styles.seatLabel}>Número de Assentos Disponíveis:</Text>
            <View style={styles.seatControl}>
              <TouchableOpacity style={styles.iconButton} onPress={handleDecrement}>
                <Icon name="minus" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.seatCount}>{seats}</Text>
              <TouchableOpacity style={styles.iconButton} onPress={handleIncrement}>
                <Icon name="plus" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.seatInfo}>O máximo de assentos é 4.</Text>
          </View>

          <View style={styles.priceBox}>
            <Text style={styles.priceLabel}>Valor da Viagem (R$)</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="R$ 0,00"
              placeholderTextColor="#d0d0d0"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
          </View>

          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Descrição da Viagem (paradas, bagagem, etc.)"
            placeholderTextColor="#d0d0d0"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <TextInput
            style={styles.input}
            placeholder="Modelo do Carro"
            placeholderTextColor="#d0d0d0"
            value={carModel}
            onChangeText={setCarModel}
          />

          <TextInput
            style={styles.input}
            placeholder="Placa do Carro"
            placeholderTextColor="#d0d0d0"
            value={carPlate}
            onChangeText={setCarPlate}
          />
        </Animated.View>

        <Animated.View style={[styles.buttonContainer, buttonStyle]}>
          <TouchableOpacity style={styles.button} onPress={handlePublish}>
            <Text style={styles.buttonText}>Publicar Carona</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  seatBox: {
    borderColor: '#00d8ff',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#2a2a2a',
  },
  seatLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  seatControl: {
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
  seatCount: {
    fontSize: 18,
    color: '#fff',
    marginHorizontal: 20,
  },
  seatInfo: {
    fontSize: 14,
    color: '#d0d0d0',
    marginTop: 10,
    textAlign: 'center',
  },
  priceBox: {
    borderColor: '#00d8ff',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#2a2a2a',
  },
  priceLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  priceInput: {
    height: 50,
    borderColor: '#00d8ff',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#2a2a2a',
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
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

export default OferecerCarona;
