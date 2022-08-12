import { StyleLink } from './styles';

// import logoImg from '../../../../assets/logo.svg';
// import letterImg from '../../../../assets/sabin.svg';
import logoImg from '../../../../assets/scissors-blue.svg';

interface ILogoProps {
  compact: boolean;
}

export function Logo({ compact }: ILogoProps) {
  return (
    <StyleLink
      to={{
        pathname: '/dashboard',
      }}
      compact={compact ? 1 : 0}
    >
      <img src={logoImg} alt="" />
      {/* <span>
        <img src={letterImg} alt="" />
      </span> */}
    </StyleLink>
  );
}
