import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async (key: string) => {
    const response = await AsyncStorage.getItem(key)

    return response
}

const storeToken = async (key: string, token: string) => {
    await AsyncStorage.setItem(key, token)
}

export { getToken, storeToken };