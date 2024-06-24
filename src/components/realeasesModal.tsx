import {Badge, Flex, Loader, Modal, Pagination, Text} from '@mantine/core';
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {releasesFromArtist} from "../services/discogService";
import classes from './artistCard.module.css'
import {useNavigate} from "react-router-dom";

export function ReleasesModal({opened, close, artistId}: { opened: boolean, close: () => void, artistId: string }) {
    const [activePage, setPage] = useState(1);
    const navigate = useNavigate();

    const {isLoading, data: releases} = useQuery(
        {
            queryKey: ["artists-id", artistId, activePage],
            queryFn: async () => {
                return await releasesFromArtist(artistId, activePage);
            },
            enabled: Boolean(opened),
        }
    );

    return (
        <>
            <Modal centered opened={opened} onClose={close} title="Releases" radius="md" size={'lg'}>
                {isLoading ?
                    <Loader/> :
                    <>
                        {releases ?
                            <>
                                <Flex direction={'row'} gap={'lg'} w={'100%'} wrap={'wrap'}>
                                    {releases?.releases.map((release) => <Badge key={release.id}
                                        onClick={() => navigate(`/release/${release.main_release}`)}
                                        className={classes.hover}
                                        color={'violet'} size={'lg'}>{release.title}</Badge>)}
                                </Flex>
                                <Pagination mt={'lg'} total={releases?.pagination.pages} value={activePage}
                                            onChange={setPage}
                                            color={'violet'}/>
                            </> :
                            <><Text>Unfortunately this Artist does not have any releases to show, try searching for
                                another artist :)</Text></>

                        }
                    </>}
            </Modal>
        </>
    );
}
