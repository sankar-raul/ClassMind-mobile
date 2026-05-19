import { Colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { ThemedView } from "../themed-view";
import ActionCard, { ActionCardProps } from "./ActionCard";

export default function ActionTiles() {
  const theme = useColorScheme();
  const { announcement, warning, tint, pink } = Colors[theme || "light"];
  const router = useRouter();
  const actions = useMemo<ActionCardProps[]>(
    () => [
      {
        label: "Record Lecture",
        iconName: "mic",
        color: tint,
        onClick: () => {
          router.push("/(action)/pre-recording");
        },
      },
      {
        label: "Capture Notes",
        iconName: "camera-alt",
        color: pink,
      },
      {
        label: "Upload File",
        iconName: "upload-file",
        color: announcement,
      },
      {
        label: "Add Notes",
        iconName: "note-alt",
        color: warning,
      },
    ],
    [announcement, pink, tint, warning, router],
  );

  return (
    <ThemedView style={[{}, styles["container"]]}>
      {actions.map((action, index) => (
        <ActionCard
          key={index}
          iconName={action.iconName}
          label={action.label}
          color={action.color}
          onClick={action.onClick}
        />
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "stretch",
    paddingHorizontal: 8,
    flex: 1,
  },
});
