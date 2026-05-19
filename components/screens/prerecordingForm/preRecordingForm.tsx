import Button from "@/components/shared/button";
import FormInput from "@/components/shared/formInput";
import ThemedScrollView from "@/components/ThemedScrollView";
import { IconSymbol } from "@/components/ui/icon-symbol";
import useNavigate from "@/hooks/navigation/navigate";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

export default function PreRecordingForm() {
  const { goBack } = useNavigate();
  const router = useRouter();
  const handleRecord = useCallback(() => {
    router.push("/(action)/record");
  }, [router]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ThemedScrollView>
        <View style={styles["container"]}>
          <View style={styles["inputContainer"]}>
            <FormInput
              palceholder="eg. John Doe"
              icon={<IconSymbol name="spatial-audio-off" />}
              label="Teacher / Sir Name"
            />
            <FormInput
              palceholder="eg. Artificial Intelligence"
              icon={<IconSymbol name="book" />}
              label="Subject"
            />
            <FormInput palceholder="eg. NLP" label="Topic (Optional)" />
          </View>
          <View style={styles["buttonContainer"]}>
            <Button
              type="primary"
              icon={<IconSymbol color="#fff" name="mic" />}
              onClick={handleRecord}
            >
              Start Recording
            </Button>
            <Button type="secondery" theme="default" onClick={goBack}>
              Cancel
            </Button>
          </View>
        </View>
      </ThemedScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingInline: 12,
    // backgroundColor: "red",
    flexGrow: 1,
    gap: 40,
  },
  inputContainer: {
    marginBlock: 16,
    flexGrow: 1,
  },
  buttonContainer: {
    marginTop: 40,
    marginBottom: 40,
    gap: 12,
  },
});
