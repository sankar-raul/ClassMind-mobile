import { Stack } from "expo-router";
import "react-native-reanimated";

export default function ActionLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="pre-recording"
        options={{ title: "Start Recording" }}
      />
      <Stack.Screen name="record" options={{ headerShown: false }} />
    </Stack>
  );
}
