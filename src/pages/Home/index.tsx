import { useCallback, useContext, useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';

import axios from 'axios';
import { ClipboardText, UserRectangle, Wallet } from 'phosphor-react';

import IdentificationContext from '../../contexts/identification';
import { useModal } from '../../hooks/useModal';

import {
  HomeContainer,
  BoxContainer,
  HeaderContainer,
  Teste,
  GraphicContainer,
} from './styles';
import LayoutContext from '../../contexts/Layout';
import { PieChartComponent } from './PieChartComponent';

interface ICollaborator {
  cpf: string;
  email: string;
  id: string;
  inserted_at: string;
  name: string;
  role: string;
  total_commission: number;
  total_received: number;
}

interface ISales {
  id: string;
  inserted_at: string;
  name_client: string;
  name_employee: string;
  payment_method: string;
  price_service: number;
  title_service: string;
}

interface IServices {
  id: string;
  title: string;
  price: number;
}

interface IClient {
  id: string;
  name: string;
  phone: string;
  cpf: string;
  rg: string;
  address: string;
  district: string;
  inserted_at: string;
}

interface IApiMethods {
  getCollaborator: boolean;
  getAllSales: boolean;
  getAllServices: boolean;
  getAllClients: boolean;
}

interface ISalesChart {
  name: string;
  value: number;
}

const collaboratorProps = {
  cpf: '',
  email: '',
  id: '',
  inserted_at: '',
  name: '',
  role: '',
  total_commission: 0,
  total_received: 0,
};

const salesProps = {
  id: '',
  inserted_at: '',
  name_client: '',
  name_employee: '',
  payment_method: '',
  price_service: 0,
  title_service: '',
};

const servicesProps = {
  id: '',
  title: '',
  price: 0,
};

const clientProps = {
  id: '',
  name: '',
  phone: '',
  cpf: '',
  rg: '',
  address: '',
  district: '',
  inserted_at: '',
};

const apiMethodsProps = {
  getCollaborator: false,
  getAllSales: false,
  getAllServices: false,
  getAllClients: false,
};

export function Home() {
  const { userIdentification, setUserIdentification } = useContext(
    IdentificationContext,
  );
  const { isShown, toggle } = useModal();
  const { compact } = useContext(LayoutContext);

  const [collaborator, setCollaborator] =
    useState<ICollaborator>(collaboratorProps);
  const [sales, setSales] = useState<ISales[]>([salesProps]);
  const [salesChart, setSalesChart] = useState<ISalesChart[]>([
    {
      name: '',
      value: 0,
    },
  ]);
  const [services, setServices] = useState<IServices[]>([servicesProps]);
  const [client, setClient] = useState<IClient[]>([clientProps]);
  const [apiError, setApiError] = useState<IApiMethods>(apiMethodsProps);
  const [loading, setLoading] = useState<IApiMethods>(apiMethodsProps);

  const dayOfTheMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    0,
  ).getDate();

  const getCollaborator = useCallback(async () => {
    setLoading((prevState) => ({ ...prevState, getCollaborator: true }));
    try {
      const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);

      const response = await axios.get(
        `https://hair-control.gigalixirapp.com/api/employees/${userIdentification.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const name: string = response.data.name;

      setCollaborator(response.data);

      setUserIdentification({ ...userIdentification, name });
    } catch {
      setApiError((prevState) => ({ ...prevState, getCollaborator: true }));
    } finally {
      setLoading((prevState) => ({ ...prevState, getCollaborator: false }));
    }
  }, []);

  const getAllSales = useCallback(async () => {
    setLoading((prevState) => ({ ...prevState, getAllSales: true }));
    try {
      const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);

      const isCommon =
        collaborator.role !== 'commom'
          ? `https://hair-control.gigalixirapp.com/api/sales?employee_name=${collaborator.name}`
          : `https://hair-control.gigalixirapp.com/api/sales`;

      const response = await axios.get(isCommon, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSales(response.data);
      const serviceArray = response.data.map((s: any) => s.title_service);
      const objectWithNumberOfTimesServicesAppear = serviceArray.reduce(
        (acc, curr) => ((acc[curr] = -~acc[curr]), acc),
        {},
      );
      const resultttt = Object.keys(objectWithNumberOfTimesServicesAppear).map(
        (key) => [key, objectWithNumberOfTimesServicesAppear[key]],
      );

      const data: { name: string; value: number }[] = [];
      const teste = resultttt.flatMap((s) => [
        ...data,
        { name: s[0], value: s[1] },
      ]);

      setSalesChart(teste);
    } catch {
      setApiError((prevState) => ({ ...prevState, getAllSales: true }));
    } finally {
      setLoading((prevState) => ({ ...prevState, getAllSales: false }));
    }
  }, []);

  const getAllServices = useCallback(async () => {
    setLoading((prevState) => ({ ...prevState, getAllServices: true }));
    try {
      const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);

      const response = await axios.get(
        'https://hair-control.gigalixirapp.com/api/services',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setServices(response.data);
    } catch {
      setApiError((prevState) => ({ ...prevState, getAllServices: true }));
    } finally {
      setLoading((prevState) => ({ ...prevState, getAllServices: false }));
    }
  }, []);

  // const getAllClients = useCallback(async () => {
  //   setLoading((prevState) => ({ ...prevState, getAllClients: true }));
  //   try {
  //     const { token } = JSON.parse(localStorage.getItem('@hair:user-1.0.0')!);

  //     const response = await axios.get(
  //       'https://hair-control.gigalixirapp.com/api/clients',
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     setClient(response.data);
  //   } catch {
  //     setApiError((prevState) => ({ ...prevState, getAllClients: true }));
  //   } finally {
  //     setLoading((prevState) => ({ ...prevState, getAllClients: false }));
  //   }
  // }, []);

  useEffect(() => {
    getCollaborator();
    getAllSales();
    getAllServices();
    // getAllClients();
  }, []);

  function getSalesNumber() {
    const salesNumber = sales?.filter(
      (s) => s.name_employee === collaborator?.name,
    ).length;

    return collaborator.role === 'commom' ? salesNumber || 0 : sales.length;
  }

  function getBestCollaborator() {
    const collaboratorArray = sales.map((s) => s.name_employee);

    const objectWithNumberOfTimesCollaboratorsAppear = collaboratorArray.reduce(
      (acc, curr) => ((acc[curr] = -~acc[curr]), acc),
      {},
    );

    const mostRepeatedContributorNumber = Math.max.apply(
      null,
      Object.values(objectWithNumberOfTimesCollaboratorsAppear),
    );
    const mostRepeatedContributorName = Object.keys(
      objectWithNumberOfTimesCollaboratorsAppear,
    ).find(
      (key) =>
        objectWithNumberOfTimesCollaboratorsAppear[key] ===
        mostRepeatedContributorNumber,
    );

    return mostRepeatedContributorName || 0;
  }

  function getBestClient() {
    const clientArray = sales.map((s) => s.name_client);
    const objectWithNumberOfTimesClientsAppear = clientArray.reduce(
      (acc, curr) => ((acc[curr] = -~acc[curr]), acc),
      {},
    );

    const mostRepeatedClientNumber = Math.max.apply(
      null,
      Object.values(objectWithNumberOfTimesClientsAppear),
    );
    const mostRepeatedClientName = Object.keys(
      objectWithNumberOfTimesClientsAppear,
    ).find(
      (key) =>
        objectWithNumberOfTimesClientsAppear[key] === mostRepeatedClientNumber,
    );

    return mostRepeatedClientName || '-';
  }

  function getBestService() {
    const serviceArray = sales.map((s) => s.title_service);
    const objectWithNumberOfTimesServicesAppear = serviceArray.reduce(
      (acc, curr) => ((acc[curr] = -~acc[curr]), acc),
      {},
    );

    const mostRepeatedServiceNumber = Math.max.apply(
      null,
      Object.values(objectWithNumberOfTimesServicesAppear),
    );
    const mostRepeatedServiceName = Object.keys(
      objectWithNumberOfTimesServicesAppear,
    ).find(
      (key) =>
        objectWithNumberOfTimesServicesAppear[key] ===
        mostRepeatedServiceNumber,
    );

    return mostRepeatedServiceName || '-';
  }

  function getSalesValues() {
    const salesPrices = sales.map((s) => s.price_service);

    const totalSalesPrices = salesPrices.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);

    return collaborator.role === 'commom'
      ? collaborator.total_received
      : totalSalesPrices;
  }

  const data = [
    {
      'Design de sobrancelhas1': 1,
      Escova: 2,
      teste: 0,
      date: 6,
    },
    {
      'Design de sobrancelhas1': 0,
      Escova: 3,
      teste: 0,
      date: 7,
    },
  ];

  return (
    <HomeContainer>
      <HeaderContainer>
        <div>
          <BoxContainer>
            <div>
              <span>Total</span>
              <span>
                {(getSalesValues() / 100).toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </div>
            <div>
              <Wallet size={32} />
            </div>
          </BoxContainer>
        </div>
        <div>
          <BoxContainer>
            <div>
              <span>Serviços Realizados</span>
              <span>{getSalesNumber()}</span>
            </div>
            <div>
              <ClipboardText size={32} />
            </div>
          </BoxContainer>
          <BoxContainer>
            <div>
              <span>Melhor Cliente</span>
              <span>{getBestClient()}</span>
            </div>
            <div>
              <UserRectangle size={32} />
            </div>
          </BoxContainer>
        </div>
        <div>
          <BoxContainer>
            <div>
              <span>Melhor Serviço</span>
              <span>{getBestService()}</span>
            </div>
            <div>
              <ClipboardText size={32} />
            </div>
          </BoxContainer>
          {collaborator.role !== 'commom' ? (
            <BoxContainer>
              <div>
                <span>Melhor Colaborador</span>
                <span>{getBestCollaborator()}</span>
              </div>
              <div>
                <UserRectangle size={32} />
              </div>
            </BoxContainer>
          ) : (
            <> </>
          )}
        </div>
      </HeaderContainer>

      <Teste>
        <span>Visão geral de vendas</span>

        <GraphicContainer compact={compact ? 1 : 0}>
          <ResponsiveContainer width="100%" height="100%">
            {/* <BarChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                type="number"
                tickCount={dayOfTheMonth + 2}
                domain={[0, dayOfTheMonth]}
              />
              <YAxis
                allowDecimals={false}
                label={{
                  value: 'N° de vendas',
                  angle: -90,
                  position: 'insideLeft',
                }}
              ></YAxis>
              <Tooltip
                labelFormatter={(label) =>
                  `${String(label).length === 1 ? `0${label}` : label}/${
                    String(new Date().getMonth()).length === 1
                      ? `0${new Date().getMonth()}`
                      : new Date().getMonth()
                  }/${new Date().getFullYear()}`
                }
              />
              <Legend />
              <Bar
                dataKey="Design de sobrancelhas1"
                stackId="a"
                fill="#8884d8"
              />
              <Bar dataKey="Escova" stackId="a" fill="#82ca9d" />
            </BarChart> */}
            {/* <> </> */}
            <PieChartComponent data={salesChart} />
          </ResponsiveContainer>
        </GraphicContainer>
      </Teste>
    </HomeContainer>
  );
}
