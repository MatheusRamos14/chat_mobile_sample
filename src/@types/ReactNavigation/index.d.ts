import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type TAuthStackParamList = {
    Login: undefined;
};

type TAuthStackScreenProps<T extends keyof TAuthStackParamList> =
    StackScreenProps<TAuthStackParamList, T>;

type TMainBarParamList = {
    Chats: undefined;
    Calls: undefined;
    Contacts: undefined;
    More: undefined;
};

type TMainTabScreenProps<T extends keyof TMainBarParamList> =
    BottomTabScreenProps<TMainBarParamList, T>;    

declare global {
    namespace ReactNavigation {
        interface AuthStackParamList extends TAuthStackParamList { }
        interface AuthStackScreenProps<T extends keyof TAuthStackParamList> extends TAuthStackScreenProps<T> {}
        interface MainBarParamList extends TMainBarParamList { }
        interface MainBarScreenProps<T extends keyof TMainBarParamList> extends TMainTabScreenProps<T> {}
    }
}