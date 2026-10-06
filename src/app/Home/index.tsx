
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './style';
import { BOOTSTRAP_COLORS } from '@/variables/Collors';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { FilterStatus } from '@/types/FilterStatus';
import { useEffect, useState } from 'react';
import { Filter } from '@/components/Filter';
import { itemsStorage, ItemStorage } from '@/storage/itemsStorage';
import { Item } from '@/components/Item';

// ORÇAMENTO SIMPLES
// CAMPOS
// id = 0394did
// descrição do Serviço = Alteração no motor
// valor = R$ 150,00
// quantidade = 1
// data = 06/10/2026
// status = 🟡 Aguardando / 🟢 Aprovado / 🔴 Cancelado
// total = R$ 150,00

const FILTER_STATUS: FilterStatus[] = [
    FilterStatus.AGUARDANDO,
    FilterStatus.APROVADO,
    FilterStatus.CANCELADO,
];

function parsePrice(value: unknown): number | null {
    if (typeof value !== 'string') {
        return null;
    }

    const normalized = value.trim().replace(',', '.');
    if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
        return null;
    }

    const price = Number(normalized);
    return Number.isFinite(price) ? price : null;
}

function parseQuantity(value: unknown): number | null {
    if (typeof value !== 'string' || !/^[1-9]\d*$/.test(value.trim())) {
        return null;
    }

    const quantity = Number(value);
    return Number.isSafeInteger(quantity) ? quantity : null;
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

export default function App() {
    const [filter, setFilter] = useState<FilterStatus>(FilterStatus.AGUARDANDO);
    const [description, setDescription] = useState<string>('');
    const [quantidade, setQuantidade] = useState<string>('');
    const [preco, setPreco] = useState<string>('');
    const [items, setItems] = useState<ItemStorage[]>([]);
    const [allItems, setAllItems] = useState<ItemStorage[]>([]);

    async function itemByStatus() {
        try {
            const storedItems = await itemsStorage.get();
            setAllItems(storedItems);
            setItems(storedItems.filter(item => item.status === filter));
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível filtrar os itens');
        }
    }

    async function handleAddItem() {
        if (!description.trim()) {
            return Alert.alert('Atenção', 'Digite o nome do serviço');
        }
        if (!quantidade.trim()) {
            return Alert.alert('Atenção', 'Digite quantidade');
        }

        const parsedQuantity = parseQuantity(quantidade);
        if (parsedQuantity === null) {
            return Alert.alert('Atenção', 'Digite uma quantidade inteira maior que zero');
        }

        const parsedPrice = parsePrice(preco);
        if (parsedPrice === null || parsedPrice <= 0) {
            return Alert.alert('Atenção', 'Digite um preço válido, usando até duas casas decimais');
        }

        const newItem = {
            id: Math.random().toString(36).substring(2),
            status: FilterStatus.AGUARDANDO,
            description,
            preco,
            quantidade,
        }

        try {
            await itemsStorage.add(newItem);
            await itemByStatus();
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível adicionar o serviço');
            return;
        }

        Alert.alert('Adicionado', `O item ${description} foi adicionado a lista`);
        setDescription('');
        setQuantidade('');
        setPreco('');
        setFilter(FilterStatus.AGUARDANDO);

    }

    function handlerClear() {
        Alert.alert(
            'Limpar itens',
            'Tem certeza que deseja limpar todos os itens?',
            [
                {
                    text: 'Não',
                    style: 'cancel',
                },
                {
                    text: 'Sim',
                    onPress: async () => {
                        try {
                            await itemsStorage.clear();
                            setItems([]);
                            setAllItems([]);
                        } catch (error) {
                            console.error(error);
                            Alert.alert('Erro', 'Não foi possível limpar os itens');
                        }
                    },
                },
            ],
        );

    }

    async function handleToggleStatus(id: string) {
        try {
            await itemsStorage.toggleStatus(id);
            await itemByStatus();
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível alterar o status do item');
        }

    }

    async function handleRemove(id: string) {
        try {
            await itemsStorage.remove(id);
            await itemByStatus();
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível remover o item');
        }
    }

    const budgetItems = allItems.filter(item => item.status !== FilterStatus.CANCELADO);
    const pricingIsValid = budgetItems.every(item =>
        parsePrice(item.preco) !== null && parseQuantity(item.quantidade) !== null,
    );
    const totalServices = budgetItems.reduce(
        (total, item) => total + (parseQuantity(item.quantidade) ?? 0),
        0,
    );
    const subtotalCents = budgetItems.reduce((total, item) => {
        const unitPrice = parsePrice(item.preco);
        const itemQuantity = parseQuantity(item.quantidade);
        if (unitPrice === null || itemQuantity === null) {
            return total;
        }
        return total + Math.round(unitPrice * 100) * itemQuantity;
    }, 0);
    const discountRate = totalServices === 5 ? 0.05 : totalServices > 5 ? 0.1 : 0;
    const discountCents = Math.round(subtotalCents * discountRate);
    const totalCents = subtotalCents - discountCents;

    useEffect(() => {
        let isCurrent = true;

        async function loadItems() {
            try {
                const storedItems = await itemsStorage.get();
                if (isCurrent) {
                    setAllItems(storedItems);
                    setItems(storedItems.filter(item => item.status === filter));
                }
            } catch (error) {
                console.error(error);
                if (isCurrent) {
                    Alert.alert('Erro', 'Não foi possível carregar os itens');
                }
            }
        }

        void loadItems();
        return () => {
            isCurrent = false;
        };
    }, [filter]);

    return (
        <View style={styles.container}>
            <View style={styles.headerTitle}>
                <MaterialIcons name='note-alt' size={64} color={BOOTSTRAP_COLORS.success.bg} />
                <Text style={styles.titulo}>Orçamento de Serviços</Text>
            </View>
            <View style={styles.form}>
                <Input
                    placeholder='Digite o tipo de serviço'
                    onChangeText={setDescription}
                    value={description}
                />
                <Input
                    placeholder='Digite a quantidade'
                    onChangeText={setQuantidade}
                    value={quantidade}
                />
                <Input
                    placeholder='Preço unitário (ex.: 150,00)'
                    onChangeText={setPreco}
                    value={preco}
                />
                <Button variant="primary" title="Adicionar" onPress={handleAddItem} />
            </View>
            <View style={styles.content}>
                <View style={styles.header}>
                    {
                        FILTER_STATUS.map((status) => (
                            <Filter
                                key={status}
                                status={status}
                                isActive={status === filter}
                                onPress={() => setFilter(status)}
                            />
                        ))
                    }
                    <TouchableOpacity style={styles.clearButton} onPress={handlerClear}>
                        <Text style={styles.clearButtonText}>Limpar</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Item
                            data={item}
                            onStatus={() => handleToggleStatus(item.id)}
                            onRemove={() => handleRemove(item.id)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    contentContainerStyle={styles.listContent}
                    ListHeaderComponent={() => (
                        <View style={styles.listHeader}>
                            <Text style={styles.listHeaderDescription}>Serviço</Text>
                            <Text style={styles.listHeaderQuantity}>Quantidade</Text>
                            <Text style={styles.listHeaderAction}></Text>
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>
                            Nenhum item encontrado.
                        </Text>
                    )}
                />
                <View style={styles.rodape}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal</Text>
                        <Text style={styles.summaryValue}>
                            {pricingIsValid ? currencyFormatter.format(subtotalCents / 100) : '—'}
                        </Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>
                            Desconto ({Math.round(discountRate * 100)}%)
                        </Text>
                        <Text style={styles.summaryValue}>
                            {pricingIsValid
                                ? `- ${currencyFormatter.format(discountCents / 100)}`
                                : '—'}
                        </Text>
                    </View>
                    <View style={[styles.summaryRow, styles.totalRow]}>
                        <Text style={styles.total}>Total do orçamento</Text>
                        <Text style={[styles.valor, styles.totalValue]}>
                            {pricingIsValid ? currencyFormatter.format(totalCents / 100) : '—'}
                        </Text>
                    </View>
                    {!pricingIsValid && (
                        <Text style={styles.pricingWarning}>
                            Há serviços sem preço ou quantidade válidos. Remova-os e cadastre-os novamente.
                        </Text>
                    )}
                </View>

            </View>
        </View>
    );
}