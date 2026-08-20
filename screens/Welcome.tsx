import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from '../src/components/ui';
import { PHOTOS } from '../src/data';
import { colors, formatBytes, radius, space } from '../src/theme';
import { useStore } from '../src/store';

export default function Welcome({ onScan }: { onScan: () => void }) {
  const { totals } = useStore();
  const preview = PHOTOS.slice(0, 3);

  return (
    <View style={s.root}>
      <View style={s.hero}>
        {preview.map((p, i) => (
          <Image
            key={p.id}
            source={p.source}
            style={[
              s.heroCard,
              { transform: [{ rotate: `${(i - 1) * 7}deg` }, { translateY: i * 6 }] },
            ]}
          />
        ))}
      </View>

      <Text style={s.title}>QuietClean</Text>
      <Text style={s.body}>
        Your photo library is heavier than it needs to be. We find what you can safely let go of.
      </Text>

      <View style={s.stat}>
        <Text style={s.statValue}>{formatBytes(totals.bytes)}</Text>
        <Text style={s.statLabel}>we think you can free</Text>
      </View>

      <Button label="Scan my photos" onPress={onScan} style={s.cta} />
      <Text style={s.legal}>Nothing leaves your phone.</Text>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: space(6), justifyContent: 'center' },
  hero: { height: 220, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  heroCard: {
    width: 108,
    height: 148,
    borderRadius: radius.md,
    marginHorizontal: -8,
    borderWidth: 4,
    borderColor: colors.card,
    backgroundColor: colors.line,
  },
  title: { fontSize: 34, fontWeight: '800', color: colors.ink, textAlign: 'center', marginTop: space(8) },
  body: {
    fontSize: 16,
    lineHeight: 23,
    color: colors.inkSoft,
    textAlign: 'center',
    marginTop: space(3),
  },
  stat: { alignItems: 'center', marginTop: space(9) },
  statValue: { fontSize: 44, fontWeight: '800', color: colors.brand },
  statLabel: { fontSize: 15, color: colors.inkSoft, marginTop: space(1) },
  cta: { marginTop: space(9) },
  legal: { fontSize: 13, color: colors.inkFaint, textAlign: 'center', marginTop: space(4) },
});
