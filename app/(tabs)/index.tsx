import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import ThemedScrollView from "@/components/ThemedScrollView";
import SearchBar from "@/components/ui/searchBar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <ThemedScrollView>
      <SafeAreaView
        // ensure content is inset from all device safe areas (top, left, right, bottom)
        edges={["top", "left", "right", "bottom"]}
        style={{
          paddingVertical: 12,
          paddingHorizontal: 8,
          overflow: "hidden",
        }}
      >
        <View style={styles["textContainer"]}>
          <ThemedText style={{ marginBottom: 4 }} type="title">
            Hello, Sankar 👋
          </ThemedText>
          <ThemedText type="defaultSemiBold">
            What will you learn today?
          </ThemedText>
        </View>
        <SearchBar />
      </SafeAreaView>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
