import { graphql } from '../gql'

export const getCharacters = graphql(`
	query getCharacters {
		characters(page: 2, filter: { name: "rick" }) {
			info {
				count
			}
			results {
				name
			}
		}
		location(id: 1) {
			id
		}
		episodesByIds(ids: [1, 2]) {
			id
		}
	}
`);

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

