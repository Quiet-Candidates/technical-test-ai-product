import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { PHOTOS } from '../src/data';
import { colors, radius, space } from '../src/theme';

const STEPS = [
  'Reading your library',
  'Comparing similar shots',
  'Checking focus',
  'Measuring videos',
];

export default function Scan({ onDone }: { onDone: () => void }) {
  const progress = useRef(new Animated.Value(0)).current;
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const id = progress.addListener(({ value }) => setPercent(Math.round(value * 100)));
    Animated.timing(progress, {
      toValue: 1,
      duration: 3400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) onDone();
    });
    return () => {
      progress.removeListener(id);
      progress.stopAnimation();
    };
  }, [progress, onDone]);

  const step = STEPS[Math.min(STEPS.length - 1, Math.floor((percent / 100) * STEPS.length))];

  return (
    <View style={s.root}>
      <Text style={s.percent}>{percent}%</Text>
      <View style={s.track}>
        <Animated.View
          style={[
            s.fill,
            { width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) },
          ]}
        />
      </View>
      <Text style={s.step}>{step}</Text>
      <Text style={s.count}>
        {Math.round((percent / 100) * PHOTOS.length)} of {PHOTOS.length} items
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: space(8) },
  percent: { fontSize: 56, fontWeight: '800', color: colors.ink, marginBottom: space(6) },
  track: {
    height: 10,
    width: '100%',
    backgroundColor: colors.line,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  fill: { height: '100%', backgroundColor: colors.brand, borderRadius: radius.pill },
  step: { fontSize: 17, color: colors.ink, marginTop: space(6), fontWeight: '600' },
  count: { fontSize: 14, color: colors.inkSoft, marginTop: space(2) },
});
