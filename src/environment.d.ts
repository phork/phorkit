import { Theme } from 'types';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DOCZ_URL?: string;
      STORYBOOK_URL?: string;
      STORYBOOK_THEME_ID?: Theme
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
