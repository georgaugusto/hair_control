import {
  House,
  IdentificationBadge,
  PresentationChart,
  Scissors,
  ShoppingBag,
  SignOut,
  UsersFour,
} from 'phosphor-react';

export const links = [
  {
    id: 1,
    to: '/home',
    icon: <House />,
    label: 'Página Inicial',
  },
  {
    id: 2,
    to: 'client',
    icon: <UsersFour />,
    label: 'Clientes',
    subLinks: [
      {
        id: 2,
        to: '/client',
        label: 'Lista de Clientes',
      },
      {
        id: 2,
        to: '/client/create',
        label: 'Cadastro de Clientes',
      },
    ],
  },
  {
    id: 3,
    to: '/collaborator',
    icon: <IdentificationBadge />,
    label: 'Colaboradores',
    profile: [1],
  },
  {
    id: 4,
    to: '/service',
    icon: <Scissors />,
    label: 'Serviços',
    profile: [1],
  },
  {
    id: 5,
    to: '/sale',
    icon: <ShoppingBag />,
    label: 'Vendas',
    profile: [1],
  },
  {
    id: 6,
    to: '/reports',
    icon: <PresentationChart />,
    label: 'Relatórios',
  },
  {
    id: 7,
    to: '/',
    icon: <SignOut />,
    label: 'Sair',
    action: 'exit',
  },
];
