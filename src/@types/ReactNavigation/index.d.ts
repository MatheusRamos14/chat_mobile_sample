import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';

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

type TAppStackParamList = {
    Main: TMainBarParamList;
    Chat: ChatScreenParams;
};

type ChatScreenParams = {
    chat_id: string;
    friend_id: string;
    friend_name: string;
}

type TAppStackScreenProps<T extends keyof TAppStackParamList> =
    StackScreenProps<TAppStackParamList, T>

type TCompositeProps<T extends keyof TMainBarParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<TMainBarParamList, T>,
        StackScreenProps<TAppStackParamList>
    >

declare global {
    namespace ReactNavigation {
        interface AuthStackParamList extends TAuthStackParamList { }
        interface AuthStackScreenProps<T extends keyof TAuthStackParamList> extends TAuthStackScreenProps<T> { }

        interface MainBarParamList extends TMainBarParamList { }
        interface MainBarScreenProps<T extends keyof TMainBarParamList> extends TMainTabScreenProps<T> { }

        interface AppStackParamList extends TAppStackParamList { }
        interface AppStackScreenProps<T extends keyof TAppStackParamList> extends TAppStackScreenProps<T> { }

        interface CompositeProps<T extends keyof TMainBarParamList> extends TCompositeProps<T> { }
    }
}