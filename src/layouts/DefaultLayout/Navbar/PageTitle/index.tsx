import { useContext } from 'react';
import HeaderTitleContext from '../../../../contexts/HeaderTitle';

import { PageTitle } from './styles';

export function Title() {
  const { headerTitle } = useContext(HeaderTitleContext);

  return (
    <PageTitle>
      <h3>{headerTitle || 'Hair Control'}</h3>
    </PageTitle>
  );
}
