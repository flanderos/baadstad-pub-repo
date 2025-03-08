// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Metadata } from 'next';

declare module 'next' {
  export type PageProps = {
    params: Record<string, string>;
    searchParams?: Record<string, string | string[]>;
  };
}

// For å fikse problemer med genererte typer i .next/types
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_SKIP_TYPE_CHECK?: string;
    }
  }
}