import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {}

export function Input({ ...rest }: Props) {
    return (
        <TextInput
            className="
                w-full px-4 py-3 border rounded-xl border-border_default
                font-normal text-base text-text_primary
                focus:border-button_primary
            "
            placeholderTextColor="#666666"
            {...rest}
        />
    );
}