import { useThemeColor } from "@/hooks/use-theme-color";
import { ReactNode, useCallback } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputChangeEvent,
  View,
} from "react-native";
import { ThemedText } from "../themed-text";

export interface FormInputProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  icon?: ReactNode;
  palceholder?: string;
}

export default function FormInput({
  icon,
  label,
  onChange,
  value,
  palceholder,
}: FormInputProps) {
  const textColor = useThemeColor({}, "text");
  const surfaceColor = useThemeColor({}, "surface");
  const mutedTextColor = useThemeColor({}, "textSecondary");
  const cursorColor = useThemeColor({}, "tint");
  const handleChange = useCallback(
    (e: TextInputChangeEvent) => {
      onChange?.(e.nativeEvent.text);
    },
    [onChange],
  );
  return (
    <View style={[styles["container"]]}>
      <ThemedText type="default">{label}</ThemedText>
      <View
        style={[
          {
            borderColor: surfaceColor,
            backgroundColor: surfaceColor,
          },
          styles["inputContainer"],
        ]}
      >
        <TextInput
          numberOfLines={1}
          multiline={false}
          placeholderTextColor={mutedTextColor}
          cursorColor={cursorColor}
          placeholder={palceholder || ""}
          style={[
            {
              color: textColor,
            },
            styles["input"],
          ]}
          value={value}
          onChange={handleChange}
        />
        <View
          style={{
            flexShrink: 0,
          }}
        >
          {icon ?? icon}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBlock: 8,
    gap: 12,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 30,
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    paddingInline: 12,
  },
  input: {
    padding: 12,
    // flexGrow: 1,
    flex: 1,
    paddingVertical: 16,
  },
});
