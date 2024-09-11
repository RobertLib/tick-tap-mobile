import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

export const CIRCLE_SIZE = 80;

const MAX_COUNT = 5;

export default function Circle({
  x,
  y,
  onPress,
  onFinish,
}: Readonly<{
  x: number;
  y: number;
  onPress?: () => void;
  onFinish?: () => void;
}>) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => {
        if (count >= MAX_COUNT) {
          clearInterval(interval);
          onFinish?.();
          return count;
        }

        return count + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.circle, { left: x, top: y }]}
    >
      <Text style={styles.count}>{count}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: "center",
    backgroundColor: "rgba(200, 200, 255, 0.125)",
    borderRadius: CIRCLE_SIZE / 2,
    height: CIRCLE_SIZE,
    justifyContent: "center",
    position: "absolute",
    width: CIRCLE_SIZE,
  },
  count: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
  },
});
