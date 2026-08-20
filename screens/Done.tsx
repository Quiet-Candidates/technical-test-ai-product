import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../src/components/ui';
import { useStore } from '../src/store';
import { colors, formatBytes, space } from '../src/theme';

export default function Done({ onHome }: { onHome: () => void }) {
  const { state } = useStore();

  return (
    <View style={s.root}>
      <View style={s.badge}>
        <Text style={s.badgeIcon}>✓</Text>
      </View>

      <Text style={s.value}>{formatBytes(state.lastFreedBytes)}</Text>
      <Text style={s.label}>freed up</Text>

      <Text style={s.detail}>
        Biggest file removed: {formatBytes(state.lastBiggestBytes)}
      </Text>

      <Button label="Back to home" onPress={onHome} style={s.cta} />
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: space(8) },
  badge: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.brandSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: space(8),
  },
  badgeIcon: { fontSize: 44, color: colors.brand, fontWeight: '800' },
  value: { fontSize: 52, fontWeight: '800', color: colors.brand },
  label: { fontSize: 18, color: colors.inkSoft, marginTop: space(1) },
  detail: { fontSize: 14, color: colors.inkFaint, marginTop: space(6) },
  cta: { marginTop: space(12), alignSelf: 'stretch' },
});
