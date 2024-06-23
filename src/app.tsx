import '@mantine/core/styles.css';
import {AppShell, Box, em, useComputedColorScheme} from '@mantine/core';
import {ModalsProvider} from '@mantine/modals';
import {Notifications} from '@mantine/notifications';
import {Outlet} from 'react-router-dom';
import './base.css';
import 'mantine-react-table/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/spotlight/styles.css';
import {useMediaQuery} from '@mantine/hooks';
import {create} from 'zustand';
import {AppHeader} from "./appShell/appHeader";

export const useMenuOpened = create<{ menuOpened: boolean, toggle: () => void }>((set) => ({
    menuOpened: true,
    toggle: () => {
        set((state) => ({menuOpened: !state.menuOpened}));
    }
}));

export default function App() {

    const {menuOpened, toggle: toggleMenu} = useMenuOpened();
    const isMobile = useMediaQuery(`(max-width: ${em(600)})`);
    const computedColorScheme = useComputedColorScheme('light', {getInitialValueInEffect: true});

    return (
        <>
            <Notifications position='top-right'/>
            <ModalsProvider>

                <AppShell header={{height: isMobile ? 60 : 80}} h={'100%'} padding='md'
                          navbar={{collapsed: {mobile: true, desktop: true}, width: { sm: 20, base: 20 }, breakpoint: 'sm' }}>
                    <AppShell.Header> <AppHeader/></AppShell.Header>
                    <AppShell.Main style={{
                        backgroundColor: computedColorScheme === 'light' ? '#d6dbe1' : '#39404a',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100px'
                    }}>
                        <Box style={{flex: '1 1 auto', overflowY: 'auto', overflowX: 'hidden', minHeight: 0}}>
                            <Outlet/>
                        </Box>
                    </AppShell.Main>
                </AppShell>
            </ModalsProvider>
        </>
    );
}
