
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons} from '@expo/vector-icons';
import { styles } from './style';
import { BOOTSTRAP_COLORS } from '@/variables/Collors';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { FilterStatus } from '@/types/FilterStatus';
import { useState } from 'react';
import { Filter } from '@/components/Filter';

// ORÇAMENTO SIMPLES
// CAMPOS
// id = 001/2026
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

export default function App() {
    const [filter, setFilter] = useState<FilterStatus>(FilterStatus.AGUARDANDO);
    const [description, setDescription] = useState<string>('');
    const [quantidade, setQuantidade] = useState<string>('');
    const [desconto, setDesconto] = useState<string>('');

    function handlerClear() {

    }

    return (
        <View style={styles.container}>
            <View style={styles.headerTitle}>
                <MaterialIcons name='note-alt' size={64} color={BOOTSTRAP_COLORS.success.bg }/>
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
                    placeholder='Digite o desconto a ser aplicado'
                    onChangeText={setDesconto}
                    value={desconto}
                />
                <Button variant="primary" title="Adicionar" onPress={() => {}} />
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
            </View>
        </View>
    );
}