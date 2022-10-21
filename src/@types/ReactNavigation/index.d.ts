export type AuthStackList = {
    Login: undefined
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends AuthStackList { }
    }
}