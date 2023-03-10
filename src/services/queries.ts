import request from 'graphql-request'
import { useQuery,UseQueryOptions } from 'react-query'
import { graphql } from '../gql/gql'
import { CharactersQuery } from '../gql/graphql'

export const getCharacters = graphql(`
    query characters($ids: [ID!]!) {
        charactersByIds(ids: $ids) {
            id
            name
            image
            species
            status
        }
    }
`)

type QueryOptions = Omit<UseQueryOptions<CharactersQuery, unknown, CharactersQuery, string[]>, "queryKey" | "queryFn">

export function useGetCharacters(queryOptions?: QueryOptions) {
    return useQuery(
        ['getCharacters'],
        async () => {
            return request(
                'https://rickandmortyapi.com/graphql',
                getCharacters,
                {
                    ids: ['1', '2', '3', '4', '5', '6'],
                }
            )
        },
        {
            ...queryOptions,
        }
    )
}

/*
export const movieDetail = graphql(`
    query movieDetail($id: Int!) {
        movieDetail(id: $id) {
            movie {
                id
                vote_average
                original_title
                release_date
                overview
                poster_path
                runtime
            }
        }
    }
`)
*/
