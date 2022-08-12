import { Routes, Route } from 'react-router-dom';

import { SingIn } from '../pages/SingIn';

import { DefaultLayout } from '../layouts/DefaultLayout';

import { Home } from '../pages/Home';
import { Client } from '../pages/Client';
import { CreateClient } from '../pages/Client/CreateClient';
import { EditClient } from '../pages/Client/EditClient';
import { Collaborator } from '../pages/Collaborator';
import { Sale } from '../pages/Sale';
import { Service } from '../pages/Service';
import { Report } from '../pages/Report';

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
        <Route path="/sale" element={<Sale />}></Route>
        <Route path="/service" element={<Service />}></Route>
        <Route path="/reports" element={<Report />}></Route>
      </Route>
    </Routes>
  );
}
