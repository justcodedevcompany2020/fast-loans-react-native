import React, {Component} from 'react';
import Svg, {
  Path,
  Rect,
  Circle,
  Defs,
  Stop,
  ClipPath,
  G,
  Mask,
} from 'react-native-svg';

import {AuthContext} from '../AuthContext/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginIcon from '../../assets/svg/login_icon';
import CloseIcon from '../../assets/svg/close_icon';
import PhoneCodeCloseIcon from '../../assets/svg/phone_code_close_icon';
import AutoHeightImage from 'react-native-auto-height-image';
import appsFlyer from 'react-native-appsflyer';

import {
  Text,
  Alert,
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  ImageBackground,
  Pressable,
  Linking,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import image from '../../assets/img/catalog_main_img.png';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      catalog_products: [],
      img_path: 'https://fastloans.justcode.am/uploads/',
      viewWidth: 0,
      imageWidth: 0,
      imageHeight: 0,
    };
  }

  static contextType = AuthContext;

  handleLayout = event => {
    // let { width } = event.nativeEvent.layout.width;
    this.setState({viewWidth: event.nativeEvent.layout.width});

    const image = require('../../assets/img/catalog_main_img.png');
    const {width} = Image.resolveAssetSource(image);
    const screenWidth = event.nativeEvent.layout.width; //Dimensions.get('window').width;
    const scaleFactor = screenWidth / width;
    const calculatedHeight =
      Image.resolveAssetSource(image).height * scaleFactor;
    this.setState({imageWidth: screenWidth, imageHeight: calculatedHeight});
  };

  componentDidMount() {
    appsFlyer.initSdk(
      {
        devKey: 'LdHW3zZexY8DHLWERgatNU',
        isDebug: true, // Set to false for production
      },
      result => {
        console.log(result, 'reesss');
      },
      error => {
        console.error(error);
      },
    );
    const {navigation} = this.props;

    this.getCatalogProducts();
    this.focusListener = navigation.addListener('focus', () => {
      this.getCatalogProducts();
    });
  }
  componentWillUnmount() {
    if (this.focusListener) {
      this.focusListener();
    }
  }

  getCatalogProducts = async () => {
    try {
      fetch('https://fastloans.justcode.am/api/get_all_products', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          return response.json();
        })
        .then(async response => {
          if (response.hasOwnProperty('status')) {
            if (response.status === true) {
              if (response.hasOwnProperty('data')) {
                if (response.data.length > 0) {
                  this.setState({
                    catalog_products: response.data,
                  });
                }
              }
            }
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  handlePress = link => {
    this.handlePressButton();
    Linking.openURL(link);
  };

  handlePressButton = () => {
    appsFlyer.onDeepLink(
      'open_url',
      {param: 'value'},
      result => console.log(result, 'ev rressss for btn'),
      error => console.error(error),
    );
  };

  render() {
    const {viewWidth, imageWidth, imageHeight} = this.state;

    return (
      <SafeAreaView style={styles.container} onLayout={this.handleLayout}>
        <StatusBar style="dark" />
        <ScrollView style={{width: '100%', flex: 1}}>
          <View style={styles.catalog_header}>
            <View style={styles.catalog_header_img_box}>
              <Image
                style={[styles.catalog_header_img_child, {}]}
                source={require('../../assets/img/catalog_main_img.png')}
              />
              {/* */}
            </View>
          </View>
          <View style={styles.catalog_main_wrapper}>
            <Text style={styles.catalog_main_wrapper_title}>
              Оставьте 3 заявки, чтобы гарантированно получить одобрение!
            </Text>
            <View style={styles.catalog_products_items_wrapper}>
              {this.state.catalog_products.map((product, index) => {
                return (
                  <View style={[styles.catalog_product_item]} key={index}>
                    <View style={styles.catalog_product_item_img_box}>
                      <Image
                        source={{uri: this.state.img_path + product.photo}}
                        style={styles.catalog_product_item_img_child}
                      />
                    </View>
                    <View style={styles.catalog_products_item_details_wrapper}>
                      <Text style={styles.catalog_products_item_detail_title}>
                        Сумма:
                      </Text>
                      <Text style={styles.catalog_products_item_detail_info}>
                        До {product.summ} ₽
                      </Text>
                    </View>
                    <View style={styles.catalog_products_item_details_wrapper}>
                      <Text style={styles.catalog_products_item_detail_title}>
                        Ставка:
                      </Text>
                      <Text style={styles.catalog_products_item_detail_info}>
                        {product.bid}%
                      </Text>
                    </View>
                    <View style={styles.catalog_products_item_details_wrapper}>
                      <Text style={styles.catalog_products_item_detail_title}>
                        Возраст:
                      </Text>
                      <Text style={styles.catalog_products_item_detail_info}>
                        От {product.age} лет
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.get_money_btn}
                      title={product.button_link}
                      onPress={() => this.handlePress(product.button_link)}>
                      <Text style={styles.get_money_btn_text}>
                        {product.button_text}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#2049D9',
    width: '100%',
    height: '100%',
  },
  catalog_header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  catalog_header_img_box: {
    width: '100%',
    // maxWidth: 226,
    height: 238,
    position: 'relative',
    bottom: -10,
  },
  catalog_header_img_child: {
    width: '100%',
    height: '100%',
    position: 'relative',
    // left: -30,
    resizeMode: 'contain',
  },

  catalog_header_info_box: {
    maxWidth: 190,
    width: '100%',
  },
  catalog_header_info_box_title: {
    color: '#ffffff',
    width: 175,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 18,
    textAlign: 'right',
    paddingRight: 17,
  },
  catalog_header_info_box_item: {
    backgroundColor: '#ffffff',
    borderRadius: 100,
    width: '100%',
    paddingVertical: 6,
    // height: 28,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  catalog_header_info_box_item_title: {
    color: '#2049D9',
    fontWeight: '600',
    fontSize: 14,
  },
  catalog_main_wrapper_title: {
    color: '#1B1B1B',
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 12,
  },
  catalog_main_wrapper: {
    width: '100%',
    backgroundColor: '#E9E9E9',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 10,
    paddingBottom: 10,
    // overflow: 'hidden'
    // flex: 1,
    paddingHorizontal: 16,
  },

  // catalog_main_wrapper_child: {
  //   width: '100%',
  //     flex: 1,
  // },
  catalog_products_items_wrapper: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  catalog_product_item: {
    width: '48%',
    marginBottom: 12,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 10,
  },
  catalog_product_item_img_box: {
    maxWidth: 156,
    width: '100%',
    height: 45,
    marginBottom: 10,
  },
  catalog_product_item_img_child: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  catalog_products_item_details_wrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  catalog_products_item_detail_title: {
    color: '#757575',
    fontWeight: '400',
    fontSize: 14,
  },
  catalog_products_item_detail_info: {
    color: '#757575',
    fontWeight: '600',
    fontSize: 14,
  },
  get_money_btn: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#2049D9',
    borderRadius: 12,
    height: 40,
    marginTop: 8,
  },
  get_money_btn_text: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});
