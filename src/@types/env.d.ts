/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_NAME: string;
  VITE_TITLE: string;
  VITE_LANGUAGES: string;
  VITE_API: string;
  VITE_GEOSERVER: string;
  VITE_APP_VERSION: string;
  VITE_APP_RELEASE_DATE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
