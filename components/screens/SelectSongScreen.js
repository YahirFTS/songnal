import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { Buffer } from 'buffer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLIENT_ID = '156aafab317d4b59ac9b7a4053378ec9';
const CLIENT_SECRET = '71c9b4540bc84630854246b76c4d629b';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';


const getAuthToken = async () => {
    const credentials = `${CLIENT_ID}:${CLIENT_SECRET}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');
  
    try {
      const response = await axios.post(TOKEN_URL, 'grant_type=client_credentials', {
        headers: {
          'Authorization': `Basic ${encodedCredentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      const { access_token } = response.data;
      await AsyncStorage.setItem('spotify_auth_token', access_token);
      return access_token;
    } catch (error) {
      console.error('Error obtaining Spotify auth token:', error);
    }
  };
  
  const searchTracks = async (query, token) => {
    try {
      const response = await axios.get(`https://api.spotify.com/v1/search`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        params: {
          q: query,
          type: 'track',
        },
      });
  
      return response.data.tracks.items;
    } catch (error) {
      console.error('Error searching Spotify tracks:', error);
    }
  };
  
  const SelectSongScreen = () => {
    const [query, setQuery] = useState('');
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      (async () => {
        await getAuthToken();
      })();
    }, []);
  
    const handleSearch = async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem('spotify_auth_token');
      const results = await searchTracks(query, token);
      setTracks(results);
      setLoading(false);
    };

  
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Search for Music</Text>
          <TextInput
            style={styles.input}
            placeholder="Search for a song..."
            value={query}
            onChangeText={setQuery}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <FlatList
              data={tracks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.trackContainer}>
                {item.album.images.length > 0 &&(
                  <Image 
                  source={{uri: item.album.images[0].url}}
                  style={styles.albumImage}
                  />
                  )}
                  <View style={styles.trackInfo}>
                  <Text style={styles.trackName}>{item.name}</Text>
                  <Text style={styles.artistName}>{item.artists[0].name}</Text>
                </View>
                </View>
              )}
            />
          )}
        </View>
      );
    };
    
    export default SelectSongScreen;
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        overflow: 'hidden',
        
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
      },
      input: {
        width: '100%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
      },
      searchButton: {
        padding: 10,
        backgroundColor: '#1DB954',
        borderRadius: 5,
      },
      searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      trackContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        
      },
      trackName: {
        fontSize: 18,
      },
      artistName: {
        fontSize: 14,
        color: '#666',
      },

      albumImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
        
      },

      
    });