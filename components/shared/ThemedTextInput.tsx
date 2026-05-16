import TextInputProps from "@/@types/props/text-input.props";
import { Colors } from "@/constants/theme";
import { useCallback } from "react";
import {
  Pressable,
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
      <IconSymbol
        style={{
          paddingVertical: 4,
          paddingLeft: 6,
        }}
        name="search"
        color={icon}
      />
      <TextInput
        numberOfLines={1}
        multiline={false}
        placeholder={placeholder || "Start typing..."}
        placeholderTextColor={textSecondary}
        style={[{ color: text }, Styles["inputBox"], style]}
        cursorColor={tint}
        value={value}
        onChange={handleTextInput}
      />
      <Pressable
        android_ripple={{
          // color: "#fff1",
          foreground: true,
          borderless: true,
        }}
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 0,
          marginRight: 16,
          alignSelf: "stretch",
          marginLeft: 4,
        }}
      >
        <IconSymbol name="mic" color={icon} />
      </Pressable>
    </View>
  );
}

const Styles = StyleSheet.create({
  inputBox: {
    padding: 12,
    flexGrow: 1,
    flexShrink: 0,
    paddingVertical: 16,
    // marginRight: 12,
    // backgroundColor: "#ddd",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    flexGrow: 1,
    borderRadius: 32,
    // paddingVertical: 4,
    paddingLeft: 6,
    // overflow: "hidden",
  },
});
