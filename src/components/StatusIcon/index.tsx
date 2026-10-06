import { FilterStatus } from "@/types/FilterStatus";
import { CircleCheck, CircleDashed, CircleX } from "lucide-react-native";



export function StatusIcon({ status }: {status: FilterStatus}) {
    return (
        status === FilterStatus.APROVADO
            ? <CircleCheck color="#2c46b1" size={18} />
            : status === FilterStatus.CANCELADO
                ? <CircleX color="#dc3545" size={18} />
                : <CircleDashed color="#000" size={18} />
    )
}
