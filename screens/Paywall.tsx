import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Button } from '../src/components/ui';
import { useStore } from '../src/store';
import { colors, radius, space } from '../src/theme';

const PERKS = [
  'No ads, ever',
  'Weekly automatic clean-up',
  'Unlimited large video scans',
  'Priority support',
];

export default function Paywall({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { dispatch } = useStore();

  const subscribe = () => {
    dispatch({ type: 'subscribe' });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={s.backdrop}>
        <View style={s.sheet}>
          <Pressable onPress={onClose} accessibilityRole="button" style={s.close}>
            <Text style={s.closeIcon}>✕</Text>
          </Pressable>

          <Text style={s.kicker}>QuietClean Premium</Text>
          <Text style={s.title}>Keep your phone clean without lifting a finger</Text>

          <View style={s.perks}>
            {PERKS.map((p) => (
              <View key={p} style={s.perkRow}>
                <Text style={s.perkTick}>✓</Text>
                <Text style={s.perkText}>{p}</Text>
              </View>
            ))}
          </View>

          <Button label="Start 3-day free trial" onPress={subscribe} style={s.cta} />

          <Pressable
            onPress={() => dispatch({ type: 'restorePurchases' })}
            accessibilityRole="button"
            style={s.restore}
          >
            <Text style={s.restoreText}>Restore purchases</Text>
          </Pressable>

          <Text style={s.fine}>
            Then €7.99 per week. Renews automatically. Cancel anytime in your account settings.
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingHorizontal: space(6),
    paddingTop: space(6),
    paddingBottom: space(9),
  },
  close: { position: 'absolute', top: space(3), right: space(3), padding: 3 },
  closeIcon: { fontSize: 12, color: '#DDE1E6' },
  kicker: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.brand,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  title: { fontSize: 26, fontWeight: '800', color: colors.ink, marginTop: space(2), lineHeight: 32 },
  perks: { marginTop: space(6), gap: space(3) },
  perkRow: { flexDirection: 'row', alignItems: 'center' },
  perkTick: { color: colors.brand, fontWeight: '800', fontSize: 16, width: 26 },
  perkText: { fontSize: 16, color: colors.ink },
  cta: { marginTop: space(8) },
  restore: { alignSelf: 'center', paddingVertical: space(4) },
  restoreText: { fontSize: 15, color: colors.inkSoft, fontWeight: '600' },
  fine: { fontSize: 9, color: colors.inkFaint, textAlign: 'center', lineHeight: 13 },
});
