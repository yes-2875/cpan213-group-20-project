import { describeWeatherCode, formatForecastDate } from "../services/weatherApi";
import { StyleSheet, View, Text } from "react-native";

export default function ForecastRow({ day, isToday, units }) {
  const condition = describeWeatherCode(day.weatherCode);
  const { weekday, shortDate } = formatForecastDate(day.date);

  const roundValue = (value) => {
    return typeof value === "number" ? Math.round(value) : "--";
  }

  return (
    <View style={styles.forecastRow}>
      <View style={styles.forecastDay}>
        <Text style={styles.forecastWeekday}>{isToday ? "Today" : weekday}</Text>
        <Text style={styles.forecastDate}>{shortDate}</Text>
      </View>

      <View style={styles.forecastCondition}>
        <Text style={styles.forecastIcon}>{condition.icon}</Text>
        <View style={styles.forecastConditionText}>
          <Text style={styles.forecastLabel} numberOfLines={1}>
            {condition.label}
          </Text>
          <Text style={styles.forecastMeta}>
            💧 {day.precipitationChance ?? 0}% · {day.precipitation ?? 0}{" "}
            {units.precipitation} · 💨 {roundValue(day.maxWindSpeed)}{" "}
            {units.windSpeed}
          </Text>
        </View>
      </View>

      <View style={styles.forecastTemps}>
        <Text style={styles.forecastHigh}>{roundValue(day.maxTemp)}°</Text>
        <Text style={styles.forecastLow}>{roundValue(day.minTemp)}°</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  forecastRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#D5DAD2",
  },
  forecastDay: {
    width: 64,
  },
  forecastWeekday: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#24352B",
  },
  forecastDate: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
  },
  forecastCondition: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  forecastIcon: {
    fontSize: 26,
    marginRight: 10,
  },
  forecastConditionText: {
    flex: 1,
  },
  forecastLabel: {
    fontSize: 14,
    color: "#24352B",
  },
  forecastMeta: {
    fontSize: 12,
    color: "#666666",
    marginTop: 3,
  },
  forecastTemps: {
    alignItems: "flex-end",
    marginLeft: 8,
  },
  forecastHigh: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#24352B",
  },
  forecastLow: {
    fontSize: 14,
    color: "#666666",
    marginTop: 2,
  },
});