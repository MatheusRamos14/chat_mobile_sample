import React from "react";
import { View, Text } from "react-native";
import {
    RectButton,
    RectButtonProps
} from 'react-native-gesture-handler';
import { styled } from 'nativewind';

interface Props extends RectButtonProps {
    title?: string;
    textClassName?: string;
}

const RectButtonTW = styled(RectButton);

export function Button({ title, textClassName, children, ...rest }: Props) {
    return (
        <RectButtonTW
            className={textClassName ? textClassName : "w-full bg-button_primary items-center py-3"}
            activeOpacity={0.7}
            {...rest}
        >
            {title ? (
                <Text className="font-semibold text-base text-white">
                    {title}
                </Text>
            ) : children}
        </RectButtonTW>
    );
}