
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FilterStatus} from '@/types/FilterStatus';


const ITEMS_STORAGE_KEY = '@orcamento:items';

const NEXT_STATUS: Record<FilterStatus, FilterStatus> = {
    [FilterStatus.AGUARDANDO]: FilterStatus.APROVADO,
    [FilterStatus.APROVADO]: FilterStatus.CANCELADO,
    [FilterStatus.CANCELADO]: FilterStatus.AGUARDANDO,
};

export type ItemStorage = {
    id: string;
    status: FilterStatus;
    description: string;
    quantidade: string,
    preco: string;
}

async function get(): Promise<ItemStorage[]> {
    try {
        const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);
        const items: ItemStorage[] = storage ? JSON.parse(storage) : [];
        return items;
    } catch (error) {
        throw new Error("ITEMS_GET: " + error);
    }
}

async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
    try {
        const items = await get();
        return items.filter(item => item.status === status);
    } catch (error) {
        throw new Error("ITEMS_GET_BY_STATUS: " + error);
    }
}

async function save(items: ItemStorage[]): Promise<void> {
    try {
        await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));   

    } catch (error) {
        throw new Error("ITEMS_SAVE: " + error);
    }
}

async function add(newItem: ItemStorage): Promise<ItemStorage[]> {
    try {
        const items = await get();
        const updateItems = [...items, newItem];
        await save(updateItems);
        return updateItems;
    }
    catch (error) {
        throw new Error("ITEMS_ADD: " + error);
    }
}

async function remove(id: string): Promise<void> {
    try {
        const items = await get();
        const updateItems = items.filter(item => item.id !== id);
        await save(updateItems);        
    }
    catch (error) {
        throw new Error("ITEMS_REMOVE: " + error);
    }
}

async function clear(): Promise<void> {
    try {
        await AsyncStorage.removeItem(ITEMS_STORAGE_KEY);
    } catch (error) {
        throw new Error("ITEMS_CLEAR: " + error);
    }
}

async function toggleStatus(id: string): Promise<void> {
    try {
        const items = await get();
        const updateItems = items.map(item => {
            if (item.id === id) {
                return { ...item, status: NEXT_STATUS[item.status] };
            }
            return item;
        });
        await save(updateItems);
    }   
    catch (error) {
        throw new Error("ITEMS_TOGGLE_STATUS: " + error);
    }
}

export const itemsStorage = {
    get,
    getByStatus,
    save,
    add,
    remove,
    clear,
    toggleStatus
}