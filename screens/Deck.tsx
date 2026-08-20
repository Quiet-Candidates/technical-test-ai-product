import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Image,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Header } from '../src/components/ui';
import { CATEGORIES, type CategoryId } from '../src/data';
import { useStore } from '../src/store';
import { colors, formatBytes, radius, space } from '../src/theme';

const SWIPE_THRESHOLD = 110;

export default function Deck({
  category,
  onBack,
  onReview,
}: {
  category: CategoryId;
  onBack: () => void;
  onReview: () => void;
}) {
  const { pendingIn, dispatch, state } = useStore();
  const { width } = useWindowDimensions();

  const queue = pendingIn(category);
  const meta = CATEGORIES.find((c) => c.id === category)!;

  const pan = useRef(new Animated.ValueXY()).current;
  const topRef = useRef(queue[0]);
  topRef.current = queue[0];
  const animating = useRef(false);
  const startedWithItems = useRef(queue.length > 0);

  const commit = useCallback(
    (direction: 'left' | 'right') => {
      const photo = topRef.current;
      if (!photo || animating.current) return;
      animating.current = true;
      Animated.timing(pan, {
        toValue: { x: direction === 'left' ? -width * 1.4 : width * 1.4, y: 0 },
        duration: 190,
        useNativeDriver: false,
      }).start(() => {
        pan.setValue({ x: 0, y: 0 });
        dispatch({ type: direction === 'left' ? 'mark' : 'keep', id: photo.id });
        animating.current = false;
      });
    },
    [dispatch, pan, width],
  );

  const commitRef = useRef(commit);
  commitRef.current = commit;

  const responder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 6,
        onPanResponderMove: (_, g) => pan.setValue({ x: g.dx, y: g.dy * 0.25 }),
        onPanResponderRelease: (_, g) => {
          if (g.dx < -SWIPE_THRESHOLD) commitRef.current('left');
          else if (g.dx > SWIPE_THRESHOLD) commitRef.current('right');
          else Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        },
      }),
    [pan],
  );

  useEffect(() => {
    if (startedWithItems.current && queue.length === 0) onReview();
  }, [queue.length, onReview]);

  if (queue.length === 0) {
    return <View style={s.blank} />;
  }

  const top = queue[0];
  const under = queue[1];

  const rotate = pan.x.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ['-14deg', '0deg', '14deg'],
  });
  const deleteOpacity = pan.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, -20, 0],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });
  const keepOpacity = pan.x.interpolate({
    inputRange: [0, 20, SWIPE_THRESHOLD],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={s.root}>
      <Header
        title={meta.label}
        subtitle={`${queue.length} left · ${formatBytes(state.pendingBytes)} selected`}
        onBack={onBack}
      />

      <View style={s.stage}>
        {under ? (
          <View style={[s.card, s.under]}>
            <Image source={under.source} style={s.photo} />
          </View>
        ) : null}

        <Animated.View
          {...responder.panHandlers}
          style={[
            s.card,
            { transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }] },
          ]}
        >
          <Image source={top.source} style={s.photo} />
          <View style={s.cardFooter}>
            <Text style={s.cardBytes}>{formatBytes(top.bytes)}</Text>
            <Text style={s.cardDate}>{top.takenAt}</Text>
          </View>

          <Animated.View style={[s.stamp, s.stampDelete, { opacity: deleteOpacity }]}>
            <Text style={s.stampTextDelete}>DELETE</Text>
          </Animated.View>
          <Animated.View style={[s.stamp, s.stampKeep, { opacity: keepOpacity }]}>
            <Text style={s.stampTextKeep}>KEEP</Text>
          </Animated.View>
        </Animated.View>
      </View>

      <View style={s.controls}>
        <Pressable
          onPress={() => commit('left')}
          accessibilityRole="button"
          accessibilityLabel="Delete this photo"
          style={({ pressed }) => [s.circle, s.circleDelete, pressed && s.pressed]}
        >
          <Text style={s.circleIconDelete}>✕</Text>
        </Pressable>

        <Pressable
          onPress={() => dispatch({ type: 'undo' })}
          disabled={state.history.length === 0}
          accessibilityRole="button"
          accessibilityLabel="Undo"
          style={({ pressed }) => [
            s.circleSmall,
            state.history.length === 0 && { opacity: 0.35 },
            pressed && s.pressed,
          ]}
        >
          <Text style={s.circleIconUndo}>↺</Text>
        </Pressable>

        <Pressable
          onPress={() => commit('right')}
          accessibilityRole="button"
          accessibilityLabel="Keep this photo"
          style={({ pressed }) => [s.circle, s.circleKeep, pressed && s.pressed]}
        >
          <Text style={s.circleIconKeep}>♥</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={onReview}
        accessibilityRole="button"
        style={s.reviewLink}
        disabled={state.marked.length === 0}
      >
        <Text style={[s.reviewText, state.marked.length === 0 && { color: colors.inkFaint }]}>
          Review {state.marked.length} selected
        </Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  blank: { flex: 1, backgroundColor: colors.card },
  stage: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: space(6) },
  card: {
    position: 'absolute',
    width: '100%',
    maxWidth: 340,
    aspectRatio: 0.74,
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.line,
  },
  under: { transform: [{ scale: 0.94 }, { translateY: 14 }], opacity: 0.6 },
  photo: { flex: 1, width: '100%' },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: space(4),
    paddingVertical: space(3),
    backgroundColor: colors.card,
  },
  cardBytes: { fontSize: 15, fontWeight: '700', color: colors.ink },
  cardDate: { fontSize: 14, color: colors.inkSoft },
  stamp: {
    position: 'absolute',
    top: space(6),
    paddingHorizontal: space(3),
    paddingVertical: space(2),
    borderRadius: radius.sm,
    borderWidth: 3,
  },
  stampDelete: { left: space(5), borderColor: colors.danger, transform: [{ rotate: '-12deg' }] },
  stampKeep: { right: space(5), borderColor: colors.brand, transform: [{ rotate: '12deg' }] },
  stampTextDelete: { color: colors.danger, fontWeight: '800', fontSize: 20, letterSpacing: 1 },
  stampTextKeep: { color: colors.brand, fontWeight: '800', fontSize: 20, letterSpacing: 1 },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space(6),
    paddingTop: space(4),
  },
  circle: {
    width: 68,
    height: 68,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleSmall: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
  },
  circleDelete: { backgroundColor: colors.dangerSoft },
  circleKeep: { backgroundColor: colors.brandSoft },
  pressed: { opacity: 0.7 },
  circleIconDelete: { fontSize: 28, color: colors.danger, fontWeight: '700' },
  circleIconKeep: { fontSize: 28, color: colors.brand },
  circleIconUndo: { fontSize: 22, color: colors.inkSoft },
  reviewLink: { alignItems: 'center', paddingVertical: space(6) },
  reviewText: { fontSize: 16, fontWeight: '600', color: colors.brand },
});
