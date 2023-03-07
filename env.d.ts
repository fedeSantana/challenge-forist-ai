/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_MOVIE_GRAPHQL: string
    readonly VITE_IMAGE_URL: string
    readonly VITE_TMBD_APIKEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
