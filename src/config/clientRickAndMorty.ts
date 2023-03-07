import { createClient } from 'urql'

const urqlClient = createClient({
    /** Aunque me gustaría usar el link en un .env, se lleva bastante mal codegen con la idea
     * Y era demasiado esfuerzo para un sólo link.
     */
	url: "https://rickandmortyapi.com/graphql",
});

export default urqlClient
