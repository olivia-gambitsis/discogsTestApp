import {Avatar, Card, Flex, Text} from '@mantine/core';
import classes from './artistCard.module.css';
import {Artist} from "../interfaces";
import {useDisclosure} from "@mantine/hooks";
import {ReleasesModal} from "./realeasesModal";

export function ArtistCard({artist}: { artist: Artist }) {

    const [modalOpen, { open: openModal, close: closeModal }] = useDisclosure(false);

    return (
        <>
            <ReleasesModal opened={modalOpen} close={closeModal} artistId={artist.id}/>
            <Card shadow="sm" padding="lg" radius="lg" withBorder onClick={openModal}
                  className={classes.hover}>
                    <Card.Section p={'md'}>
                        <Flex direction={'row'} gap={'md'}>
                            <Avatar src={artist.cover_image} w={100} h={100} radius={'lg'} alt="Artist image"/>
                            <Flex direction={'column'} mt={'sm'} justify={'center'}>
                                <Text fw={500}>
                                    {artist.title}
                                </Text>
                            </Flex>
                        </Flex>
                    </Card.Section>
            </Card>
        </>
    );
}
