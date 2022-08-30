import { StyleLink } from './styles';

import logoImg from '../../../../assets/scissors-blue.svg';

interface ILogoProps {
  compact: boolean;
}

export function Logo({ compact }: ILogoProps) {
  return (
    <StyleLink
      to={{
        pathname: '/home',
      }}
      compact={compact ? 1 : 0}
    >
      <img src={logoImg} alt="" />
    </StyleLink>
  );
}
