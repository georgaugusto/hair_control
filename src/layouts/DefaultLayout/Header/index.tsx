import { useContext } from 'react';
import { SignOut, List } from 'phosphor-react';

import { Title } from '../Navbar/PageTitle';
import LayoutContext from '../../../contexts/Layout';

import logoImg from '../../../assets/logo-ignite.svg';

import { Grid, Menu, PageTitle, StyledLink, Options } from './styles';

export function Header() {
  const { navMobile, setNavMobile } = useContext(LayoutContext);
  const showNavMobile = () => setNavMobile(!navMobile);

  const handleSignOut = () => {
    window.localStorage.clear();
  };

  return (
    <Grid>
      <PageTitle>
        <Title />
      </PageTitle>
      <Options>
        <p>Olá, Usuário</p>
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
