import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity , ScrollView} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('little_lemon', '1.0');

const categories = [
  { id: 1, name: 'starters' },
  { id: 2, name: 'mains' },
  { id: 3, name: 'desserts' },
  { id: 4, name: 'Drinks' },
  { id: 5, name: 'Special' },
];

const Header = () => {
  const navigation = useNavigation();

  const handlePressAvatar = () => {
    navigation.navigate('Profile');
  };

  const [menu, setMenu] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoriesName, setSelectedCategoriesName] = useState([]);
  const toggleCategory = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
      console.log(selectedCategories)

    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
      console.log(selectedCategories)
    }
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedCategories.includes(item.id);
    return (
      <View style={{height: 90}}>
        <TouchableOpacity
        style={[styles.category, isSelected && styles.selectedCategory]}
        onPress={() => (toggleCategory(item.id), setSelectedCategoriesName(item.name))}
      >
        <Text style={[styles.categoryText, isSelected && styles.selectedCategoryText]}>
          {item.name}
        </Text>
      </TouchableOpacity>
      </View>
    );
  };
  const CategoryScroll = <ScrollView horizontal>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{height:'100%',}}
      />
    </ScrollView>

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM menu',
        [],
        (_, { rows }) => {
          if (rows.length === 0) {
            fetchMenuData();
          } else {
            setMenuItems(rows._array);
          }
        },
        error => console.log(error)
      )}
    )}, [])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu.json'
        );
        setMenu(response.data.menu);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  
  const [searchInput, setSearchInput] = useState('');
  const IntoView = <View style={styles.IntoViewStyle}>
    <Text style={{color: "#F4CE14", fontSize: '40pt', marginLeft: 10}}> Little Lemon</Text>
    <View style={{flexDirection: 'row', width: '100%' }}>
      <View style={{flexDirection: 'column', width: '65%' }}>
        <Text style={{color: "white", fontSize: '40pt', marginLeft: 15}}>Chicago</Text>
        <Text style={{color: "white", marginLeft: 15}}>
          We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
      </View>
      <Image source={require('../assets/HeroImage.png')} style={[styles.imageIntroView, {width: '33.5%'}]} />
    </View> 
    <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 5, marginHorizontal: 15, marginTop: 10, alignItems: 'center', height: '15%' }}>
      <TextInput placeholder="Search" style={{ flex: 1, marginLeft: 10 }}
          value={searchInput}
          onChangeText={text => setSearchInput(text)} />
    </View>
  </View>
  
  const renderMenuItem = ({ item }) => {
    // Show all items if no categories are selected
    if (selectedCategories.length === 0) {
      return (
        <View style={styles.item}>
          <View style={styles.details}>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>{`$ ${item.price}`}</Text>
          </View>
          <Image source={{ uri: `${item.image}` }} style={styles.image} />
        </View>
      );
    }
  
    // Filter items based on selected categories
    else if (selectedCategoriesName.includes(item.category)) {
      // console.log(selectedCategories + "and the item category is : " + item.category)
      return (
        <View style={styles.item}>
          <View style={styles.details}>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>{`$ ${item.price}`}</Text>
          </View>
          <Image source={{ uri: `${item.image}` }} style={styles.image} />
        </View>
      );
    }
  
    return null;
  };
  
  
  
  const HeaderView = <View style={styles.headerContainer}>
    <Image
        source={require('../assets/Logo.png')}
        style={styles.logo}
        resizeMode="contain"
    />
    <TouchableOpacity onPress={handlePressAvatar}>
        <Image
        source={require('../assets/Profile.png')}
        style={styles.avatar}
        resizeMode="contain"
        />
    </TouchableOpacity>
    </View>

  return (
    <View style={{height: '100%', marginTop: 20}}>
        {HeaderView}
        {IntoView}
        {CategoryScroll}
        <FlatList
            data={menu}
            keyExtractor={(item) => item.name}
            renderItem={renderMenuItem}
            style={styles.list}
        />
    </View>
  );
};
  
export default Header;

const styles = {
  category: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    height:40,
    marginTop: 10, 
  },
  categoryText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  selectedCategory: {
    backgroundColor: '#495E57',
  },
  selectedCategoryText: {
    backgroundColor: '#495E57',
    color: 'white'
  },
  IntoViewStyle: {
    backgroundColor: '#495E57' , 
    width: '100%',
    height: '30%' 
  },
  imageIntroView: {
    width: 150,
    height: 120,
    borderRadius: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '10%',
    backgroundColor: 'white'
  },
  logo: {
    height: 75,
    width: 200,
    resizeMode: 'contain'
  },
  avatar: {
    height: 40,
    width: 70,
    borderRadius: 20,
  }, 
  list: {
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 16,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
};
