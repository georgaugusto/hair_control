import { useContext } from 'react';
import { SignOut, List } from 'phosphor-react';

import IdentificationContext from '../../../contexts/identification';
import LayoutContext from '../../../contexts/Layout';

import { Title } from '../Navbar/PageTitle';

import logoImg from '../../../assets/logo-ignite.svg';

import { Grid, Avatar, Menu, PageTitle, StyledLink, Options } from './styles';

export function Header() {
  const { userIdentification } = useContext(IdentificationContext);
  const { navMobile, setNavMobile } = useContext(LayoutContext);
  const showNavMobile = () => setNavMobile(!navMobile);

  const userName = userIdentification.name;

  const handleSignOut = () => {
    window.localStorage.clear();
  };

  return (
    <Grid>
      <PageTitle>
        <Title />
      </PageTitle>
      <Options>
        <p>
          Olá,{' '}
          {userName
            ? userName[0].toUpperCase() + userName.substr(1)
            : 'Usuário'}
        </p>
        <Avatar>
          <span>{userName ? userName.substr(0, 1).toUpperCase() : 'U'}</span>
        </Avatar>
        <StyledLink to="/" onClick={() => handleSignOut()}>
          <SignOut />
        </StyledLink>

        <Menu
          className="nav-toggle"
          onClick={showNavMobile}
          onKeyDown={showNavMobile}
          role="button"
          tabIndex={0}
        >
          <List />
        </Menu>
      </Options>
      <img src={logoImg} alt="" />
    </Grid>
  );
}
