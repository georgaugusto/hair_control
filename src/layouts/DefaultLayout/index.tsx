import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import LayoutContext from '../../contexts/Layout';

import { Header } from './Header';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Title } from './Navbar/PageTitle';

import {
  Grid,
  GridNav,
  GridHeader,
  GridTitle,
  GridMain,
  GridFooter,
} from './styles';

export function DefaultLayout() {
  const { compact } = useContext(LayoutContext);

  return (
    <Grid>
      <>
        <GridNav>
          <Navbar />
        </GridNav>
        <GridHeader compact={compact ? 1 : 0}>
          <Header />
        </GridHeader>
        <GridTitle>
          <Title />
        </GridTitle>
        <GridMain compact={compact ? 1 : 0}>
          <Outlet />
        </GridMain>
        <GridFooter compact={compact ? 1 : 0}>
          <Footer />
        </GridFooter>
      </>
    </Grid>
  );
}
