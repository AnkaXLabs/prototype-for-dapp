import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,

} from "react-native"
import { COLORS, SIZES, FONTS, icons, images } from "../constants"
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Dumdum, Trash } from './index';


export default function Scan({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')



  const [modalVisible, setModalVisible] = useState(false);
  const [mainOpacity, setOpaticity] = useState('rgba(0,0,0,0)')



  ///this part is to change the place holder
  
  const[ph1,setplaceholder]=useState('');
  
  function pholder(ph1){
    setplaceholder(ph1);

  }
  


  const [enteredcode, setenteredcode] = useState('');

  function codehandel(enteredtext) {
    setenteredcode(enteredtext);
  }

  function submit() {


    props.onAddGoal(enteredcode);
    setenteredcode('');
  }

const dummydevice=1234;






  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    if (modalVisible)
      return;
    setScanned(true);
    setText(data)
    console.log('Type: ' + type + '\nData: ' + data)
  };

  // Check permissions and return the screens
  // if (hasPermission === null) {
  //   return (
  //     <Dumdum></Dumdum>)
  // }



  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }

  return (
    <View style={{
      alignSelf: 'center',
      height: '100%',
      width: '100%',
      backgroundColor: `${mainOpacity}`,

      alignItems: 'center',
      justifyContent: 'center',
      flex: 0

    }}>

      <Modal transparent={true} visible={modalVisible}>
        <KeyboardAvoidingView
          behavior='height'
          style={{ marginBottom: 0, marginHorizontal: -10 }}
        // enabled={true}
        >
          <View style={styles.modalComp}>
            <View
              style={{
                // marginTop: '40%',
                // marginHorizontal: SIZES.padding * 3,
                // height: '50%'
              }}
            >

              <View >
                <Text style={{ color: COLORS.black, ...FONTS.body3 }}>Enter trash can serial number  :</Text>
                <TextInput
                  style={{
                    marginVertical: SIZES.padding,
                    borderBottomColor: COLORS.white,
                    borderBottomWidth: 1,
                    backgroundColor: COLORS.emerald,
                    height: 40,
                    color: COLORS.white,
                    ...FONTS.body3,
                    borderRadius: 10

                  }}
                  placeholder={ph1}
                  placeholderTextColor={COLORS.white}
                  selectionColor={COLORS.white}
                  onChangeText={codehandel}
                  value={enteredcode}

                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity style={styles.Button} onPress={() => {
                    console.log(enteredcode); submit;
                    codehandel('') ;
                    if(enteredcode==1234){
                      setModalVisible(!modalVisible)
                      setOpaticity('rgba(0,0,0,0)')
                      navigation.navigate(Trash)
                    }
                    else(
                      pholder('ENTERED CODE IS WRONG!!!')

                    )

                  }}>
                    <Text style={{ color: "black", fontWeight: "600" }}>submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.Button}

                    onPress={() => {
                      setModalVisible(!modalVisible)
                      setOpaticity('rgba(0,0,0,0)')
                    }
                    }
                  >

                    <Text style={{ color: "black", fontWeight: "600" }}>close</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <View>

        {hasPermission === null ? <Dumdum></Dumdum> : <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned && modalVisible ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }} />
        </View>}        
                    {/* here we are either showing loading screen or the qr barcode box */}

        <Text style={styles.maintext}>{text}</Text>

        {scanned && !modalVisible && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
        {scanned && !modalVisible && <Button title={'Start'} onPress={() => {
          navigation.navigate('Trash')
        }} color='#54B049'></Button>}


        <View>
          <TouchableOpacity
            style={{ marginBottom: SIZES.padding * 2, width: 60, alignItems: 'center' }}
            onPress={() => {
              setModalVisible(true)
              setOpaticity('rgba(0,0,0,0.5)')
              pholder('')
            }
            }
          /////       this button will pop up the modal screen
          >
            <View
              style={{
                height: 50,
                width: 50,
                marginBottom: 5,
                borderRadius: 20,
                backgroundColor: COLORS.lightpurple,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Image
                source={icons.phone}
                resizeMode="contain"
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.purple
                }}
              />
            </View>
            <Text style={{ textAlign: 'center', flexWrap: 'wrap', ...FONTS.body4 }}>serial code</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            setHasPermission(!hasPermission)
          }} >
            <Text>dum dum</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )

  // Return the View

}

const styles = StyleSheet.create({
  maintext: {
    fontSize: 16,
    margin: 20,
    alignSelf: "center"
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: 299,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  },
  Button: {
    backgroundColor: '#54B049',
    width: '35%',
    height: '50%',
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 6,
    color: '#141823',

  },

  modalComp: {
    height: '60%',
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
    width: "80%",
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: '30%'
  }
}); 