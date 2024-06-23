import {Box, Group, Image, Tooltip} from '@mantine/core';
import {useNavigate} from 'react-router-dom';
import discogsLogo from '../assets/discogsLogo.png'

import classes from './appHeader.module.css';

export function AppHeader() {

    const navigate = useNavigate();

    return (
        <Box h={'100%'}>
            <div className={classes.inner}>
                <Group>
                    <Tooltip label={'Back to search'}>
                        <Image style={{cursor: 'pointer'}} alt={'home button'} width={'auto'} height={50}
                               onClick={() => navigate('/')} src={discogsLogo}/>
                    </Tooltip>
                </Group>
            </div>
        </Box>
    );
}
