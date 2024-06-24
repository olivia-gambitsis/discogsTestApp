import {Button, Flex, Grid, Pagination, Skeleton, TextInput} from '@mantine/core';
import {useQuery} from "@tanstack/react-query";
import {searchArtists} from "../services/discogService";
import {useState} from "react";
import {useForm} from "@mantine/form";
import {ArtistCard} from "../components/artistCard";

export function DashboardPage() {

	const form = useForm({
		initialValues:{
			artist: ''
		}
	});
	const [searchValue, setSearchValue] = useState('');
	const [activePage, setPage] = useState(1)

	const { isLoading: isLoadingArtists, data: allArtists } = useQuery(
		{
			queryKey: ['getArtists', activePage, searchValue],
			queryFn: async () => {
				return await searchArtists(searchValue, activePage);
			},
			enabled: Boolean(searchValue),
		}
	);

	console.log(activePage)



	return (
		<>
		<form onSubmit={form.onSubmit((value) => setSearchValue(value.artist))}>
			<Flex align={'center'} justify={'center'} gap={'md'} mb={'xl'}>
				<TextInput placeholder="Type an artist name" size="lg" type="text" {...form.getInputProps('artist')} />
				<Button type={'submit'}>Search</Button>
			</Flex>
		</form>
			{
				isLoadingArtists ?

						<Grid gutter={'xl'}>
							<Grid.Col span={{ base: 12, sm: 6, md: 4, xxl: 3 }}>
								<Skeleton height={200} width={450} radius="lg" />
							</Grid.Col>
							<Grid.Col span={{ base: 12, sm: 6, md: 4, xxl: 3 }}>
								<Skeleton height={200} width={450} radius="lg" />
							</Grid.Col>
							<Grid.Col span={{ base: 12, sm: 6, md: 4, xxl: 3 }}>
								<Skeleton height={200} width={450} radius="lg" />
							</Grid.Col>
							<Grid.Col span={{ base: 12, sm: 6, md: 4, xxl: 3 }}>
								<Skeleton height={200} width={450} radius="lg" />
							</Grid.Col>
						</Grid>
					:
					<>
						<Grid>
							{
								allArtists?.results.map((artist) => <Grid.Col
									span={{base: 12, sm: 6, md: 4, xxl: 3}}><ArtistCard artist={artist}/></Grid.Col>)
							}

						</Grid>
						{allArtists &&
							<Pagination total={allArtists?.pagination.pages} value={activePage} onChange={setPage}
										mt="sm" color={'violet'}/>
						}
					</>
			}


		</>
	);
}
