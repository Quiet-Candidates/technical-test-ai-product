import React, { useCallback, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import type { CategoryId } from './src/data';
import { StoreProvider } from './src/store';
import { colors } from './src/theme';
import Deck from './screens/Deck';
import Done from './screens/Done';
import Home from './screens/Home';
import Paywall from './screens/Paywall';
import Review from './screens/Review';
import Scan from './screens/Scan';
import Settings from './screens/Settings';
import Welcome from './screens/Welcome';

type Route =
  | { name: 'welcome' }
  | { name: 'scan' }
  | { name: 'home' }
  | { name: 'deck'; category: CategoryId }
  | { name: 'review' }
  | { name: 'done' }
  | { name: 'settings' };

function Router() {
  const [route, setRoute] = useState<Route>({ name: 'welcome' });
  const [paywall, setPaywall] = useState(false);

  const go = useCallback((next: Route) => setRoute(next), []);
  const goHome = useCallback(() => setRoute({ name: 'home' }), []);
  const goReview = useCallback(() => setRoute({ name: 'review' }), []);
  const openPaywall = useCallback(() => setPaywall(true), []);

  let screen: React.ReactNode = null;
  switch (route.name) {
    case 'welcome':
      screen = <Welcome onScan={() => go({ name: 'scan' })} />;
      break;
    case 'scan':
      screen = <Scan onDone={goHome} />;
      break;
    case 'home':
      screen = (
        <Home
          onOpenCategory={(category) => go({ name: 'deck', category })}
          onOpenSettings={() => go({ name: 'settings' })}
          onOpenPaywall={openPaywall}
        />
      );
      break;
    case 'deck':
      screen = <Deck category={route.category} onBack={goHome} onReview={goReview} />;
      break;
    case 'review':
      screen = <Review onBack={goHome} onDone={() => go({ name: 'done' })} />;
      break;
    case 'done':
      screen = <Done onHome={goHome} />;
      break;
    case 'settings':
      screen = <Settings onBack={goHome} onOpenPaywall={openPaywall} />;
      break;
  }

  return (
    <View style={s.flex}>
      {screen}
      <Paywall visible={paywall} onClose={() => setPaywall(false)} />
    </View>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <SafeAreaView style={s.root}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />
        <Router />
      </SafeAreaView>
    </StoreProvider>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  flex: { flex: 1 },
});
