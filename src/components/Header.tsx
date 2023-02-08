import React from 'react';
import {
    View,
    Text,
    StatusBar
} from 'react-native';

interface IHeaderProps {
    title: string;
    leftElement?: React.ReactNode
    rightElement?: React.ReactNode
}

export function Header({ title, leftElement, rightElement }: IHeaderProps) {

    return (
        <View
            className='
                w-full bg-white flex-row items-center justify-between
                border-b border-b-black/20 px-4 py-2
                relative top-0
            '
            style={{ paddingTop: StatusBar.currentHeight }}
        >
            {leftElement ? leftElement : <View></View>}
            <Text className='flex-1 text-center font-semibold text-base text-[#1A1A1A]'>
                {title}
            </Text>
            {rightElement ? rightElement : <View></View>}
        </View>
    )
}