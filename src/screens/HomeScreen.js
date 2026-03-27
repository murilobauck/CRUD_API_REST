import React, { useState, useCallback } from "react";
import { View, Text, FlatList, Button, TextInput, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import styles from "../styles/styles";

import { getPeople, deletePerson } from "../servers/peopleCrud";

function CardPersonal({ item, navigation, refresh }) {

  return (

    <View style={styles.card}>

      <View>

        <Text style={styles.name}>
          {item.firstName} {item.lastName}
        </Text>

        <Text style={styles.email}>
          {item.email}
        </Text>

        <Text style={styles.phone}>
          {item.phone}
        </Text>

      </View>

      <View>

        <Button
          title="Editar"
          onPress={() => navigation.navigate("AddEdit", { person: item })}
        />

        <Button
          title="Deletar"
          onPress={async () => {
            await deletePerson(item.id);
            refresh();
          }}
        />

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

  // função para carregar dados
  async function loadPeople() {
    setLoading(true);
    const data = await getPeople();
    setPeople(data);
    setLoading(false);
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

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
      ) : (
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
      )}

    </View>
  );
}
