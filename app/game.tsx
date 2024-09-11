import { Dimensions, StyleSheet, View } from "react-native";
import { randomUUID } from "expo-crypto";
import { useEffect, useState } from "react";
import { useGameStatus } from "@/contexts/gameStatus";
import Circle, { CIRCLE_SIZE } from "@/components/Circle";
import Navbar, { NAVBAR_HEIGHT } from "@/components/Navbar";
import Svg, { Line } from "react-native-svg";

export default function Game() {
  const [circles, setCircles] = useState<
    { id: string; x: number; y: number }[]
  >([]);

  const { width, height } = Dimensions.get("window");

  const { setScore } = useGameStatus();

  useEffect(() => {
    function newCircle() {
      return {
        id: randomUUID(),
        x: Math.random() * (width - CIRCLE_SIZE * 1.5) + CIRCLE_SIZE / 4,
        y:
          Math.random() * (height - CIRCLE_SIZE * 1.5 - NAVBAR_HEIGHT) +
          CIRCLE_SIZE / 4 +
          NAVBAR_HEIGHT,
      };
    }

    setCircles([newCircle()]);

    const interval = setInterval(() => {
      setCircles((prev) => [...prev, newCircle()]);
    }, 1250);

    return () => clearInterval(interval);
  }, []);

  function handleFinish(id: string) {
    setCircles((prev) => prev.filter((circle) => circle.id !== id));
  }

  return (
    <View style={styles.container}>
      <Navbar />
      <Svg style={StyleSheet.absoluteFill}>
        {circles.map((circle, index) => {
          if (index === 0) return null;

          const prevCircle = circles[index - 1];

          return (
            <Line
              key={`line-${circle.id}`}
              stroke="rgba(200, 200, 255, 0.125)"
              strokeWidth="3"
              x1={prevCircle.x + CIRCLE_SIZE / 2}
              x2={circle.x + CIRCLE_SIZE / 2}
              y1={prevCircle.y + CIRCLE_SIZE / 2}
              y2={circle.y + CIRCLE_SIZE / 2}
            />
          );
        })}
      </Svg>
      {circles.map(({ id, x, y }) => (
        <Circle
          key={id}
          x={x}
          y={y}
          onPress={() => {
            setScore((prev) => prev + 100);
            handleFinish(id);
          }}
          onFinish={() => handleFinish(id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#112",
    flex: 1,
    position: "relative",
  },
});
