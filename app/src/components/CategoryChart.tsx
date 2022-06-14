import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { useRecoilValue } from "recoil";
import { categoriesState } from "../store";
import { icons } from "./icons";
import * as shape from 'd3-shape';
import * as scale from 'd3-scale';
import * as array from 'd3-array';
import Svg, { Line, Path } from "react-native-svg";

interface CategoryChartProps {
  categoryStats: {
    categoryId: number;
    averageFillRate: number;
    averageScore: number;
  }[]
}

const styles = StyleSheet.create({
  axis: {
    flexBasis: '26.7%',
    textAlign: 'center',
    fontSize: 12,
  }
});

export const CategoryChart = ({ categoryStats }: CategoryChartProps) => {
  const categories = useRecoilValue(categoriesState);
  const data = [0.5].concat(...categoryStats.flatMap(x => [x.averageScore, 0.5]));

  const mappedData = data.map((item, index) => [index, item] as [number, number]);
  const yExtent = array.extent(mappedData.map((item) => item[0]));

  const width = Dimensions.get('screen').width - 35;
  const height = 350;

  const y = scale.scaleLinear()
    .domain([yExtent[0]!, yExtent[1]!])
    .range([2, height - 2])
    .clamp(true);
  const x = scale.scaleLinear()
    .domain([0, 1])
    .range([5, width - 5])
    .clamp(true);

  const area = shape.area()
    .x((d) => x(d[1]))
    .y1((d) => y(d[0]))
    .curve(shape.curveCatmullRom)(mappedData);

  const line = shape.line()
    .x((d) => x(d[1]))
    .y((d) => y(d[0]))
    .curve(shape.curveCatmullRom)(mappedData);

  return <Card style={{
    marginTop: 10, paddingHorizontal: 2, paddingVertical: 5,
    backgroundColor: 'white', borderRadius: 3
  }}>
    <View style={{ flexDirection: 'row', marginLeft: 35, justifyContent: 'space-around' }}>
      <Text style={styles.axis}>Potřeba{'\n'}stimulace</Text>
      <Text style={styles.axis}>Odpovídá{'\n'}věku</Text>
      <Text style={styles.axis}>Zvýšit{'\n'}obtížnost</Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
      <View style={[{ marginTop: 4, alignItems: 'center', width: 35 }]}>
        {categories.map((item, i) => React.createElement(icons[item.label], {
          key: i,
          style: {
            width: 29, height: 29, marginBottom: 5.7, marginLeft: 4
          }
        }))}
      </View>
      <Svg style={{ width, height }}>
        {[0, 1 / 3, 2 / 3, 1].map((tick) => (
          <Line
            key={tick}
            y1={2} y2={height - 2}
            x1={x(tick)} x2={x(tick)}
            strokeWidth={1}
            stroke={'rgba(0,0,0,0.2)'}
          />
        ))}
        {Array.from({ length: categoryStats.length + 1 }, (v, i) => i * 2).map((tick) => (
          <Line
            key={tick}
            x1={5} x2={width - 5}
            y1={y(tick)} y2={y(tick)}
            strokeWidth={1}
            stroke={'rgba(0,0,0,0.2)'}
          />
        ))}
        <Line
          y1={2} y2={height - 2}
          x1={x(0.5)} x2={x(0.5)}
          strokeWidth={5}
          stroke={'rgba(0,0,0,0.1)'}
        />
        <Path fill="rgba(235, 128, 63, 0.6)" d={area!} />
        <Path fill="none" strokeWidth={2} stroke="rgba(235, 128, 63, 1)" d={line!} />
      </Svg>
    </View>
  </Card>;
};
