import AsyncStorage from '@react-native-async-storage/async-storage';

interface IStorageProps {
    key: string;
    value?: string;
}

const getItem = async ({ key }: IStorageProps) => {
    return await AsyncStorage.getItem(key);
}

const storeItem = async ({ key, value }: IStorageProps) => {
    if (!value) throw new Error('No value provided to store');

    return await AsyncStorage.setItem(key, value);
}

export { getItem, storeItem };