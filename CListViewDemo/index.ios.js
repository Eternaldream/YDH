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

var carJson = require('./LocalData/Car.json');
var Dimensions = require('Dimensions');
var ScreenW = Dimensions.get('window').width;

var CListViewDemo = React.createClass({

  // 状态机
  getInitialState(){
    var getsectionData = (dataBlob, sectionID)=>{
      return dataBlob[sectionID];
    };
    var getrowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[sectionID + ':' + rowID];
    };
    return{
      dataSource: new ListView.DataSource({
        getSectionData: getsectionData,
        getRowData: getrowData,
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      })
    }
  },

  render(){
    return(
        <View style={{flex:1}}>
          <View style={styles.navStyle}><Text style={{color:'white', fontSize:18}}>小码哥旗下品牌</Text></View>
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderSectionHeader={this.renderSectionHeader}
        />
        </View>
    )
  },


  renderRow(rowData,sectionIDs,rowIDs){
    return(
        <TouchableOpacity onPress={()=>alert('点击了第' + sectionIDs + '组第' + rowIDs + '行')}>
        <View style={styles.cellStyle}>
          <Image source={{uri:rowData.icon}} style={styles.imageStyle}/>
          <Text>{rowData.name}</Text>
        </View>
        </TouchableOpacity>
    )
  },
  renderSectionHeader(sectionData){
    return(
        <View style={styles.headerStyle}><Text>{sectionData}</Text></View>
    )
  },
  componentDidMount(){
    // 加载数据
    this.loadDataFromJson();
  },
  loadDataFromJson(){
    // 拿到所有的数组数据
    var jsonData = carJson.data;
    // 定义变量
    var dataBlob = {};
    var sectionIDs = [];
    var rowIDs = [];
    var cars = [];

    for(var i=0; i< jsonData.length; i++){
      // 取出组号放入sectionIDs
      sectionIDs.push(i);
      // 取出组中的头部显示数据
      dataBlob[i] = jsonData[i].title;
      // 取出每一组所有的车
      cars = jsonData[i].cars;
      rowIDs[i] = [];
      // 遍历车的数组
      for(var j=0; j<cars.length; j++){
        // 取出行的ID放入rowIDs
        rowIDs[i].push(j);
        // 取出每一行的数据放入dataBlob
        dataBlob[i + ':' + j] = cars[j];
      }
    }

    // 更新状态,刷新UI
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
    });
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
  navStyle:{
    height:64,
    backgroundColor:'orange',
    justifyContent:'center',
    alignItems:'center'
},
  headerStyle:{
    backgroundColor:'#dddddd',
    height:25,
    justifyContent:'center',
    padding:5
  },
  cellStyle:{
    flexDirection:'row',
    borderBottomColor:'#dddddd',
    borderBottomWidth:1,
    alignItems:'center'
  }
});

AppRegistry.registerComponent('CListViewDemo', () => CListViewDemo);
