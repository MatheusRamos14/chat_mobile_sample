import React from "react";
import { Text, View } from "react-native";
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import { BorderlessButton } from "react-native-gesture-handler";
import { styled } from "nativewind";

const BorderlessButtonTW = styled(BorderlessButton);

type ScreenName = keyof ReactNavigation.MainBarParamList;

interface IBottomBarProps {
    config: BottomTabBarProps
}

export function BottomBar({ config }: IBottomBarProps) {
    const { navigation, state } = config;

    const iconConfig = {        
        Chats: 'message-square',
        Calls: 'phone',
        Contacts: 'users',
        More: 'more-horizontal'
    }    

    return (
        <View
            className="
                w-full bg-white h-16 flex-row items-center justify-around
                border-t border-t-black/10
            "
        >
            {state.routes.map((route, index) => {
                const label = route.name as ScreenName;
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true
                    })

                    if (!isFocused && !event.defaultPrevented)
                        navigation.navigate({ name: route.name, params: undefined });
                };

                const onLongPressed = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key
                    })
                }
                return (
                    <BorderlessButtonTW
                        className="items-center justify-center"
                        onPress={onPress}
                        onLongPress={onLongPressed}
                        key={route.name}
                    >
                        <Feather
                            name={`${iconConfig[label]}`}
                            color={isFocused ? '#3355FF' : '#1A1A1A'}
                            size={24}
                        />
                        <Text className={`font-semibold text-xs ${isFocused ? 'text-black' : 'text-[#666666]'} mt-1`}>
                            {label}
                        </Text>
                    </BorderlessButtonTW>

                );
            })}
        </View>
    )
}