import { Routes, Route } from 'react-router-dom';

import { SingIn } from '../pages/SingIn';

import { DefaultLayout } from '../layouts/DefaultLayout';

import { Home } from '../pages/Home';
import { Client } from '../pages/Client';
import { CreateClient } from '../pages/Client/CreateClient';
import { EditClient } from '../pages/Client/EditClient';
import { Collaborator } from '../pages/Collaborator';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<SingIn />}></Route>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/client" element={<Client />}></Route>
        <Route path="/client/create" element={<CreateClient />}></Route>
        <Route path="/client/:clientId" element={<EditClient />}></Route>
        <Route path="/collaborator" element={<Collaborator />}></Route>
      </Route>
      {/* <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/history" element={<History />}></Route>
      </Route> */}
    </Routes>
  );
}
