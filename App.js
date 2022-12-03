import React, { useRef } from "react";
import styled from "styled-components/native";
import { Animated, View, PanResponder } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`;
const Card = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
`;
export default function App() {
  const scale = useRef(new Animated.Value(1)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => onPressIn.start(),
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
      },
      onPanResponderRelease: () => {
        Animated.parallel([onPressOut, goCenter]).start();
      },
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -250) {
          goLeft.start();
        } else if (dx > 250) {
          goRight.start();
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    })
  ).current;
  const onPressIn = Animated.spring(scale, {
    toValue: 0.95,
    useNativeDriver: true,
  });
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const position = useRef(new Animated.Value(0)).current;
  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });
  const rotation = position.interpolate({
    inputRange: [-250, 250],
    outputRange: ["-15deg", "15deg"],
  });
  const goLeft = Animated.spring(position, {
    toValue: -500,
    tension: 5,
    useNativeDriver: true,
    restDisplacementThreshold: 100,
    restSpeedThreshold: 100,
  });
  const goRight = Animated.spring(position, {
    toValue: 500,
    tension: 5,
    useNativeDriver: true,
    restDisplacementThreshold: 100,
    restSpeedThreshold: 100,
  });

  return (
    <Container>
      <Card
        {...panResponder.panHandlers}
        style={{
          transform: [
            { scale },
            { translateX: position },
            { rotateZ: rotation },
          ],
        }}
      >
        <Ionicons name="pizza" color="#192a56" size={98} />
      </Card>
    </Container>
  );
}
