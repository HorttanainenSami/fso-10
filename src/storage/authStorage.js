import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const rawToken = await AsyncStorage.getItem(
      `${this.namespace}:token`
    );
    return JSON.parse(rawToken);
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(
      `${this.namespace}:token`,
      JSON.stringify(accessToken)
    );
  }

  async deleteAccessToken() {
    await AsyncStorage.removeItem(
      `${this.namespace}:token`
    );
  }
}

export default AuthStorage;
