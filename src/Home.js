import React, { Component } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator,StyleSheet } from 'react-native';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      dataNews: []
    }
  }
  componentDidMount() {
    const url = "http://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=5b706e2c224c464e8dce14d9ea94222a"
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataNews: responseJson.articles
        })
      }).catch((error) => {
        console.log(error)
      })
  }
  renderItem = ({ item }) => {
    return (
      <View style={styles.news_container}>
        <Image source={{ uri: item.urlToImage}} 
        style={{height:150,width:null,resizeMode:'cover',marginLeft:10,marginRight:10,marginTop:10}} />
        <View>
          <Text style={styles.text_header}>{item.title}</Text>
          <Text style={styles.text_description}>{item.description}</Text>
        </View>
      </View>
    )

  }
  render() {
    const PI_Key = "5b706e2c224c464e8dce14d9ea94222a";
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color="#0000ff" size="large" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <FlatList data={this.state.dataNews}
          renderItem={this.renderItem} keyExtractor={() =>Math.random().toString() } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  text_header : {
    marginHorizontal:10,
    marginTop:10,
    fontSize:20,
    fontWeight : "500",
    color:'#333'
  },
  text_description :{
    paddingHorizontal:10,
    marginTop:10,
    marginBottom:20,
    fontSize:14,
    fontWeight : "100",
    color:'#666'
  },
  news_container : {
    flex:1,
    marginTop:10,
    elevation:10,
    borderColor:'#888',
    backgroundColor:'#fff',
    borderRadius:10
  }
})