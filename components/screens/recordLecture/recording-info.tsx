import ActionButton from "@/components/shared/actionButton";
import { ThemedSeconderyText } from "@/components/themed-secondery-text";
import AudioWaveform from "@/components/ui/AudioWaveform";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

function formatElapsedTime(elapsedSeconds: number) {
  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

type RecordingInfoProps = {
  isPaused?: boolean;
};

export default function RecordingInfo({
  isPaused = false,
}: RecordingInfoProps) {
  const negativeColor = "#f3727f";
  const startedAtRef = useRef(Date.now());
  const pauseStartedAtRef = useRef<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (isPaused) {
      pauseStartedAtRef.current = Date.now();
      return;
    }

    if (pauseStartedAtRef.current !== null) {
      startedAtRef.current += Date.now() - pauseStartedAtRef.current;
      pauseStartedAtRef.current = null;
    }

    const tick = () => {
      setElapsedTime(
        Math.max(0, Math.floor((Date.now() - startedAtRef.current) / 1000)),
      );
    };

    tick();
    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, [isPaused]);

  const timerLabel = formatElapsedTime(elapsedTime);

  return (
    <View style={styles["container"]}>
      <View style={styles["recContainer"]}>
        <IconSymbol
          color={negativeColor}
          size={16}
          name="fiber-manual-record"
        />
        <Text style={[{ color: negativeColor }, styles["rec"]]}>REC</Text>
      </View>
      <View style={styles["middlePart"]}>
        <View style={[{}, styles["mainContainer"]]}>
          <View style={styles["waveContainer"]}>
            <View style={styles["wave"]}>
              {/* <ThemedText type="title">00:12:45</ThemedText> */}
              <AudioWaveform isPaused={isPaused} style={{ flex: 1 }} />
            </View>
            <View style={styles["timestamp"]}>
              <ThemedSeconderyText type="title">
                {timerLabel}
              </ThemedSeconderyText>
            </View>
          </View>
          <View style={styles["actionTray"]}>
            <ActionButton
              contentStyle={{ gap: 4 }}
              style={styles["actionTrayButton"]}
              theme="info"
              icon={<IconSymbol name="camera-alt" color="#fff" />}
            >
              Photo
            </ActionButton>
            <ActionButton
              contentStyle={{ gap: 4 }}
              style={styles["actionTrayButton"]}
              theme="warning"
              icon={<IconSymbol name="note-alt" color="#fff" />}
            >
              Note
            </ActionButton>
            <ActionButton
              contentStyle={{ gap: 4 }}
              style={styles["actionTrayButton"]}
              theme="negative"
              icon={<IconSymbol name="star" color="#fff" />}
            >
              Mark
            </ActionButton>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    flex: 1,
    flexGrow: 1,
  },
  wave: {
    flex: 1,
  },
  timestamp: {
    alignItems: "center",
    justifyContent: "center",
  },
  middlePart: {
    flex: 1,
    justifyContent: "center",
  },
  mainContainer: {
    flexDirection: "row",
    marginInline: 12,
  },
  waveContainer: {
    flex: 1,
  },
  actionTray: {
    gap: 16,
    marginBlock: 12,
  },
  actionTrayButton: {
    padding: 0,
    width: 52,
  },
  rec: {
    fontWeight: 600,
    fontSize: 16,
  },
  recContainer: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
