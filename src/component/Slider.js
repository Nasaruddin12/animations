import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, Animated, PanResponder, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import { getMovies } from '../api';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Slider = ({ movies }) => {
    const position = useRef(new Animated.Value(0)).current;
    const positionY = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [datalength, setLength] = useState(10);

    const rotate = position.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp'
    });

    const rotateAndTranslate = {
        transform: [{
            rotate: rotate
        },
        {translateX:position},
        {translateY:positionY}
        // ...position.getTranslateTransform()
        ]
    };

    const nextCardScale = position.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [0.85, 0.8, 0.85],
        extrapolate: 'clamp'
    });

    const nextCardRotate = position.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ['-18deg', '18deg', '-18deg'],
        extrapolate: 'clamp'
    });

    const nextCardTransalteX = position.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [-90, 110, -90],
        extrapolate: 'clamp'
    });

    const nextCardTransalteY = position.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [-2, -2, -2],
        extrapolate: 'clamp'
    });

    const sceondCardScale = position.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0.85, 1],
        extrapolate: 'clamp'
    });

    const sceondCardRotate = position.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ['0deg', '-18deg', '0deg'],
        extrapolate: 'clamp'
    });

    const sceondCardTransalteX = position.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [0, -90, 0],
        extrapolate: 'clamp'
    });

    const sceondCardTransalteY = position.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [0, -2, 0],
        extrapolate: 'clamp'
    });
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                position.setValue(gestureState.dx );
                positionY.setValue(gestureState.dy)
            },
            onPanResponderRelease: (evt, gestureState) => {
                positionY.setValue(0)
                if (gestureState.dx > 80) {
                    Animated.spring(position, {
                        toValue: SCREEN_WIDTH + 150,
                        useNativeDriver: true
                    }).start(() => {
                        increment()
                        position.setValue(0);
                    });
                } else if (gestureState.dx < -80) {
                    Animated.spring(position, {
                        toValue: -SCREEN_WIDTH - 100,
                        useNativeDriver: true
                    }).start(() => {
                        increment()
                        position.setValue(0);
                    });
                } else {
                    Animated.spring(position, {
                        toValue: 0,
                        friction: 4,
                        useNativeDriver: true
                    }).start();
                }
            },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                return gestureState.dx != 0 && gestureState.dy != 0;
            },
        })
    ).current;


    const increment = () => {
        setCurrentIndex(prevIndex => datalength - 1 == prevIndex ? 0 : prevIndex + 1);
    }

    const Navigation = useNavigation()

    const renderUsers = (currentIndex) => {
        return movies.map((item, i) => {
            if (i < currentIndex) {
                return null;
            } else {
                return (
                    <View style={StyleSheet.absoluteFill} key={item.key} >
                        <Animated.View
                            {...panResponder.panHandlers}
                            style={[{
                                transform: currentIndex == i ?
                                    rotateAndTranslate.transform : i == currentIndex + 1 ?
                                        [{ scale: sceondCardScale },
                                        { rotate: sceondCardRotate },
                                        { translateX: sceondCardTransalteX },
                                        { translateY: sceondCardTransalteY }
                                        ] : i == currentIndex + 2 ?
                                            [{ scale: nextCardScale },
                                            { rotate: nextCardRotate },
                                            { translateX: nextCardTransalteX },
                                            { translateY: nextCardTransalteY }
                                            ] :
                                            [{ scale: 0.8 },
                                            { rotate: '18deg' },
                                            { translateX: 110 },
                                            { translateY: -2 }
                                            ],
                                height: SCREEN_HEIGHT - 480,
                                width: SCREEN_WIDTH * 0.7,
                                marginHorizontal: SCREEN_WIDTH * 0.15,
                                position: 'absolute',
                                zIndex: 1000
                            },]}>
                            <TouchableWithoutFeedback style={styles.cardStyle} onPress={() => Navigation.navigate('/sceondScreen',{movies : movies})}>
                                <FastImage onPress={() => console.log(0)}
                                    style={{
                                        flex: 1, height: null, width: null,

                                    }}
                                    source={{ uri: item.poster }}
                                    resizeMode='cover' />
                            </TouchableWithoutFeedback>
                        </Animated.View>
                    </View>
                );
            }
        }).reverse();
    };

    return (
        <View style={{ flex: 1 }}>
            {renderUsers(currentIndex)}
        </View>
    );
};
const styles = StyleSheet.create({
    cardStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        elevation: 10,
        flex: 1
    }
})
export default Slider;
