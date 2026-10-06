import { FilterStatus } from "@/types/FilterStatus";
import {TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { styles } from "./styles";
import { StatusIcon } from "../StatusIcon";

type Props = TouchableOpacityProps & {
    status: FilterStatus
    isActive: boolean
};

const FILTER_LABELS: Record<FilterStatus, string> = {
    [FilterStatus.AGUARDANDO]: "Aguardando",
    [FilterStatus.APROVADO]: "Aprovados",
    [FilterStatus.CANCELADO]: "Cancelados",
};

export function Filter({ status, isActive, ...rest }: Props ) {
  return (
    <TouchableOpacity 
        {...rest} 
        style={ [styles.container, {opacity: isActive ? 1 : 0.5}] }
        activeOpacity={0.8}    
    >
        <StatusIcon status={status} />
        <Text style={ styles.title }>
            {FILTER_LABELS[status]}
        </Text>
    </TouchableOpacity>
  );
}