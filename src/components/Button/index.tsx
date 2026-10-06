import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { BOOTSTRAP_COLORS } from "@/variables/Collors";
import { styles } from "./styles";

type ButtonProps = TouchableOpacityProps & {
  variant?: keyof typeof BOOTSTRAP_COLORS;
  title?: string;
};

export function Button({ variant = "primary", title = "Button", ...rest }: ButtonProps) {
  const colors = BOOTSTRAP_COLORS[variant];

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: colors.bg }]} {...rest}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
    </TouchableOpacity>
  );
}