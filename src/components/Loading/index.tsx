import { ClipLoader } from 'react-spinners';

import { ClipLoaderContainer, ClipLoaderSubtitle } from './styles';

interface LoadingProps {
  loading: boolean;
}

export function Loading({ loading }: LoadingProps) {
  return (
    <ClipLoaderContainer>
      <ClipLoader color={'#3B82F6'} loading={loading} size={75} />
      <ClipLoaderSubtitle>Carregando...</ClipLoaderSubtitle>
    </ClipLoaderContainer>
  );
}
