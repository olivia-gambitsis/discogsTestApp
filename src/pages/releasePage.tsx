import {Badge, Center, Flex, Group, Image, List, Loader, Paper, Stack, Text, Title} from '@mantine/core';
import {useQuery} from "@tanstack/react-query";
import {getReleaseByID} from "../services/discogService";
import {useParams} from "react-router-dom";
import vinyl from '../assets/vinyl.png'

export function ReleasePage() {
    const {id} = useParams();

    const {isLoading, data: release} = useQuery(
        {
            queryKey: ['getReleaseByID', id],
            queryFn: async () => {
                return await getReleaseByID(id);
            },
            enabled: Boolean(id),
        }
    );


    const mainImageUrl = release?.images.find(image => image.type === 'primary')?.resource_url

    return (
        <Paper p={'xl'} style={{position:'relative'}}>

            {isLoading ?
                <Center>
                    <Loader color="violet"/>
                </Center> :

                <>
                    <Flex direction={'column'} mb={'lg'}>
                        <Group>
                            <Image height={100} width={100} src={mainImageUrl} alt={'album art'} fallbackSrc={vinyl}/>
                            <Stack>
                                <Title c={'violet'}>{release?.title}</Title>
                                {release?.genres.map(genre => <Badge color={'green'}>{genre}</Badge>)}
                            </Stack>
                        </Group>
                        <Stack>
                            <Title mt={'lg'} order={3}>Artists</Title>
                            <List ml={'md'}>
                                {
                                    release?.artists?.map((artist) => <List.Item>{artist.name}</List.Item>)
                                }
                            </List>
                            <Title mt={'lg'} order={3}>Labels</Title>
                            <List ml={'md'}>
                                {
                                    release?.labels?.map((label) => <List.Item>{label.name}</List.Item>)
                                }
                            </List>
                            <Title mt={'lg'} order={3}>Released</Title>
                            <Text ml={'md'}>{release?.released} - {release?.country}</Text>
                        </Stack>
                    </Flex>
                    <Flex direction={'row'} align={'center'} style={{position: "absolute", bottom: 10, right: 20}}>
                        <Text>Owned by</Text><Badge mx={'sm'}>{release?.community?.have}</Badge><Text>Discogs users</Text>
                    </Flex>
                </>}
        </Paper>
    );
}
