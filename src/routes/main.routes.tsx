import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomBar } from '../components/BottomBar';
import { ChatsList } from '../screens/ChatsList';
import { Calls } from '../screens/Calls';
import { Contacts } from '../screens/Contacts';
import { More } from '../screens/More';

const { Navigator, Screen } = createBottomTabNavigator<ReactNavigation.MainBarParamList>();

export function MainRoutes() {
    return (
        <Navigator
            tabBar={config => <BottomBar config={config} />}
            screenOptions={{ headerShown: false }}
        >
            <Screen name="Chats" component={ChatsList} />
            <Screen name="Calls" component={Calls} />
            <Screen name="Contacts" component={Contacts} />
            <Screen name="More" component={More} />
        </Navigator>
    )
}