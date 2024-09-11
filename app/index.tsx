import { Audio } from "expo-av";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useRef } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Index() {
  const music = useRef<Audio.Sound>();

  async function playMusic() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/bgm.mp3")
    );

    music.current = sound;

    await sound.playAsync();
  }

  useEffect(() => {
    playMusic();

    return () => {
      music.current?.unloadAsync();
    };
  }, []);

  const bounceAnimation = useSharedValue(0);

  bounceAnimation.value = withRepeat(
    withSequence(
      withTiming(-7, { duration: 500 }),
      withTiming(0, { duration: 500 })
    ),
    -1
  );

  const arrowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounceAnimation.value }],
  }));

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <Text style={styles.title}>TICK-TAP</Text>
      <Animated.Text style={[styles.arrow, arrowAnimatedStyle]}>
        ▼
      </Animated.Text>
      <Link href="/game" style={styles.link}>
        GAME START
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#112",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 50,
    marginBottom: 8,
  },
  arrow: {
    color: "#fff",
    fontSize: 40,
    marginBottom: 8,
  },
  link: {
    borderColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    color: "#fff",
    fontSize: 27,
    padding: 10,
  },
});
