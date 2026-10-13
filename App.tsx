import { StatusBar } from "expo-status-bar";
import {
  Platform,
  SafeAreaView,
  StatusBar as RNStatusBar,
  StyleSheet,
} from "react-native";
import CarForm from "./components/CarForm";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <CarForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff7ed",
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },
});
