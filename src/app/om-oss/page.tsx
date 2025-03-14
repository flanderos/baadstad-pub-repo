import { Metadata } from 'next';
import OmOssClient from './OmOssClient';

export const metadata: Metadata = {
  title: 'Om oss | Bådstad AS',
  description: 'Profesjonell oppussing av bad i innlandet med fokus på kvalitet og håndverk. Bådstad AS er din ekspert på baderomsrenovering – skreddersydde løsninger, solid håndverk og trygg oppfølging. Kontakt oss for et nytt bad du vil elske'
};

export default function OmOssPage() {
  return <OmOssClient />;
}