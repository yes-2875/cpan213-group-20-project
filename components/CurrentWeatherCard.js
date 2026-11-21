import { StyleSheet, View, Text } from "react-native";
import { describeWeatherCode } from "../services/weatherApi.js";

export default function CurrentWeatherCard({ current, units, timezone }) {
  const condition = describeWeatherCode(current.weatherCode, current.isDay);
  
  const roundValue = (value) => {
    return typeof value === "number" ? Math.round(value) : "--";
  }
  
  return (
    <View style={styles.currentCard}>
      <Text style={styles.currentLabel}>Right now</Text>

      <View style={styles.currentMainRow}>
        <Text style={styles.currentIcon}>{condition.icon}</Text>
        <View>
          <Text style={styles.currentTemp}>
            {roundValue(current.temperature)}
            {units.temperature}
          </Text>
          <Text style={styles.currentCondition}>{condition.label}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>
            {roundValue(current.feelsLike)}
            {units.temperature}
          </Text>
          <Text style={styles.statLabel}>Feels like</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>
            {roundValue(current.windSpeed)} {units.windSpeed}
          </Text>
          <Text style={styles.statLabel}>Wind</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{roundValue(current.humidity)}%</Text>
          <Text style={styles.statLabel}>Humidity</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>
            {current.precipitation ?? 0} {units.precipitation}
          </Text>
          <Text style={styles.statLabel}>Precip.</Text>
        </View>
      </View>

      {timezone ? (
        <Text style={styles.updatedText}>Local time zone: {timezone}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  currentCard: {
    backgroundColor: "#daebe4",
    borderColor: "#17420955",
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    marginTop: 18,
    marginBottom: 24,
  },
  currentLabel: {
    color: "#174209",
    fontSize: 13,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  currentMainRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  currentIcon: {
    fontSize: 54,
    marginRight: 16,
  },
  currentTemp: {
    color: "#0a5d0b",
    fontSize: 42,
    fontWeight: "bold",
  },
  currentCondition: {
    color: "#006c0d",
    fontSize: 16,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 18,
  },
  statBox: {
    width: "48%",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderColor: "#17420955",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  statValue: {
    color: "#1f8103",
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#114500",
    fontSize: 12,
    marginTop: 2,
  },
  updatedText: {
    color: "#DCE8D8",
    fontSize: 12,
    marginTop: 6,
  },
});