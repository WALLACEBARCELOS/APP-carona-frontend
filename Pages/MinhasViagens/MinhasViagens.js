import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Animated, Easing, StyleSheet } from 'react-native';
import api from '../../Api/Api'; // Ajuste o caminho para o arquivo da sua configuração da API

const MyTripsScreen = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Função para buscar as viagens da API
    const fetchTrips = async () => {
      try {
        const response = await api.get('/viagens');
        console.log('Viagens recebidas:', response.data); // Adicionado para depuração
        setTrips(response.data);
      } catch (error) {
        console.error('Erro ao buscar viagens:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips(); // Chama a função para buscar as viagens

    // Animação de entrada dos itens na lista
    Animated.timing(itemAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, [itemAnim]);

  const itemStyle = {
    opacity: itemAnim,
    transform: [
      {
        translateY: itemAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  };

  // Renderização de cada item da lista de viagens
  const renderItem = ({ item }) => (
    <Animated.View style={[styles.tripItem, itemStyle]}>
      <Text style={styles.tripText}>De: {item.origem || 'Desconhecido'}</Text>
      <Text style={styles.tripText}>Para: {item.destino || 'Desconhecido'}</Text>
      <Text style={styles.tripText}>Data: {new Date(item.horarioPartida).toLocaleString() || 'Desconhecido'}</Text>
      <Text style={styles.tripText}>Preço: R$ {item.preco / 100 || 'Desconhecido'}</Text>
      <Text style={styles.tripText}>Reservas: {item.reservas.length || 0}</Text>
    </Animated.View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando viagens...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Viagens</Text>
      {trips.length > 0 ? (
        <FlatList
          data={trips}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noTripsText}>Você ainda não realizou nenhuma viagem.</Text>
      )}
    </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#00d8ff',
    fontSize: 18,
  },
  listContainer: {
    paddingBottom: 20,
  },
  tripItem: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderColor: '#00d8ff',
    borderWidth: 1,
  },
  tripText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  noTripsText: {
    color: '#d0d0d0',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default MyTripsScreen;
