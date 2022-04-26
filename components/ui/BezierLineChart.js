import React, { useCallback, useEffect, useState } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import tw from "twrnc";
import {
  ScrollView,
  StyleSheet,
  View,
  Button,
  Text,
  Dimensions,
} from "react-native";
var LocalDate = require("@js-joda/core").LocalDate;

const useParentSize = () => {
  const [size, setSize] = useState(null);
  const onLayout = useCallback((event) => {
    const { width, heigth } = event.nativeEvent.layout;
    setSize({ width, heigth });
    console.log("setsize");
    console.log(width);
  }, []);
  return [size, onLayout];
};

const BezierLineChart = () => {
  const today = new Date(); /* 
  var dateToday = new DateTime(today);
  var todayPlus1 = dateToday.plusDays(1);
  var todayPlus2 = dateToday.plusDays(2);
  var todayPlus3 = dateToday.plusDays(3);
  var todayPlus4 = dateToday.plusDays(4);
  var todayPlus5 = dateToday.plusDays(5);
  var todayPlus6 = dateToday.plusDays(6); */
  console.log(today);
  const today1 = today.getDate(+1);

  const [size, onLayout] = useParentSize();

  return (
    <View
      style={{ flex: 0 }}
      onLayout={(event) => {
        onLayout(event);
        console.log(size);
      }}
    >
      <Text style={styles.header}>Bezier Line Chart</Text>
      <LineChart
        data={{
          labels: ["January", "February", "March", "April"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={size ? (size.width ? size.width : 0) : 0}
        height={size ? (size.height ? size.height : 300) : 300}
        yAxisLabel={"Rs"}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          style: { flex: 0 },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
});
export default BezierLineChart;
