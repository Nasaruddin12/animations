import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import MenuBar from '../component/MenuBar';
import { height, width } from '../utils';
import SearchBar from '../component/SearchBar';
import Slider from '../component/Slider';
import { getMovies } from '../api';
import FastImage from 'react-native-fast-image';


export default function HomeScreen() {
    const [text, setText] = useState("")
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies();
        async function fetchMovies() {
            const moviesData = await getMovies();
            setMovies(moviesData.splice(0, 10));
        }
    }, []);

    const Card = ({ item }) => {
        return (
            <View style={{ width: width * 0.35, height: height * 0.2, marginLeft: width * 0.06, marginTop: width * 0.06 }}>
                <FastImage
                    style={{ flex: 1, height: null, width: null }}
                    source={{ uri: item.poster }}
                    resizeMode='cover' />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient
                colors={['#8f83c3', '#8f83c3', '#a9c9ba', '#a9c9ba']} style={styles.linearGradient}>
                <View style={styles.menuBarStyle}>
                    <MenuBar size={40} color='#FFFFFF' onPress={() => console.log()} style={styles.barIcon} />
                    <Text style={styles.logoText}>VICE</Text>
                </View>
                <View style={styles.serachStyle}>
                    <SearchBar
                        placeholder={""}
                        value={text}
                        onChangeText={(e) => setText(e)}
                    />
                </View>
                <Text style={styles.title}>The Archive</Text>
                <View style={{ flex: height * 0.0013 }}>
                    <Slider movies={movies} />
                </View>
                <View style={{ flex: 0.5 }}>
                    <Text style={styles.textHeader}>All Editions</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {movies.map((item, i) => (
                            <Card item={item} key={item.key} />
                        ))}

                    </ScrollView>
                </View>

            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    logoText: {
        fontFamily: "Tourney",
        color: '#fff',
        fontSize: 35,
        textAlign: "center"
    },
    menuBarStyle: {
        marginTop: width * 0.08,
    },
    barIcon: {
        position: 'absolute',
        right: 35,
        top: 5
    },
    serachStyle: {
        marginHorizontal: width * 0.08,
        marginTop: width * 0.04
    },
    title: {
        fontSize: width * 0.05,
        color: '#FFFFFF',
        textTransform: 'uppercase',
        fontWeight: "900",
        letterSpacing: 1,
        textAlign: "center",
        marginVertical: width * 0.06
    },
    textHeader: {
        fontSize: width * 0.05,
        color: '#1A1A1A',
        textTransform: 'uppercase',
        fontWeight: "700",
        letterSpacing: 1,
        // marginTop: width * 0.02,
        marginLeft: width * 0.06
    }
})