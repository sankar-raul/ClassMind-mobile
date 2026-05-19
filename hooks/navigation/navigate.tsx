import { useRouter } from "expo-router";
import { useCallback } from "react";

export default function useNavigate() {
  const router = useRouter();
  const goBack = useCallback(() => {
    router.canGoBack() && router.back();
  }, [router]);
  const goto = useCallback(
    (path: string) => {
      router.push(path as any);
    },
    [router],
  );
  return {
    goBack,
    goto,
  };
}
