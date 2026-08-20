import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../src/components/ui';
import { CATEGORIES, type CategoryId } from '../src/data';
import { useStore } from '../src/store';
import { colors, formatBytes, radius, space } from '../src/theme';

export default function Home({
  onOpenCategory,
  onOpenSettings,
  onOpenPaywall,
}: {
  onOpenCategory: (id: CategoryId) => void;
  onOpenSettings: () => void;
  onOpenPaywall: () => void;
}) {
  const { totals, perCategory, state } = useStore();

  return (
    <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <View style={s.topRow}>
        <Text style={s.brand}>QuietClean</Text>
        <Pressable
          onPress={onOpenSettings}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Settings"
        >
          <Text style={s.gear}>⚙︎</Text>
        </Pressable>
      </View>

      <Card style={s.summary}>
        <Text style={s.summaryLabel}>You can free</Text>
        <Text style={s.summaryValue}>{formatBytes(totals.bytes)}</Text>
        <Text style={s.summaryHint}>across {totals.count} items still on your phone</Text>
      </Card>

      {!state.isPremium ? (
        <Pressable onPress={onOpenPaywall} style={s.promo} accessibilityRole="button">
          <Text style={s.promoTitle}>Go Premium</Text>
          <Text style={s.promoBody}>Clean without ads, and let us do it weekly for you.</Text>
        </Pressable>
      ) : null}

      <Text style={s.sectionTitle}>What we found</Text>

      {CATEGORIES.map((c) => {
        const stat = perCategory[c.id];
        return (
          <Pressable
            key={c.id}
            onPress={() => onOpenCategory(c.id)}
            accessibilityRole="button"
            accessibilityLabel={`${c.label}, ${stat.count} items`}
            style={({ pressed }) => [s.row, pressed && { opacity: 0.7 }]}
          >
            <Text style={s.emoji}>{c.emoji}</Text>
            <View style={s.rowText}>
              <Text style={s.rowTitle}>{c.label}</Text>
              <Text style={s.rowHint}>{c.hint}</Text>
            </View>
            <View style={s.rowRight}>
              <Text style={s.rowCount}>{stat.count}</Text>
              <Text style={s.rowBytes}>{formatBytes(stat.bytes)}</Text>
            </View>
            <Text style={s.chevron}>›</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  content: { padding: space(5), paddingBottom: space(12) },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { fontSize: 26, fontWeight: '800', color: colors.ink },
  gear: { fontSize: 24, color: colors.inkSoft },
  summary: { marginTop: space(5), alignItems: 'center', paddingVertical: space(7) },
  summaryLabel: { fontSize: 15, color: colors.inkSoft },
  summaryValue: { fontSize: 46, fontWeight: '800', color: colors.brand, marginTop: space(1) },
  summaryHint: { fontSize: 13, color: colors.inkFaint, marginTop: space(2) },
  promo: {
    marginTop: space(4),
    backgroundColor: colors.brandSoft,
    borderRadius: radius.md,
    padding: space(4),
  },
  promoTitle: { fontSize: 16, fontWeight: '700', color: colors.brand },
  promoBody: { fontSize: 14, color: colors.inkSoft, marginTop: space(1) },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.inkFaint,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginTop: space(7),
    marginBottom: space(3),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    padding: space(4),
    marginBottom: space(3),
  },
  emoji: { fontSize: 26, marginRight: space(3) },
  rowText: { flex: 1 },
  rowTitle: { fontSize: 16, fontWeight: '600', color: colors.ink },
  rowHint: { fontSize: 13, color: colors.inkSoft, marginTop: 2 },
  rowRight: { alignItems: 'flex-end' },
  rowCount: { fontSize: 16, fontWeight: '700', color: colors.ink },
  rowBytes: { fontSize: 12, color: colors.inkFaint, marginTop: 2 },
  chevron: { fontSize: 26, color: colors.inkFaint, marginLeft: space(2) },
});
