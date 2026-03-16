import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TouchableOpacity } from "react-native";

import styles from "../styles/styles";

import { getPeople, deletePerson } from "../servers/peopleCrud";

// Componente para renderizar cada item da lista (Card)
const CardPersonal = ({ item, navigation, refresh }) => {
    return (
        <View style={styles.card}>
            <View>
                <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
                <Text style={styles.email}>{item.email}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: '#2196F3', marginRight: 5, padding: 8 }]}
                    onPress={() => navigation.navigate("AddEdit", { person: item })}
                >
                    <Text style={{ color: '#fff', fontSize: 10 }}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: '#F44336', padding: 8 }]}
                    onPress={async () => {
                        await deletePerson(item.id);
                        refresh();
                    }}
                >
                    <Text style={{ color: '#fff', fontSize: 10 }}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default function HomeScreen({ navigation }) {

    // estado da lista
    const [people, setPeople] = useState([]);

    // função para carregar dados
    async function loadPeople(){

        const data = await getPeople();

        setPeople(data);
    }

    // executa ao abrir tela
    useEffect(()=>{
        loadPeople();
    },[]);

    return(

        <View style={styles.container}>

            <Text style={styles.title}>Pessoas</Text>

            <Button
                title="Adicionar Pessoa"
                onPress={()=> navigation.navigate("AddEdit")}
            />

            <FlatList
                data={people}
                keyExtractor={(item)=>item.id.toString()}

                renderItem={({item})=>(
                    <CardPersonal
                        item={item}
                        navigation={navigation}
                        refresh={loadPeople}
                    />
                )}
            />

        </View>
    );
}
