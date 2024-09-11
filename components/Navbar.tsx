import { StyleSheet, Text, View } from "react-native";
import { useGameStatus } from "@/contexts/gameStatus";

export const NAVBAR_HEIGHT = 105;

export default function Navbar() {
  const { score } = useGameStatus();

  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>SCORE: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    height: NAVBAR_HEIGHT,
    justifyContent: "flex-end",
    padding: 15,
    position: "absolute",
    top: 0,
    width: "100%",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
