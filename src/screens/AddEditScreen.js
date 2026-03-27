import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";

import styles from "../styles/styles";

import { createPerson, updatePerson } from "../servers/peopleCrud";

export default function AddEditScreen({ route, navigation }) {

    const person = route.params?.person;

    const [firstName, setFirstName] = useState(person?.firstName || "");
    const [lastName, setLastName] = useState(person?.lastName || "");
    const [email, setEmail] = useState(person?.email || "");
    const [phone, setPhone] = useState(person?.phone || "");

    async function save(){

        const data = { firstName, lastName, email, phone };

        if(person){

            await updatePerson(person.id, data);

        }else{

            await createPerson(data);

        }

        navigation.goBack();
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>{person ? "Editar Contato" : "Novo Contato"}</Text>

            <View>
                <Text style={styles.formLabel}>Nome</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: Murilo"
                    placeholderTextColor="#9CA3AF"
                    value={firstName}
                    onChangeText={setFirstName}
                />

                <Text style={styles.formLabel}>Sobrenome</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: Bauck"
                    placeholderTextColor="#9CA3AF"
                    value={lastName}
                    onChangeText={setLastName}
                />

                <Text style={styles.formLabel}>E-mail</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: nome@email.com"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.formLabel}>Telefone</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: (11) 99999-9999"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                />
            </View>

            <View style={[styles.actionRow, { marginTop: 24 }]}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveButton} onPress={save}>
                    <Text style={styles.saveButtonText}>Adicionar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
