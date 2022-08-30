import { Routes, Route } from 'react-router-dom';

import PrivateRoutes from './private';
import { DefaultLayout } from '../layouts/DefaultLayout';

import { SingIn } from '../pages/SingIn';
import { Home } from '../pages/Home';
import { Report } from '../pages/Report';
import { NotFound } from '../pages/NotFound';

import { Client } from '../pages/Client';
import { CreateClient } from '../pages/Client/CreateClient';
import { ViewClient } from '../pages/Client/ViewClient';

import { Collaborator } from '../pages/Collaborator';
import { ViewCollaborator } from '../pages/Collaborator/ViewCollaborator';
import { CreateCollaborator } from '../pages/Collaborator/CreateCollaborator';

import { Service } from '../pages/Service';
import { CreateService } from '../pages/Service/CreateService';
import { ViewService } from '../pages/Service/ViewService';

import { Sale } from '../pages/Sale';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<SingIn />} />

      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/home" element={<Home />} />

          <Route path="/client" element={<Client />} />
          <Route path="/client/create" element={<CreateClient />} />
          <Route path="/client/:clientId" element={<ViewClient />} />

          <Route path="/collaborator" element={<Collaborator />} />
          <Route path="/collaborator/create" element={<CreateCollaborator />} />
          <Route
            path="/collaborator/:collaboratorId"
            element={<ViewCollaborator />}
          />

          <Route path="/sale" element={<Sale />} />

          <Route path="/service" element={<Service />} />
          <Route path="/service/create" element={<CreateService />} />
          <Route path="/service/:serviceId" element={<ViewService />} />

          <Route path="/reports" element={<Report />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}
