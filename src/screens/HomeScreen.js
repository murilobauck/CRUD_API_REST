import React, { useState, useCallback } from "react";
import { View, Text, FlatList, Button, TextInput, ActivityIndicator, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import styles from "../styles/styles";

import { getPeople, deletePerson } from "../servers/peopleCrud";

function CardPersonal({ item, navigation, refresh }) {

  const confirmDelete = () => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza de que deseja excluir essa pessoa?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await deletePerson(item.id);
            refresh();
          }
        }
      ]
    );
  };

  return (

    <View style={styles.card}>
      <Text style={styles.name}>
        {item.firstName} {item.lastName}
      </Text>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.infoText}>{item.email}</Text>
          <Button
            title="Editar"
            onPress={() => navigation.navigate("AddEdit", { person: item })}
          />
        </View>

        <View style={styles.column}>
          <Text style={styles.infoText}>{item.phone}</Text>
          <Button
            title="Deletar"
            color="red"
            onPress={confirmDelete}
          />
        </View>
      </View>
    </View>
  )
}

export default function HomeScreen({ navigation }) {

  // estado da lista
  const [people, setPeople] = useState([]);
  
  // estado da pesquisa
  const [searchQuery, setSearchQuery] = useState("");

  // estado de carregamento
  const [loading, setLoading] = useState(true);

  // estado de erro
  const [error, setError] = useState(null);

  // função para carregar dados
  async function loadPeople() {
    setLoading(true);
    setError(null);
    try {
      const data = await getPeople();
      setPeople(data);
    } catch (err) {
      setError("Não foi possível conectar com a API.");
    } finally {
      setLoading(false);
    }
  }


  // executa sempre que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      loadPeople();
    }, [])
  );

  // Filtra as pessoas com base na pesquisa (nome ou sobrenome)
  const filteredPeople = people.filter(person => {
    const fullName = `${person.firstName} ${person.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (

    <View style={styles.container}>

      <Text style={styles.title}>Pessoas</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar por nome..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Button
        title="Adicionar Pessoa"
        onPress={() => navigation.navigate("AddEdit")}
      />

      {error ? (
        <Text style={{ color: "red", textAlign: "center", marginTop: 20 }}>{error}</Text>
      ) : null}

      {loading && !error ? (
        <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
      ) : !loading && !error ? (
        <FlatList
          data={filteredPeople}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardPersonal
              item={item}
              navigation={navigation}
              refresh={loadPeople}
            />
          )}
        />
      ) : null}

    </View>
  );
}
