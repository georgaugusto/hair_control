import { useContext } from 'react';

import { Logo } from './Logo';
import { NavToggle } from './NavToggle';
import LayoutContext from '../../../contexts/Layout';
import { NavLinksGroup } from './NavLinksGroup';

import { Container, StyledNav, Backdrop } from './styles';

export function Navbar() {
  const { navMobile, setNavMobile } = useContext(LayoutContext);
  const { compact, setCompact } = useContext(LayoutContext);
  const { subMenus, setSubMenus } = useContext(LayoutContext);

  const showSubMenus = () => setSubMenus(!subMenus);
  const showNavMobile = () => setNavMobile(!navMobile);

  return (
    <Container>
      <Backdrop visible={navMobile ? 1 : 0} onClick={showNavMobile} />
      <StyledNav compact={compact ? 1 : 0} visible={navMobile ? 1 : 0}>
        <Logo compact={compact} />
        <NavLinksGroup
          compact={compact}
          subMenus={subMenus}
          navMobile={navMobile}
          showSubMenus={showSubMenus}
          showNavMobile={showNavMobile}
        />
      </StyledNav>
      <NavToggle
        compact={compact}
        setCompact={setCompact}
        setSubMenus={setSubMenus}
      />
    </Container>
  );
}
