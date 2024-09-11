import { Dimensions, StyleSheet, View } from "react-native";
import { useRef } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

function Circle({
  animatedStyle,
  i,
  j,
  k,
}: Readonly<{
  animatedStyle: any;
  i: number;
  j: number;
  k: number;
}>) {
  const rand = useRef(Math.random() * 0.125).current;
  const opacity = useSharedValue(rand);

  opacity.value = withRepeat(
    withSequence(
      withTiming(rand, { duration: 2500 }),
      withTiming(rand * 1.5, { duration: 5000 }),
      withTiming(rand, { duration: 2500 })
    ),
    -1,
    false
  );

  const animatedBackground = useAnimatedStyle(() => ({
    backgroundColor: `rgba(200, 200, 255, ${opacity.value})`,
  }));

  return (
    <Animated.View
      style={[
        styles.circle,
        animatedStyle[k],
        animatedBackground,
        { top: i * circleSize, left: j * circleSize },
      ]}
    />
  );
}

const DURATION = 20000;

const { width, height } = Dimensions.get("window");

const circleSize = width / 5;
const bottom = Math.ceil(height / circleSize) * circleSize;

const AnimatedBackground = () => {
  const translateX1 = useSharedValue(0);
  const translateY1 = useSharedValue(0);
  const translateX2 = useSharedValue(-width);
  const translateY2 = useSharedValue(0);
  const translateX3 = useSharedValue(0);
  const translateY3 = useSharedValue(-bottom);
  const translateX4 = useSharedValue(-width);
  const translateY4 = useSharedValue(-bottom);

  translateX1.value = withRepeat(
    withTiming(width, { duration: DURATION, easing: Easing.linear }),
    -1,
    false
  );
  translateY1.value = withRepeat(
    withTiming(bottom, { duration: DURATION, easing: Easing.linear }),
    -1,
    false
  );
  translateX2.value = withRepeat(
    withTiming(0, { duration: DURATION, easing: Easing.linear }),
    -1,
    false
  );
  translateY2.value = withRepeat(
    withTiming(bottom, { duration: DURATION, easing: Easing.linear }),
    -1,
    false
  );
  translateX3.value = withRepeat(
    withTiming(width, { duration: DURATION, easing: Easing.linear }),
    -1,
    false
  );
  translateY3.value = withRepeat(
    withTiming(0, { duration: DURATION, easing: Easing.linear }),
    -1,
    false
  );
  translateX4.value = withRepeat(
    withTiming(0, { duration: DURATION, easing: Easing.linear }),
    -1,
    false
  );
  translateY4.value = withRepeat(
    withTiming(0, { duration: DURATION, easing: Easing.linear }),
    -1,
    false
  );

  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX1.value },
      { translateY: translateY1.value },
    ],
  }));
  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX2.value },
      { translateY: translateY2.value },
    ],
  }));
  const animatedStyle3 = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX3.value },
      { translateY: translateY3.value },
    ],
  }));
  const animatedStyle4 = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX4.value },
      { translateY: translateY4.value },
    ],
  }));

  const animatedStyle = [
    animatedStyle1,
    animatedStyle2,
    animatedStyle3,
    animatedStyle4,
  ];

  const circles = [];

  for (let i = 0; i < Math.ceil(height / circleSize); i++) {
    for (let j = 0; j < Math.ceil(width / circleSize); j++) {
      for (let k = 0; k < 4; k++) {
        circles.push(
          <Circle
            animatedStyle={animatedStyle}
            i={i}
            j={j}
            k={k}
            key={`${k}-${i}-${j}`}
          />
        );
      }
    }
  }

  return <View style={StyleSheet.absoluteFill}>{circles}</View>;
};

const styles = StyleSheet.create({
  circle: {
    borderRadius: circleSize / 2,
    height: circleSize,
    position: "absolute",
    width: circleSize,
  },
});

export default AnimatedBackground;
