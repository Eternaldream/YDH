/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity
} from 'react-native';

var shareData = require('./LocalData/shareData.json');
var Dimensions = require('Dimensions');
var ScreenW = Dimensions.get('window').width;

var CListViewDemo = React.createClass({

  // 状态机
  getInitialState(){
    var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => (r1 != r2)});
    return{
      dataSource: ds.cloneWithRows(shareData.data)
    }
  },

  render(){
    return(
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            contentContainerStyle={{flexDirection:'row', flexWrap:'wrap', width:ScreenW}}
        />
    )
  },
  renderRow(rowData){
    return(
        <TouchableOpacity onPress={}>
          <View style={styles.cellStyle}>
            <Image source={{uri:rowData.icon}} style={styles.imageStyle}/>
            <Text>{rowData.title}</Text>
          </View>
        </TouchableOpacity>
    )
  }
});
// 定义一些变量
var cols = 3;
var viewW = 80;
var vMargin = (ScreenW - cols * viewW) / (cols + 1);
var hMargin = 25;
const styles = StyleSheet.create({
  imageStyle:{
    width:viewW,
    height:viewW,
    margin:5,

  },
  cellStyle:{
    width:viewW,
    height:viewW + 25,
    marginLeft:vMargin,
    marginTop:hMargin
  }
});

AppRegistry.registerComponent('CListViewDemo', () => CListViewDemo);
