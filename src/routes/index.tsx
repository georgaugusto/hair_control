import { Routes, Route } from 'react-router-dom';

import PrivateRoutes from './private';

import { SingIn } from '../pages/SingIn';

import { DefaultLayout } from '../layouts/DefaultLayout';

import { Home } from '../pages/Home';

import { Client } from '../pages/Client';
import { CreateClient } from '../pages/Client/CreateClient';
import { ViewClient } from '../pages/Client/ViewClient';

import { Collaborator } from '../pages/Collaborator';
import { ViewCollaborator } from '../pages/Collaborator/ViewCollaborator';
import { CreateCollaborator } from '../pages/Collaborator/CreateCollaborator';

import { Sale } from '../pages/Sale';
import { Service } from '../pages/Service';
import { Report } from '../pages/Report';
import { NotFound } from '../pages/NotFound';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<SingIn />}></Route>

      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/client" element={<Client />}></Route>
          <Route path="/client/create" element={<CreateClient />}></Route>
          <Route path="/client/:clientId" element={<ViewClient />}></Route>
          <Route path="/collaborator" element={<Collaborator />}></Route>
          <Route
            path="/collaborator/create"
            element={<CreateCollaborator />}
          ></Route>
          <Route
            path="/collaborator/:collaboratorId"
            element={<ViewCollaborator />}
          ></Route>
          <Route path="/sale" element={<Sale />}></Route>
          <Route path="/service" element={<Service />}></Route>
          <Route path="/reports" element={<Report />}></Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}
