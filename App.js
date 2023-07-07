import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  NativeModules,
} from 'react-native';

import * as React from 'react';
// import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import {AuthContext} from './components/AuthContext/context';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignUpComponent from './components/unlogged_user/sign_up';
import CatalogComponent from './components/logged_user/Catalog';
import SplashScreen from 'react-native-splash-screen';
import appsFlyer from 'react-native-appsflyer';

function SignUpScreen({navigation}) {
  return <SignUpComponent navigation={navigation} />;
}

function CatalogScreen({navigation}) {
  return <CatalogComponent navigation={navigation} />;
}

export default function App() {
  const popAction = StackActions.pop(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    userToken: null,
    role_id: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.token,
          // role_id: action.role_id,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          role_id: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          // role_id: action.role_id,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async foundUser => {
        // setIsLoading(true);
        const userToken = String(foundUser.token);

        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGIN', token: userToken});
        // callback();
      },
      signOut: async callback => {
        try {
          await AsyncStorage.removeItem('userToken');

          setIsLoading(false);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
        callback();
      },
      signUp: () => {
        // setIsLoading(false);
      },
    }),
    [],
  );

  // Проверка при входе в приложение.

  let intervalID;

  React.useEffect(() => {
    SplashScreen.hide();
    // appsflyer
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
  

    // appsFlyer.trackEvent('custom_event_name', {custom_param: 'value'});

    setTimeout(async () => {
      let userToken = null;

      try {
        userToken = await AsyncStorage.getItem('userToken');
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }

      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);



  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken === null ? (
          <Stack.Navigator
            initialRouteName="SignUp"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={({route}) => ({
                tabBarButton: () => null,
                tabBarStyle: {display: 'none'},
              })}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            initialRouteName="Catalog"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen
              name="Catalog"
              component={CatalogScreen}
              options={({route}) => ({
                tabBarButton: () => null,
                tabBarStyle: {display: 'none'},
              })}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
