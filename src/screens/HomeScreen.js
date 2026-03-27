import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TextInput, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
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

      <View style={styles.infoContainer}>
        <View style={styles.infoCol}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoText}>{item.email}</Text>
        </View>

        <View style={styles.infoCol}>
          <Text style={styles.infoLabel}>Telefone</Text>
          <Text style={styles.infoText}>{item.phone}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.actionRow}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]} 
          onPress={() => navigation.navigate("AddEdit", { person: item })}
        >
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]} 
          onPress={confirmDelete}
        >
          <Text style={styles.deleteButtonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default function HomeScreen({ navigation }) {

  const [people, setPeople] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

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

  useFocusEffect(
    useCallback(() => {
      loadPeople();
    }, [])
  );

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

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate("AddEdit")}
      >
        <Text style={styles.addButtonText}>Adicionar Pessoa</Text>
      </TouchableOpacity>

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
