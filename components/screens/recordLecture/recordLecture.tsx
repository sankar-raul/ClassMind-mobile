import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import { StyleSheet } from "react-native";
import RecordActions from "./record-actions";
import RecordHeader from "./record-header";
import RecordingInfo from "./recording-info";

export default function RecordLecture() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <ThemedView style={styles["container"]}>
      <RecordHeader />
      <RecordingInfo isPaused={isPaused} />
      <RecordActions
        isPaused={isPaused}
        onTogglePause={() => setIsPaused((value) => !value)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    flex: 1,
    marginBottom: 32,
  },
});
