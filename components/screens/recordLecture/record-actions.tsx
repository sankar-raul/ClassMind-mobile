import ActionButton from "@/components/shared/actionButton";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useThemeColor } from "@/hooks/use-theme-color";
import { StyleSheet, View } from "react-native";

type RecordActionsProps = {
  isPaused?: boolean;
  onTogglePause?: () => void;
};

export default function RecordActions({
  isPaused = false,
  onTogglePause,
}: RecordActionsProps) {
  const textColor = useThemeColor({}, "text");

  return (
    <View>
      <View style={styles["buttonContainer"]}>
        <ActionButton
          style={styles["buttonStyle"]}
          type="secondery"
          theme="negative"
          onClick={onTogglePause}
          icon={
            <IconSymbol
              size={44}
              style={styles["icon"]}
              name={isPaused ? "play-arrow" : "pause"}
              color={textColor}
            />
          }
        >
          {isPaused ? "Resume" : "Pause"}
        </ActionButton>
        <ActionButton
          style={styles["buttonStyle"]}
          type="primary"
          theme="negative"
          icon={
            <IconSymbol
              size={44}
              style={styles["icon"]}
              name="stop"
              color="#fff"
            />
          }
        >
          Stop
        </ActionButton>
        <ActionButton
          style={styles["buttonStyle"]}
          type="secondery"
          icon={
            <IconSymbol
              size={44}
              style={styles["icon"]}
              name="done"
              color={textColor}
            />
          }
        >
          Finish
        </ActionButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {},
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    // aspectRatio: "1/1",
  },
  buttonStyle: {
    aspectRatio: "1/1",
    // height: 100,
    flex: 0,
    flexGrow: 0,
    // maxWidth does not accept "max-content" in React Native; use undefined or a numeric value
    maxWidth: undefined,
  },
});
