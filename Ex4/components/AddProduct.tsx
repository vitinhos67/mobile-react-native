import React from 'react';
import {
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';


const AddProduct = (controller: any, ItemsStyles: any) => (
        <Modal
            visible={controller.modalVisible}
            transparent={true}
            animationType="fade"
        >
            <View style={ItemsStyles.modalOverlay}>
                <View style={ItemsStyles.dialog}>
                    <Text style={ItemsStyles.modalTitle}>
                        {controller.editingItem ? 'Editar Item' : 'Novo Item'}
                    </Text>

                    <TextInput
                        style={ItemsStyles.input}
                        placeholder="Digite o título"
                        value={controller.inputText}
                        onChangeText={controller.setInputText}
                    />

                    <View style={ItemsStyles.buttons}>
                        <TouchableOpacity style={ItemsStyles.button} onPress={controller.closeModal}>
                            <Text style={ItemsStyles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>

                        {controller.editingItem && (
                            <TouchableOpacity style={[ItemsStyles.button, ItemsStyles.deleteButton]} onPress={controller.deleteItem}>
                                <Text style={[ItemsStyles.buttonText, ItemsStyles.deleteButtonText]}>Excluir</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            style={ItemsStyles.button}
                            onPress={controller.editingItem ? controller.updateItem : controller.addItem}
                        >
                            <Text style={ItemsStyles.buttonText}>
                                {controller.editingItem ? 'Salvar' : 'Adicionar'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
);

export default AddProduct;