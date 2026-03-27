import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:"#f5f5f5"
    },
    title:{
        fontSize:22,
        textAlign:"center",
        marginBottom:20
    },
    card:{
        flexDirection:"column",
        backgroundColor:"#fff",
        padding:15,
        marginBottom:10,
        borderRadius:5,
        borderWidth: 2,
        borderColor: "#000"
    },
    name:{
        fontSize:16,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    column: {
        flex: 1,
        alignItems: "center",
        marginHorizontal: 5
    },
    infoText: {
        fontSize: 14,
        marginBottom: 5,
        textAlign: "center"
    },
    button:{
        padding:10,
        backgroundColor:"#4CAF50",
        borderRadius:5
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff'
    }
});
