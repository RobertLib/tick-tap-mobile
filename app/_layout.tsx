import { GameStatusProvider } from "@/contexts/gameStatus";
import { setStatusBarStyle } from "expo-status-bar";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    setStatusBarStyle("light");
  }, []);

  return (
    <GameStatusProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="game" options={{ headerShown: false }} />
      </Stack>
    </GameStatusProvider>
  );
}
