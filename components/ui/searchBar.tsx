import { Colors } from "@/constants/theme";
import { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, useColorScheme, View } from "react-native";
import ThemedTextInput from "../shared/ThemedTextInput";
import { IconSymbol } from "./icon-symbol";

export default function SearchBar() {
  const theme = useColorScheme() ?? "light";
  const { icon, textSecondary, text, tint, surface } = Colors[theme];
  const [query, setQuery] = useState<string>("");

  const onQuery = useCallback(
    (q: string) => {
      setQuery(q);
    },
    [setQuery],
  );

  useEffect(() => {
    console.log(query);
  }, [query]);
  return (
    <View style={styles["container"]}>
      <ThemedTextInput
        style={[styles["search-input"]]}
        placeholder="Ask Anything..."
        value={query}
        onChange={onQuery}
      />
      <Pressable
        android_ripple={{
          color: "#fff2",
          foreground: true,
          borderless: true,
        }}
        style={[
          {
            backgroundColor: surface,
            borderRadius: "50%",
          },
          styles["camera"],
        ]}
      >
        <IconSymbol color={icon} name="camera-alt" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gridTemplateRows: "1fr max-content",
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: 12,
    // backgroundColor: "red",
    alignItems: "center",
    maxWidth: "100%",
  },
  "search-input": {},
  camera: {
    alignSelf: "center",
    flexShrink: 0,
    padding: 8,
    aspectRatio: "1/1",
  },
});
