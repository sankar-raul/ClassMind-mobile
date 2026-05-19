import { useEffect, useMemo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
    cancelAnimation,
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

import { useThemeColor } from "@/hooks/use-theme-color";

export interface AudioWaveformProps {
  isRecording?: boolean;
  isPaused?: boolean;
  color?: string;
  barCount?: number;
  minHeight?: number;
  maxHeight?: number;
  style?: StyleProp<ViewStyle>;
}

type BarConfig = {
  id: number;
  envelope: number;
  restPercent: number;
  seed: number;
};

type WaveBarProps = {
  config: BarConfig;
  isRecording: boolean;
  isPaused: boolean;
  color: string;
  minHeight: number;
  maxHeight: number;
};

function WaveBar({
  config,
  isRecording,
  isPaused,
  color,
  minHeight,
  maxHeight,
}: WaveBarProps) {
  const barScale = useSharedValue(config.restPercent / 100);

  useEffect(() => {
    const shouldAnimate = isRecording && !isPaused;

    if (!shouldAnimate) {
      cancelAnimation(barScale);
      barScale.value = withTiming(config.restPercent / 100, {
        duration: 220,
        easing: Easing.out(Easing.cubic),
      });
      return;
    }

    const range = Math.max(1, maxHeight - minHeight);
    const amplitudeJitter = 0.88 + Math.random() * 0.24;
    const tempoJitter = 0.78 + Math.random() * 0.24;
    const delayJitter = 0.75 + Math.random() * 0.5;
    const lowPercent = Math.max(
      minHeight,
      minHeight + range * (0.12 + config.envelope * 0.16 * amplitudeJitter),
    );
    const highPercent = Math.min(
      maxHeight,
      minHeight + range * (0.45 + config.envelope * 0.5 * amplitudeJitter),
    );
    const midPercent = Math.max(
      minHeight,
      lowPercent + (highPercent - lowPercent) * (0.4 + config.seed * 0.2),
    );

    const forwardDuration = Math.round(
      (280 + (1 - config.envelope) * 140) * tempoJitter,
    );
    const settleDuration = Math.round((220 + config.seed * 110) * tempoJitter);
    const backDuration = Math.round((340 + config.seed * 150) * tempoJitter);
    const delay = Math.round(config.seed * 130 * delayJitter);

    barScale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(highPercent / 100, {
            duration: forwardDuration,
            easing: Easing.out(Easing.cubic),
          }),
          withTiming(midPercent / 100, {
            duration: settleDuration,
            easing: Easing.inOut(Easing.quad),
          }),
          withTiming(lowPercent / 100, {
            duration: backDuration,
            easing: Easing.inOut(Easing.cubic),
          }),
        ),
        -1,
        false,
      ),
    );

    return () => {
      cancelAnimation(barScale);
    };
  }, [
    config.envelope,
    config.restPercent,
    config.seed,
    barScale,
    isPaused,
    isRecording,
    maxHeight,
    minHeight,
  ]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: barScale.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.bar,
        {
          backgroundColor: color,
          shadowColor: color,
        },
        animatedStyle,
      ]}
    />
  );
}

export default function AudioWaveform({
  isRecording = true,
  isPaused = false,
  color,
  barCount = 39,
  minHeight = 6,
  maxHeight = 52,
  style,
}: AudioWaveformProps) {
  const tintColor = useThemeColor({}, "tint");
  const resolvedColor = color ?? tintColor;

  const resolvedBarCount = Math.min(81, Math.max(9, Math.round(barCount)));
  const safeMinHeight = Math.min(96, Math.max(2, minHeight));
  const safeMaxHeight = Math.min(100, Math.max(safeMinHeight + 4, maxHeight));

  const bars = useMemo<BarConfig[]>(() => {
    const center = (resolvedBarCount - 1) / 2;
    const range = safeMaxHeight - safeMinHeight;

    return Array.from({ length: resolvedBarCount }, (_, index) => {
      const distance = Math.abs(index - center) / Math.max(1, center);
      const envelope = Math.max(0.12, 1 - Math.pow(distance, 1.45));
      const restPercent = safeMinHeight + range * (0.16 + envelope * 0.16);
      const seed = ((index * 37 + 17) % 100) / 100;

      return {
        id: index,
        envelope,
        restPercent,
        seed,
      };
    });
  }, [resolvedBarCount, safeMaxHeight, safeMinHeight]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        {bars.map((bar) => (
          <WaveBar
            key={bar.id}
            config={bar}
            isRecording={isRecording}
            isPaused={isPaused}
            color={resolvedColor}
            minHeight={safeMinHeight}
            maxHeight={safeMaxHeight}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 18,
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  row: {
    overflow: "hidden",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 4,
  },
  bar: {
    height: "100%",
    width: 4,
    borderRadius: 999,
    opacity: 0.95,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 5,
    elevation: 2,
  },
});
