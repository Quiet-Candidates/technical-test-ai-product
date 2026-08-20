import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header } from '../src/components/ui';
import { useStore } from '../src/store';
import { colors, radius, space } from '../src/theme';

export default function Settings({
  onBack,
  onOpenPaywall,
}: {
  onBack: () => void;
  onOpenPaywall: () => void;
}) {
  const { state, dispatch } = useStore();

  return (
    <View style={s.root}>
      <Header title="Settings" onBack={onBack} />

      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.section}>Subscription</Text>

        <View style={s.group}>
          <View style={s.row}>
            <Text style={s.rowLabel}>Plan</Text>
            <Text style={s.rowValue}>{state.isPremium ? 'Premium' : 'Free'}</Text>
          </View>

          {!state.isPremium ? (
            <Pressable onPress={onOpenPaywall} style={s.row} accessibilityRole="button">
              <Text style={[s.rowLabel, s.link]}>Upgrade to Premium</Text>
              <Text style={s.chevron}>›</Text>
            </Pressable>
          ) : null}

          <Pressable
            onPress={() => dispatch({ type: 'restorePurchases' })}
            style={s.row}
            accessibilityRole="button"
          >
            <Text style={[s.rowLabel, s.link]}>Restore purchases</Text>
            <Text style={s.chevron}>›</Text>
          </Pressable>
        </View>

        <Text style={s.section}>Library</Text>

        <View style={s.group}>
          <View style={s.row}>
            <Text style={s.rowLabel}>Photos deleted</Text>
            <Text style={s.rowValue}>{state.deleted.length}</Text>
          </View>
          <Pressable
            onPress={() => dispatch({ type: 'reset' })}
            style={s.row}
            accessibilityRole="button"
          >
            <Text style={[s.rowLabel, s.link]}>Start over</Text>
            <Text style={s.chevron}>›</Text>
          </Pressable>
        </View>

        <Text style={s.version}>QuietClean 1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  content: { paddingHorizontal: space(5), paddingBottom: space(10) },
  section: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.inkFaint,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginTop: space(6),
    marginBottom: space(2),
  },
  group: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space(4),
    height: 52,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  rowLabel: { fontSize: 16, color: colors.ink },
  rowValue: { fontSize: 16, color: colors.inkSoft },
  link: { color: colors.brand, fontWeight: '600' },
  chevron: { fontSize: 22, color: colors.inkFaint },
  version: { textAlign: 'center', color: colors.inkFaint, fontSize: 13, marginTop: space(8) },
});
