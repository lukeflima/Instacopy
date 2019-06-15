import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker'
import api from '../services/api'

import { View, Image, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';

export default class New extends Component {
  static navigationOptions = {
    headerTitle: 'Nova publicação'
  }

  state = {
    author: '',
    place: '',
    description: '',
    hashtags: '',
    preview: null,
    image: null,
  }

  handleSelectImage = () => {
    ImagePicker.showImagePicker({
      title: 'Selecionar imagem',
      takePhotoButtonTitle: "Tirar foto da câmera",
      cancelButtonTitle: "Cancelar",
      chooseFromLibraryButtonTitle: "Escolha da Galeria"
    }, upload => {
      if(upload.error){
        console.log('Error');
      } else if (upload.didCancel){
        console.log('Used canceled');
      } else {
        const preview = {
          uri: `data:image/jpeg;base64,${upload.data}`
        }

        const image = {
          uri: upload.uri,
          type: upload.type,
          name: upload.fileName ? upload.fileName.toLowerCase().replace('.heic','.jpg') : `${new Date().getTime()}.jpg`
        }

        this.setState({ preview, image })
      }
    }
    )
  }

  handleSubmit = async () => {
    const post = new FormData();
    
    const { author, place, description, hashtags, image } = this.state;

    post.append('author', author);
    post.append('place', place);
    post.append('description', description);
    post.append('hashtags', hashtags);
    post.append('image', image);

    await api.post('/posts', post);
    
    this.props.navigation.navigate('Feed');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.selectButton} onPress={this.handleSelectImage}>
          <Text style={styles.selectButtonText}>Selecionar image</Text>
        </TouchableOpacity>
        { this.state.preview && <Image style={styles.preview} source={this.state.preview} />}
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Nome do autor"
          placeholderTextColor="#999"
          onChangeText={author => this.setState({ author })}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Local da foto"
          placeholderTextColor="#999"
          onChangeText={place => this.setState({ place })}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Descrição"
          placeholderTextColor="#999"
          onChangeText={description => this.setState({ description })}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Hashtags"
          placeholderTextColor="#999"
          onChangeText={hashtags => this.setState({ hashtags })}
        />
        <TouchableOpacity style={styles.shareButton} onPress={this.handleSubmit}>
          <Text style={styles.shareButtonText}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  selectButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCC',
    borderStyle: 'dashed',
    height: 42,

    justifyContent: 'center',
    alignItems: 'center',
  },

  selectButtonText: {
    fontSize: 16,
    color: '#666',
  },

  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 4,
  },

  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginTop: 10,
    fontSize: 16,
  },

  shareButton: {
    backgroundColor: '#7159c1',
    borderRadius: 4,
    height: 42,
    marginTop: 15,

    justifyContent: 'center',
    alignItems: 'center',
  },

  shareButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },

  preview: {
    width: '100%',
    height: 100,
  }
});
