import { useThemeColor } from "@/hooks/use-theme-color";
import { useCallback } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../themed-text";
import { IconSymbol, IconSymbolName } from "../ui/icon-symbol";

export interface ActionCardProps {
  label: string;
  iconName: IconSymbolName;
  onClick?: () => void;
  color?: string;
}

export default function ActionCard({
  iconName,
  label,
  onClick,
  color,
}: ActionCardProps) {
  const backgroundColor = useThemeColor({}, "surface");
  const icon = useThemeColor({}, "icon");
  const handleClick = useCallback(() => {
    console.log("okkgkugp");
    onClick?.();
  }, [onClick]);
  return (
    <TouchableOpacity
      style={[{ backgroundColor: backgroundColor }, styles["container"]]}
      onPress={handleClick}
      activeOpacity={0.6}
    >
      <IconSymbol
        style={{ marginBottom: 8 }}
        name={iconName}
        color={color || icon}
      />
      <ThemedText style={{ textAlign: "center", fontSize: 14 }}>
        {label}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexBasis: "23%",
    maxWidth: "23%",
    minWidth: 0,
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 8,
    textAlign: "center",
    borderRadius: 16,
    padding: 12,
    paddingBlock: 12,
  },
});
