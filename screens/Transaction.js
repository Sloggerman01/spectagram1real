import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground} from 'react-native'
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { TextInput } from 'react-native-gesture-handler'

const bgImage = require("../assets/background2.png")
const appIcon = require("../assets/appIcon.png")
const appName = require("../assets/appName.png")

export default class TransactionScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            bookId: " ",
            studentId: " ",
            domState: "normal",
            hasCameraPermissions: null,
            scanned: false,

        }
    }
    getCameraPermissions= async domState =>{
        const{status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions: status === "granted",
            domState: domState,
            scanned: false
        })
    }
    handleBarCodeScanned = async({type, data})=>{
        const {domState} = this.state
        if(domState === "bookId"){
            this.setState({
                bookId: data,
                domState: "normal",
                scanned: true
            })
        } else if(domState === "studentId"){
            this.setState({
                studentId: data,
                domState: "normal",
                scanned: true
            })
        }
       
    }
    render(){
        const {bookId, studentId, domState, scanned} = this.state;
        if(domState!=="normal"){
            return (
                <BarCodeScanner
                    onBarCodeScanned={scanned? undefined: this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            )
        }
        return(
            <View style={styles.container}>
                <ImageBackground source = {bgImage} style = {styles.bgImage}>
                    <View style = {styles.upperContainer}>
                        <Image 
                        source = {appIcon}
                        style = {styles.appIcon}
                        />
                        <Image 
                        source = {appName}
                        style = {styles.appName}
                        />
                    </View>
                </ImageBackground>
                <View style={styles.lowerContainer}>
                <View style={styles.textinputContainer}>
                    <TextInput
                    style = {styles.textInput}
                    placeholder = {"Book ID"}
                    placeholderTextColor = {"#FFF"}
                    value = {bookId}
                    />
                    
             <TouchableOpacity style = {styles.scanButton}
                onPress={()=>this.getCameraPermissions("bookId")}>
                <Text style = {styles.scanButtonText}>Scan</Text>
             </TouchableOpacity>

                </View>
                <View style={[styles.textinputContainer, {marginTop: 25}]}>
                <TextInput
                    style = {styles.textInput}
                    placeholder = {"Student ID"}
                    value = {studentId}
                    />
                    
             <TouchableOpacity style = {styles.scanButton}
                onPress={()=>this.getCameraPermissions("studentId")}>
                <Text style = {styles.scanButtonText}>Scan</Text>
             </TouchableOpacity>
                </View>
            <TouchableOpacity style = {[styles.button, {marginTop: 25}]}>
                <Text style = {styles.buttonText}>
                    Submit
                </Text>
            </TouchableOpacity>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: "#5653D4"
    },
    text:{
        color:"#FFF",
        fontSize: 30
    },
    button:{
        width: "43%",
        height: 55,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: "#F48D20",
        borderRadius: 15
    },
    buttonText:{
        fontSize: 24,
        color: "#FFF"
    },
    textinputContainer:{
        borderWidth:2,
        borderRadius: 10,
        flexDirection: "row",
        backgroundColor:"#9DFD24",
        borderColor:"#FFF"
    },
    textInput:{
        width: "57%",
        height: 50,
        padding: 10,
        borderRadius: 10,
        borderWidth: 3,
        fontSize: 18,
        backgroundColor: "#5653D4",
        fontFamily: "Rajdhani_600SemiBold",
        color: "#FFF"
    },
    lowerContainer:{
            flex: 0.5,
            alignItems:"center"
    },
    scanButton:{
        width: 100,
        height: 50,
        backgroundColor: "#9DFD24",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    scanButtonText:{
        fontSize: 24,
        color: "#0A0101",
        fontFamily: "Rajdhani_600SemiBold"
    },
    bgImage:{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    upperContainer:{
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center"
    },
    appIcon:{
        width: 150,
        height: 150,
        resizeMode: "cover",
        marginTop: 50
    },
    appName:{
        width: 80,
        height: 80,
        resizeMode:"contain"
    }
})