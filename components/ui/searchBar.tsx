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
        style={[styles.camera, { backgroundColor: tint }]}
      >
        <IconSymbol color="#fff" name="camera-alt" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 12,
  },
  "search-input": {
    flex: 1,
  },
  camera: {
    alignSelf: "center",
    flexShrink: 0,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
});
