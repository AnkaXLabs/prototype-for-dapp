import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Button,
} from "react-native"
import { COLORS, SIZES, FONTS, icons, images } from "../constants"
import { useNavigation, createStackNavigator, NavigationActions } from '@react-navigation/native';
import SignUp from "./SignUp"
import Trash from "./Trash";
import Scan from "./Scan";
import { Linking } from 'react-native'
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Animated, setWidth } from "react-native";

const Home = ({ navigation }) => {

    const featuresData = [
        {
            id: 1,
            icon: icons.Ranking,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "Tier List"
        },
        {
            id: 2,
            icon: icons.location,
            color: COLORS.yellow,

            backgroundColor: COLORS.lightyellow,
            description: "Map"
        },
        {
            id: 3,
            icon: icons.internet,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "Our Web"
        },
        {
            id: 4,
            icon: icons.Dex,
            color: COLORS.red,
            backgroundColor: COLORS.lightRed,
            description: "Dex"
        },





    ]

 

    const [features, setFeatures] = React.useState(featuresData)

    function renderHeader() {


        return (
            <View style={{
                flexDirection: 'row',
                marginVertical: SIZES.padding * 3,
                justifyContent: 'center',
                borderBottomWidth: 2,
                borderBottomColor: "black",
                paddingBottom: 6,
                borderRadius: 3,

            }}>

                <View style={{ flex: 1, flexDirection: "row" }}>
                    <Image source={require('../assets/splash.png')} resizeMethod='auto' style={{ width: '20%', height: '90%' }}></Image>
                    <Text style={{ ...FONTS.h1 }}>Recycle to Earn</Text>
                </View>

                <TouchableOpacity
                    style={{
                        height: 40,
                        width: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        borderRadius: 4,
                        borderWidth: 1,
                        border: 'black'
                    }}
                    onPress={() => {
                        navigation.navigate('SignUp')
                    }}
                >
                    <Image
                        source={icons.wallet}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.secondary
                        }}
                    />
                </TouchableOpacity>


            </View>
        )
    }

    function renderBanner() {
        return (
            <View
                style={{
                    height: 220,
                    borderRadius: 20,
                }}
            >
                <Image
                    source={images.banner}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 20
                    }}
                />
            </View>
        )
    }

    function renderFeatures() {

        const Header = () => (
            <View style={{ marginBottom: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h3 }}>Features</Text>
            </View>
        )

        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2, width: 60, alignItems: 'center' }}
                onPress={() => {
                    if (`${item.description}` == 'Our Web') {
                        Linking.openURL('https://www.ankaxlabs.com/')
                    }
                    else {
                        navigation.navigate(`${item.description}`)
                    }
                }}
            >
                <View
                    style={{
                        height: 50,
                        width: 50,
                        marginBottom: 5,
                        borderRadius: 20,
                        backgroundColor: item.backgroundColor,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={item.icon}
                        resizeMode="contain"
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: item.color
                        }}
                    />
                </View>
                <Text style={{ textAlign: 'center', flexWrap: 'wrap', ...FONTS.body4 }}>{item.description}</Text>
            </TouchableOpacity>
        )

        return (
            <FlatList
                ListHeaderComponent={Header}
                data={features}
                numColumns={4}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                style={{ marginTop: SIZES.padding * 2 }}
            />
        )
    }

    function renderPromos() {

        const HeaderComponent = () => (
            <View>
                {renderHeader()}
                {renderBanner()}
                {renderFeatures()}
            </View>
        )

        const renderPromoHeader = () => (
            <View
                style={{
                    flexDirection: 'row',
                    marginBottom: SIZES.padding
                }}
            >
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h3 }}>Special Promos</Text>
                </View>
                <TouchableOpacity
                    onPress={() => console.log("View All")}
                >
                    <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>View All</Text>
                </TouchableOpacity>
            </View>

        )

        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    marginVertical: SIZES.base,
                    width: SIZES.width / 2.5
                }}
                onPress={() => console.log(item.title)}
            >
                <View
                    style={{
                        height: 80,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: COLORS.primary
                    }}
                >
                    <Image
                        source={images.promoBanner}
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: "100%",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20
                        }}
                    />
                </View>

                <View
                    style={{
                        padding: SIZES.padding,
                        backgroundColor: COLORS.lightGray,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20
                    }}
                >
                    <Text style={{ ...FONTS.h4 }}>{item.title}</Text>
                    <Text style={{ ...FONTS.body4 }}>{item.description}</Text>
                </View>
            </TouchableOpacity>
        )
        //here imma add the consts of the progress bar
        const Progress = ({ step, steps, height }) => {
            const [width, setWidth] = React.useState(0);
            const animatedValue = React.useRef(new Animated.Value(-1000)).current;
            const reactive = React.useRef(new Animated.Value(-1000)).current;

            React.useEffect(() => {
                Animated.timing(animatedValue, {
                    toValue: reactive,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }, []);

            React.useEffect(() => {
                reactive.setValue(-width + (width * step) / steps);
            }, [step, width])


            return (
                <>

                    <View

                        onLayout={
                            (e) => {
                                const newWidth = e.nativeEvent.layout.width;

                                setWidth(newWidth);
                            }
                        }

                        style={{

                            backgroundColor: 'white',
                            borderWidth: 2,
                            borderRadius: 50,
                            overflow: 'hidden',
                            height: 30,
                        }}
                    >

                        <Animated.View
                            style={{

                                height,
                                backgroundColor: COLORS.emerald,
                                borderRadius: height,
                                overflow: 'hidden',
                                width: '100%',
                                height: '100%',
                                position: "absolute",
                                opacity: 0.5,
                                left: 0,
                                top: 0,
                                transform: [
                                    {
                                        translateX: animatedValue
                                    }
                                ],
                            }}


                        />
                        <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}> <Text style={{
                            //fontFamily:'Cochin',
                            fontSize: 12,
                            fontWeight: '900',
                            marginBottom: 10,
                        }}>
                            YOUR XP: {step}/{steps}
                        </Text></Text>
                    </View>
                </>
            )

        }



        const Progress2 = ({ step, steps, height }) => {
            const [width, setWidth] = React.useState(0);
            const animatedValue = React.useRef(new Animated.Value(-1000)).current;
            const reactive = React.useRef(new Animated.Value(-1000)).current;

            React.useEffect(() => {
                Animated.timing(animatedValue, {
                    toValue: reactive,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }, []);

            React.useEffect(() => {
                reactive.setValue(-width + (width * step) / steps);
            }, [step, width])


            return (
                <>

                    <Text style={{
                        //fontFamily:'Cochin',
                        fontSize: 25,
                        fontWeight: '900',
                        textAlign: 'center',
                        marginBottom: '5%'
                    }}>
                        LVL: {step}
                    </Text>


                </>
            )

        }

        const levelXP = () => {
            XPset(XpCounter + 1)

            if ((LvlCounter * 10 - XpCounter) == 1) {
                XPset(0)
                LVLset(LvlCounter + 1)
                console.log(LvlCounter)
            }
        }




        //here its gonna be the step counter

        const [XpCounter, XPset] = useState(0)
        const [LvlCounter, LVLset] = useState(1)


        return (
            <FlatList
                ListHeaderComponent={HeaderComponent}
                contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}

                //deleted the promos from the main menue
                //data={specialPromos}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={


                    <View>
                        <Text style={{ ...FONTS.h3, marginTop: 10 }}>
                            Follow your progress
                        </Text>



                        <View style={{ marginTop: '5%' }}>
                            <StatusBar hidden />
                            <Progress2 step={LvlCounter} steps={10} height={20} />
                        </View>



                        <View style={{ marginTop: '1%' }}>
                            <StatusBar hidden />
                            <Progress step={XpCounter % (LvlCounter * 10)} steps={LvlCounter * 10} height={20} />
                        </View>


                    
                        <TouchableOpacity
                         onPress={levelXP} title="fdasdasd"
                            style={{ borderRadius:30 , alignSelf:'center',alignItems:'center',   justifyContent : 'center',
                            alignItems : "center",marginTop:40,borderWidth:2,height:50,width:100,}}
                        >
                            <Text style={{ color: "black", fontWeight: "600",alignSelf:'center' }}>GAIN XP</Text>
                        </TouchableOpacity>

                    </View>


                }

            />
        )
    }

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            {renderPromos()}

        </SafeAreaView>
    )

}

export default Home;