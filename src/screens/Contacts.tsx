import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { styled } from 'nativewind';
import Feather from 'react-native-vector-icons/Feather';

import { Header } from '../components/Header';

const BorderlessButtonTW = styled(BorderlessButton)

export function Contacts() {
    return (
        <View className="flex-1 bg-white items-center justify-center">
            <Header
                title="Contacts"
                leftElement={
                    <View className='w-8 h-8 bg-slate-200 rounded-full'>

                    </View>                    
                }
                rightElement={
                    <BorderlessButtonTW>
                        <Feather
                            name="plus"
                            size={24}
                            color="black"
                        />
                    </BorderlessButtonTW>
                }
            />
            <Text>Contacts</Text>
        </View>
    )
}