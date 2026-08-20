import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Header } from '../src/components/ui';
import { useStore } from '../src/store';
import { colors, formatBytes, radius, space } from '../src/theme';

export default function Review({
  onBack,
  onDone,
}: {
  onBack: () => void;
  onDone: () => void;
}) {
  const { markedPhotos, dispatch } = useStore();
  const [unchecked, setUnchecked] = useState<string[]>([]);

  const selected = markedPhotos.filter((p) => !unchecked.includes(p.id));
  const total = selected.reduce((sum, p) => sum + p.bytes, 0);

  const toggle = (id: string) =>
    setUnchecked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const freeUpSpace = () => {
    const biggest = selected.reduce((a, b) => (a.bytes > b.bytes ? a : b));
    dispatch({ type: 'commit', ids: selected.map((p) => p.id), biggestBytes: biggest.bytes });
    onDone();
  };

  return (
    <View style={s.root}>
      <Header title="Review" subtitle={`${selected.length} of ${markedPhotos.length}`} onBack={onBack} />

      <ScrollView contentContainerStyle={s.list} showsVerticalScrollIndicator={false}>
        {markedPhotos.map((p) => {
          const on = !unchecked.includes(p.id);
          return (
            <Pressable
              key={p.id}
              onPress={() => toggle(p.id)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: on }}
              accessibilityLabel={`${p.takenAt}, ${formatBytes(p.bytes)}`}
              style={({ pressed }) => [s.row, pressed && { opacity: 0.75 }]}
            >
              <Image source={p.source} style={[s.thumb, !on && { opacity: 0.35 }]} />
              <View style={s.rowText}>
                <Text style={[s.rowTitle, !on && s.rowTitleOff]}>{formatBytes(p.bytes)}</Text>
                <Text style={s.rowDate}>{p.takenAt}</Text>
              </View>
              <View style={[s.check, on && s.checkOn]}>
                {on ? <Text style={s.checkMark}>✓</Text> : null}
              </View>
            </Pressable>
          );
        })}

        {markedPhotos.length === 0 ? (
          <Text style={s.empty}>Nothing selected yet. Swipe a few photos left first.</Text>
        ) : null}
      </ScrollView>

      <View style={s.footer}>
        <View style={s.totalRow}>
          <Text style={s.totalLabel}>About to free</Text>
          <Text style={s.totalValue}>{formatBytes(total)}</Text>
        </View>
        <Button label="Free up space" tone="danger" onPress={freeUpSpace} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  list: { paddingHorizontal: space(5), paddingBottom: space(6) },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    padding: space(3),
    marginBottom: space(3),
  },
  thumb: { width: 56, height: 56, borderRadius: radius.sm, backgroundColor: colors.line },
  rowText: { flex: 1, marginLeft: space(3) },
  rowTitle: { fontSize: 16, fontWeight: '600', color: colors.ink },
  rowTitleOff: { color: colors.inkFaint, textDecorationLine: 'line-through' },
  rowDate: { fontSize: 13, color: colors.inkSoft, marginTop: 2 },
  check: {
    width: 26,
    height: 26,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOn: { backgroundColor: colors.brand, borderColor: colors.brand },
  checkMark: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  empty: { textAlign: 'center', color: colors.inkSoft, marginTop: space(12), fontSize: 15 },
  footer: {
    paddingHorizontal: space(5),
    paddingTop: space(4),
    paddingBottom: space(8),
    borderTopWidth: 1,
    borderTopColor: colors.line,
    backgroundColor: colors.card,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: space(4),
  },
  totalLabel: { fontSize: 15, color: colors.inkSoft },
  totalValue: { fontSize: 24, fontWeight: '800', color: colors.ink },
});
