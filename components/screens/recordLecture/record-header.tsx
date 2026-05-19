import { ThemedSeconderyText } from "@/components/themed-secondery-text";
import { ThemedText } from "@/components/themed-text";
import { StyleSheet, View } from "react-native";

export default function RecordHeader() {
  return (
    <View style={styles["container"]}>
      <ThemedText type="title">AI - Anik Sir</ThemedText>
      <ThemedSeconderyText type="subtitle">NLP</ThemedSeconderyText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 8,
    marginBlock: 40,
  },
});
