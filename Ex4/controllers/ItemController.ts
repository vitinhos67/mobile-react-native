
import Item from '@/models/Item';
import ItemService from '@/services/ItemService';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const useItemController = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const fetchedItems = await ItemService.getAllItems();
                setItems(fetchedItems);
            } catch (error) {
                console.error("Erro ao buscar itens:", error);
                Alert.alert("Erro", "Não foi possível carregar os itens.");
                setItems([]);
            }
        };

        fetchItems();
    }, []);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [inputText, setInputText] = useState('');

    const generateId = () => Date.now().toString();

    const addItem = () => {
        if (!inputText.trim()) {
            Alert.alert('Erro', 'Digite um título');
            return;
        }

        const newItem: Item = {
            id: generateId(),
            title: inputText.trim(),
        };

        setItems([...items, newItem]);
        closeModal();
    };

    const updateItem = () => {
        if (!inputText.trim() || !editingItem) {
            Alert.alert('Erro', 'Digite um título');
            return;
        }

        setItems(items.map(item =>
            item.id === editingItem.id
                ? { ...item, title: inputText.trim() }
                : item
        ));
        closeModal();
    };

    const deleteItem = () => {
        if (!editingItem) return;

        setItems(items.filter(item => item.id !== editingItem.id));
        closeModal();
    };

    const closeModal = () => {
        setInputText('');
        setEditingItem(null);
        setModalVisible(false);
    };

    const openAddModal = () => {
        setInputText('');
        setEditingItem(null);
        setModalVisible(true);
    };

    const openEditModal = (item: Item) => {
        setInputText(item.title);
        setEditingItem(item);
        setModalVisible(true);
    };
    return {
        openEditModal,
        openAddModal,
        closeModal,
        deleteItem,
        updateItem,
        addItem,
        setInputText,
        inputText,
        editingItem,
        modalVisible,
        items
    };
};
