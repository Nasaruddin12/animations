import React, { useEffect, useRef, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Dimensions,
    Animated,
    PanResponder,
    ImageBackground,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { height, width } from '../utils';
import MenuBar from './MenuBar';


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;


const StackAnimation = ({ movies }) => {

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [datalength, setLength] = useState(10);
    const [noMoreCard, setNoMoreCard] = useState(false);


    const removeCard = (id) => {
        // alert(id);
        setCurrentIndex(prevIndex => datalength - 1 == prevIndex ? 0 : prevIndex + 1);

    };


    const SwipeableCard = ({ removeCard, currentIndex }) => {
        const xPosition = useRef(new Animated.Value(0)).current;

        let cardOpacity = new Animated.Value(1);

        let rotateY = xPosition.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: ['-90deg', '0deg', '90deg'],
        });

        let nextCardY = xPosition.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: ['0deg', '80deg', '0deg'],
        });

        let nextCardPositionX = xPosition.interpolate({
            inputRange: [-100, 0, 100],
            outputRange: [SCREEN_WIDTH - 204, SCREEN_WIDTH - 8, - SCREEN_WIDTH - 204],
        });
        let nextScale = xPosition.interpolate({
            inputRange: [-100, 0, 100],
            outputRange: [0.89, 0.8, 0.89],
        });

        let Scale = xPosition.interpolate({
            inputRange: [-100, 0, 100],
            outputRange: [0.93, 1, 0.93],
        });


        let descrptionX = xPosition.interpolate({
            inputRange: [-100, 0, 200],
            outputRange: [- SCREEN_WIDTH, 0, SCREEN_WIDTH],
        });
        let descrptionSceondX = offset.interpolate({
            inputRange: [-100, 0, 200],
            outputRange: [0, SCREEN_WIDTH, -SCREEN_WIDTH],
        });


        let panResponder = PanResponder.create({
            onStartShouldSetPanResponder:
                (evt, gestureState) => false,
            onMoveShouldSetPanResponder:
                (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture:
                (evt, gestureState) => false,
            onMoveShouldSetPanResponderCapture:
                (evt, gestureState) => true,
            onPanResponderMove:
                (evt, gestureState) => {
                    if (gestureState.dx <= 0) {
                        xPosition.setValue(gestureState.dx);
                    }
                },
            onPanResponderRelease: (evt, gestureState) => {
                if (
                    gestureState.dx < SCREEN_WIDTH - 3000 &&
                    gestureState.dx > -SCREEN_WIDTH + 280
                ) {
                    Animated.spring(xPosition, {
                        toValue: 0,
                        speed: 5,
                        bounciness: 10,
                        useNativeDriver: false,
                    }).start();
                }
                else if (gestureState.dx < -SCREEN_WIDTH + 350) {
                    Animated.parallel([
                        Animated.timing(xPosition, {
                            toValue: - SCREEN_WIDTH + 200,
                            duration: 1000,
                            useNativeDriver: false,
                        }),
                        Animated.timing(cardOpacity, {
                            toValue: 0,
                            duration: 200,
                            useNativeDriver: false,
                        }),
                    ]).start(() => {
                        removeCard();
                    });
                }
            },
        });


        return movies.map((item, i) => {
            if (i < currentIndex) {
                return null;
            } else {
                return (
                    <View key={item.key} >
                        <View style={StyleSheet.absoluteFill} >
                            <Animated.View
                                {...panResponder.panHandlers}
                                style={[
                                    styles.cardStyle,
                                    {
                                        opacity: currentIndex + 2 <= i ? 0 : 1,
                                        transform: currentIndex == i ? [{ translateX: xPosition }, { rotateY: rotateY }, { scale: Scale }] :
                                            currentIndex + 1 == i ? [{ rotateY: nextCardY }, { translateX: nextCardPositionX }, { scale: nextScale }] : [],
                                    },
                                ]}
                            >
                                <ImageBackground
                                    style={{
                                        height: '100%', width: null,
                                        resizeMode: 'fill',
                                        justifyContent: 'center',
                                    }}
                                    blurRadius={8}
                                    source={{ uri: item.poster }}
                                >
                                    <View style={{
                                        height: '100%', width: null,
                                        backgroundColor: 'rgba(52, 52, 52, 0.1)', justifyContent: 'center'
                                    }}>
                                        <FastImage
                                            style={{
                                                height: SCREEN_WIDTH * 0.65, width: SCREEN_WIDTH * 0.65,
                                                alignSelf: "center",
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                            resizeMode='cover'
                                            source={{ uri: item.poster }}
                                        />
                                    </View>
                                </ImageBackground>
                            </Animated.View>

                        </View>
                        <View style={{ flex: 0.4 }}>
                            <View style={StyleSheet.absoluteFill}>
                                <Animated.View style={[
                                    {
                                        transform: currentIndex == i ? [{ translateX: descrptionX }, { translateY: offset }] :
                                            currentIndex + 1 == i ? [{ translateX: descrptionSceondX }, { translateY: offset }] : [{ translateY: offset }]
                                    }, styles.descCard]}>
                                    <View style={{ marginHorizontal: width * 0.15, marginTop: 20, height: '100%', width: null, }}>
                                        <Text style={styles.header}>Release Date</Text>
                                        <Text style={styles.date}>{item.releaseDate.slice(8, 10)}</Text>
                                        <Text style={styles.title}>{item.title}</Text>
                                        <Text style={styles.description}>{item.description}</Text>
                                    </View>
                                </Animated.View>
                            </View>
                        </View>
                    </View>
                );
            }
        }).reverse();
    };


    const fadeAnim = useRef(new Animated.Value(0)).current;
    const offset = useRef(new Animated.Value(400)).current;
    const offsetIcon = useRef(new Animated.Value(400)).current
    useEffect(() => {

        const animate = () => {
            Animated.timing(offset, {
                toValue: 100,
                duration: 1500,
                useNativeDriver: false,
            }).start(() => {
            });
        };
        const animateIcon = () => {
            Animated.timing(offsetIcon, {
                toValue: 0,
                duration: 1500,
                useNativeDriver: false,
            }).start(() => {
            });
        };
        animateIcon();
        animate();
        fadeIn()
    }, [])

    const animatedStyles = {
        transform: [{ translateY: offsetIcon }],
    };

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Animated.View style={[styles.closeIcon, { opacity: fadeAnim }]}>
                <EvilIcons name='close' size={27} color='#808080' />
            </Animated.View>
            <View>
                <MenuBar size={35} color='#FFFFFF' onPress={() => console.log()} style={styles.barIcon} />
            </View>
            <View style={{ position: 'absolute', top: SCREEN_HEIGHT / 1.77, width: "100%" }}>
                <View style={styles.indicatorContainer}>
                    {
                        movies.map((image, imageIndex) => {
                            return (
                                <Animated.View key={imageIndex} style={[styles.normalDots, {
                                    width: 10,
                                    height: currentIndex == imageIndex ? 5 : 3,
                                    backgroundColor: currentIndex == imageIndex ? '#FFFFFF' : '#808080'
                                },]} />

                            );
                        })
                    }
                </View>
            </View>
            <View style={styles.container}>
                <SwipeableCard
                    removeCard={() => removeCard()}
                    currentIndex={currentIndex}
                />
            </View>
            <Animated.View style={[animatedStyles,styles.icons]}>
                <View style={[styles.likeStyle]}>
                    <AntDesign name='heart' color='#FFFFFF' size={30} />
                </View>
                <View style={styles.bookMarkStyle}>
                    <Feather name='bookmark' color='#FFFFFF' size={30} />
                </View>
            </Animated.View>

        </SafeAreaView>
    );
};

export default StackAnimation;

const styles = StyleSheet.create({
    container: {
        flex: 0.65,
    },
    cardStyle: {
        height: SCREEN_HEIGHT / 1.6,
        width: SCREEN_WIDTH,
        // position: 'absolute',
    },
    indicatorContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'flex-end',
        zIndex: 999
    },
    normalDots: {
        marginHorizontal: 4,
    },
    closeIcon: {
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
        alignItems: 'center',
        height: 33,
        width: 33,
        paddingTop: 2,
        position: 'absolute',
        zIndex: 999,
        marginTop: 40,
        left: 30
    },
    barIcon: {
        position: 'absolute',
        paddingTop: 3,
        position: 'absolute',
        zIndex: 999,
        marginTop: 40,
        right: 30
    },
    descCard: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        top: SCREEN_HEIGHT / 2.0,
        backgroundColor: '#FFF8E7',
        height: SCREEN_HEIGHT * 0.44,
        position: 'absolute'
    },
    header: {
        fontSize: width * 0.05,
        color: '#000',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    date: {
        fontSize: width * 0.45,
        color: '#000',
        fontWeight: '900',
        marginTop: -30
    },
    title: {
        fontSize: width * 0.08,
        color: '#000',
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginTop: -25
    },
    description: {
        fontSize: width * 0.04,
        color: '#000',
        fontWeight: '500',
        letterSpacing: 1,
        marginTop: 10
    },
    icons: {
        position: 'absolute',
        zIndex: 999,
        top: height / 1.8,
        right: 20
    },
    likeStyle: {
        backgroundColor: 'rgba(52,52,52,0.8)',
        padding: 12
    },
    bookMarkStyle: {
        padding: 12,
        backgroundColor: '#64ad9a'
    }

});
