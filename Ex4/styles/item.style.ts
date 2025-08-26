import { StyleSheet } from "react-native";

export const ItemsStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: '#ddd',
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dialog: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 8,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#ddd',
        padding: 8,
        flex: 1,
        marginHorizontal: 4,
        alignItems: 'center',
        borderRadius: 4,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
    },
    deleteButton: {
        backgroundColor: '#ffebee',
    },
    deleteButtonText: {
        color: '#d32f2f',
    },
});