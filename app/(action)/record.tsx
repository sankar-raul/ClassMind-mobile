import RecordLecture from "@/components/screens/recordLecture/recordLecture";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";

export default function Record() {
  return (
    <ThemedSafeAreaView style={{ height: "100%" }}>
      <RecordLecture />
    </ThemedSafeAreaView>
  );
}
