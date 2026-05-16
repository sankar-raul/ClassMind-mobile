import TextInputProps from "@/@types/props/text-input.props";
import { Colors } from "@/constants/theme";
import { useCallback } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputChangeEvent,
  useColorScheme,
  View,
} from "react-native";
import { IconSymbol } from "../ui/icon-symbol";

export default function ThemedTextInput({
  onChange,
  value,
  placeholder,
  style,
  containerStyle,
}: TextInputProps) {
  const theme = useColorScheme() ?? "light";
  const { textSecondary, text, tint, surface, icon } = Colors[theme];

  const handleTextInput = useCallback(
    (e: TextInputChangeEvent) => {
      onChange(e.nativeEvent.text);
    },
    [onChange],
  );

  return (
    <View
      style={[
        {
          backgroundColor: surface,
        },
        Styles["container"],
        containerStyle,
      ]}
    >
      <IconSymbol name="search" color={icon} />
      <TextInput
        numberOfLines={1}
        multiline={false}
        placeholder={placeholder || "Start typing..."}
        placeholderTextColor={textSecondary}
        style={[{ color: text }, Styles["inputBox"], style]}
        cursorColor={tint}
        defaultValue={value}
        onChange={handleTextInput}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  inputBox: {
    padding: 12,
    flexGrow: 1,
    flexShrink: 0,
    marginRight: 12,
    // backgroundColor: "#ddd",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    gap: 0,
    flexGrow: 1,
    borderRadius: 32,
    paddingBlock: 4,
    paddingInline: 12,
  },
});
