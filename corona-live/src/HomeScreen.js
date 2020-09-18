import React, { Component } from 'react';
import {
  View,
  Text,
  Picker,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Block, Button, TextView } from './components';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Colors } from './color';
const W = Dimensions.get('window').width;
import Feather from 'react-native-vector-icons/Feather';
import { fetchCountryList, fetchCountries, fetchData } from './api/corona-lmao-ninja';
import {  } from './api/covid19-mathdro-id';

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 300,
  },
  doctor: {
    position: 'absolute',
    top: 80
  },
  wrapperimage: {
    position: 'absolute',
    bottom: 0,

    alignSelf: 'center',
    width: W,
    height: 300,
  },
  bg: {
    position: 'absolute',
    width: 1000,
    height: 1000,
    top: -(930 - W / 2),
    alignSelf: 'center',
    borderRadius: 1000,
    overflow: 'hidden',
  },
  containerHeader: {
    position: 'relative',
  },
  map: {
    borderRadius: 8,
    marginTop: 15,
    padding: 15,
  },
});

const ItemDot = ({ color1, color2, num, title }) => {
  return (
    <Block block>
      <Block middle>
        <Block
          width={30}
          height={30}
          middle
          centered
          borderRadius={30}
          color={color1}>
          <Block
            width={20}
            height={20}
            borderWidth={4}
            borderRadius={20}
            borderColor={color2}
          />
        </Block>
        <TextView padding={15} color={color2} h6>
          {num}
        </TextView>
        <TextView color="gray">
          {title}
        </TextView>
      </Block>
    </Block>
  );
};

class HomeScreen extends Component {
  state = {
    data: {},
    country: '',
    countries: [],
    allCountryData: []
  }

  async componentDidMount() {
    let data = await fetchData(this.state.country);
    let allCountryData = await fetchCountries();
    console.log(data);
    let countries = await fetchCountryList();
    this.setState({ data, allCountryData, countries });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);
    this.setState({ data, country });
    console.log("country changed");
  }

  render() {
    const progressChartData = {
      labels: ["Active", "Recovered", "Death"], // optional
      data: [0.4, 0.6, 0.8]
    };

    const stackedBarData = {
      labels: ["Test1", "Test2"],
      legend: ["L1", "L2", "L3"],
      data: [[60, 60, 60], [30, 30, 60]],
      barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
    };

    const stackedBarChartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };

    return (
      <ScrollView style={{ flex: 1 }}>
        <Block block color="#fafafa">
          <Block height={300} color={Colors.blue} style={styles.bg}>
            <Block style={styles.wrapperimage}>
              <Image
                style={styles.doctor}
                source={require('./images/corona.png')}
              />
            </Block>
          </Block>
          <Block style={styles.containerHeader}>
            <Image style={styles.img} source={require('./images/virus.png')} />
          </Block>
          
          <Block>
            <Button
              color="#fff"
              borderWidth={1}
              borderColor="#f0f0f0"
              margin={10}
              borderRadius={30}>
              <Block direction="row" paddingHorizontal={15} middle>
                <Feather name="map-pin" size={16} color={Colors.blue1} />
                <Block block>
                  <Picker
                    selectedValue={this.state.country}
                    onValueChange={(itemValue) => this.handleCountryChange(itemValue)}
                  >
                    <Picker.Item label="Global" value="" />
                    {this.state.countries.sort().map((country, i) => <Picker.Item key={i} label={country} value={country} />)}
                  </Picker>
                </Block>
              </Block>
            </Button>
          </Block>
          <Block padding={10} style={{ marginTop: 10 }}>
            <Block justifyContent="space-between" direction="row">
              <Block>
                <TextView h6>Case Update</TextView>
                <TextView>Newest update March 28</TextView>
              </Block>
              <Button textColor={Colors.blue1}>See details</Button>
            </Block>
            <Block
              color="#fff"
              borderRadius={8}
              padding={10}
              shadow
              style={{ marginTop: 10 }}
              direction="row">
              <ItemDot
                color1={Colors.carot_op}
                color2={Colors.carot}
                num={this.state.data.cases}
                title={'Infected'}
              />
              <ItemDot
                color1={Colors.red_op}
                color2={Colors.red}
                num={this.state.data.recovered}
                title={'Deaths'}
              />

              <ItemDot
                color1={Colors.green_op}
                color2={Colors.green}
                num={this.state.data.deaths}
                title={'Recovered'}
              />
            </Block>
            <StackedBarChart
              data={stackedBarData}
              width={Dimensions.get("window").width}
              height={220}
              chartConfig={stackedBarChartConfig}
            />
            <ProgressChart
              data={progressChartData}
              width={Dimensions.get("window").width}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={{
                backgroundColor: "white",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 10
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
              hideLegend={false}
            />
          </Block>
        </Block>
      </ScrollView>
    );
  }
}

export default HomeScreen;
