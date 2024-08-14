'use client';

import {
  GetAllBuildingsToMonitoringQuery,
  useGetAllBuildingsToMonitoringQuery,
} from '@/generated/graphql';

import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import L from 'leaflet';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { env } from '@/env';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { Menu, X } from 'lucide-react';
import Logo from '@/assets/logo.svg';

import Image from 'next/image';
import { Table, Tbody, Td, Th, Thead, Tr } from './table-elements';

const markerGreen = `${env.NEXT_PUBLIC_VERCEL_URL}/marker/green.svg`;
const markerBlue = `${env.NEXT_PUBLIC_VERCEL_URL}/marker/blue.svg`;
// const markerOrange = env.NEXT_PUBLIC_VERCEL_URL+'marker/orange.svg';
const markerRed = `${env.NEXT_PUBLIC_VERCEL_URL}/marker/red.svg`;

function parseData(data: GetAllBuildingsToMonitoringQuery['buildings']) {
  if (!data) return [];

  return data.map(building => {
    const activatedController = building.controllers
      .filter(controller => controller.statusDetection === 1)
      .flat(1)
      .filter(controller => typeof controller !== 'undefined');

    const offlineController = building.controllers
      .filter(
        controller => !controller.status && !activatedController.find(c => c.id === controller.id),
      )
      .flat(1)
      .filter(controller => typeof controller !== 'undefined');

    const normalController = building.controllers
      .filter(controller => controller.status && controller.statusDetection !== 1)
      .flat(1)
      .filter(controller => typeof controller !== 'undefined');

    const numberOfControllers =
      activatedController.length + offlineController.length + normalController.length;

    return {
      id: building.id,
      lat: building.address.lat,
      lng: building.address.lng,
      name: building.name,
      address: building.address,
      status:
        activatedController.length > 0
          ? 'Activated'
          : offlineController.length > 0
            ? 'Offline'
            : numberOfControllers > 0
              ? 'Normal'
              : 'No-Controllers',
      numberOfControllers,
      normalController,
      activatedController,
      offlineController,
      clients_count: building.controllers
        .map(controller => controller.client?.id)
        .filter((value, index, self) => self.indexOf(value) === index).length,
    };
  });
}

const MapIcon = ({ status }: { status: 'Activated' | 'Offline' | 'Normal' | 'No-Controllers' }) => {
  let iconUrl = markerGreen;

  if (status === 'Normal') {
    iconUrl = markerGreen;
  } else if (status === 'Offline') {
    iconUrl = markerBlue;
  }
  if (status === 'Activated') {
    iconUrl = markerRed;
  }
  return L.icon({
    iconUrl,
    iconSize: [48, 73],
  });
};

export default function MonitoringMap() {
  const { data } = useGetAllBuildingsToMonitoringQuery();

  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: -27.0904648,
    lng: -52.6307032,
  });

  const [openedBuilding, setOpenedBuilding] = useState<string | null>();
  const [isClosed, setIsClosed] = useState(false);

  const buildingsMap = parseData(data?.buildings || []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(p => {
        setPosition({
          lat: p.coords.latitude,
          lng: p.coords.longitude,
        });
      });
    }
  }, []);

  const totalControllers = buildingsMap
    .map(building => building.numberOfControllers)
    .reduce((total, next) => total + next, 0);

  // parse buildings by status priority, activated, offline, normal
  const parsedBuildings = useMemo(() => {
    const activatedBuildings = buildingsMap.filter(building => building.status === 'Activated');
    const offlineBuildings = buildingsMap.filter(building => building.status === 'Offline');
    const normalBuildings = buildingsMap.filter(building => building.status === 'Normal');

    return [...activatedBuildings, ...offlineBuildings, ...normalBuildings];
  }, [buildingsMap]);

  const handleSelectBuilding = useCallback((building: any) => {
    setOpenedBuilding(building.id);
    setIsClosed(false);
  }, []);

  const selectedBuilding = useMemo(
    () => buildingsMap.find(buildingMap => buildingMap.id === openedBuilding),
    [openedBuilding, buildingsMap],
  );

  const handleClose = useCallback(() => {
    if (openedBuilding === null && !isClosed) {
      setIsClosed(true);
    } else {
      setOpenedBuilding(null);
    }
    if (isClosed) {
      setIsClosed(false);
    }
  }, [openedBuilding, isClosed]);

  return (
    <>
      <MapContainer
        center={position}
        zoom={13}
        // scrollWheelZoom={false}
        className="h-[calc(100vh-8rem)] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap
        />
        {buildingsMap.map(
          building =>
            building.status !== 'No-Controllers' && (
              <Marker
                key={building.id}
                position={{
                  lat: parseFloat(building.lat || '0'),
                  lng: parseFloat(building.lng || '0'),
                }}
                icon={MapIcon({
                  status: building.status as 'Activated' | 'Offline' | 'Normal' | 'No-Controllers',
                })}
                eventHandlers={{
                  click: () => {
                    handleSelectBuilding(building);
                  },
                }}
              >
                {/* <Popup>
                  <h2>{building.name}</h2>
                  <br />

                  <br />

                  <ul>
                    {building.actvatedController.length > 0 && (
                      <li>
                        Vazamento de gas detectado:
                        {` ${building.actvatedController.length}`}
                        <ul>
                          {building.actvatedController.map(controller => (
                            <li key={controller.id}>{controller.name}</li>
                          ))}
                        </ul>
                      </li>
                    )}

                    {building.normalController.length > 0 && (
                      <li>
                        Status Normal:
                        {` ${building.normalController.length}`}
                        <ul>
                          {building.normalController.map(controller => (
                            <li key={controller.id}>{controller.name}</li>
                          ))}
                        </ul>
                      </li>
                    )}
                    {building.offlineController.length > 0 && (
                      <li>
                        Offline:
                        {` ${building.offlineController.length}`}
                        <ul>
                          {building.offlineController.map(controller => (
                            <li key={controller.id}>{controller.name}</li>
                          ))}
                        </ul>
                      </li>
                    )}
                  </ul>
                </Popup> */}
              </Marker>
            ),
        )}
        <div className="absolute right-4 top-4 z-[calc(10*10*100)] w-fit overflow-y-auto rounded-xl bg-background py-8 shadow-2xl">
          <header className="mb-4 flex flex-col items-center justify-center gap-2 px-12 ">
            <button
              className="absolute right-4 top-4 cursor-pointer bg-transparent"
              onClick={handleClose}
              type="button"
            >
              {isClosed ? <Menu /> : <X />}
            </button>

            {isClosed && <Image src={Logo} alt="Logo" className="h-16 w-16" />}

            {!isClosed && (
              <>
                {selectedBuilding ? (
                  <h1 className="text-2xl font-bold">{selectedBuilding.name}</h1>
                ) : (
                  <h1 className="text-2xl font-bold">Monitoramento</h1>
                )}
                <span className="text-lg">
                  Total Controladoras:
                  {selectedBuilding ? (
                    <strong>{` ${selectedBuilding.numberOfControllers}`}</strong>
                  ) : (
                    <strong>{` ${totalControllers}`}</strong>
                  )}
                </span>
              </>
            )}
          </header>
          {!isClosed && (
            <>
              <main>
                {selectedBuilding ? (
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Nome</Th>
                        <Th>VSG</Th>
                        <Th>VB</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {selectedBuilding.activatedController.map(controller => (
                        <Tr key={controller.id} data-status="Activated">
                          <Td>{controller.name}</Td>
                          <Td>{controller.sensorValue}</Td>
                          <Td>{controller.batteryLevel}</Td>
                        </Tr>
                      ))}
                      {selectedBuilding.offlineController.map(controller => (
                        <Tr key={controller.id} data-status="Offline">
                          <Td>{controller.name}</Td>
                          <Td>{controller.sensorValue}</Td>
                          <Td>{controller.batteryLevel}</Td>
                        </Tr>
                      ))}
                      {selectedBuilding.normalController.map(controller => (
                        <Tr key={controller.id} data-status="Normal">
                          <Td>{controller.name}</Td>
                          <Td>{controller.sensorValue}</Td>
                          <Td>{controller.batteryLevel}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                ) : (
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Nome</Th>
                        <Th>N</Th>
                        <Th>V</Th>
                        <Th>O</Th>
                        <Th>TC</Th>
                        <Th>TCO</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {parsedBuildings.map(
                        building =>
                          building.status !== 'No-Controllers' && (
                            <Tr key={building.id} data-status={building.status}>
                              <Td>{building.name}</Td>
                              <Td>{building.normalController.length}</Td>
                              <Td>{building.activatedController.length}</Td>
                              <Td>{building.offlineController.length}</Td>
                              <Td>{building.clients_count}</Td>
                              <Td>{building.numberOfControllers}</Td>
                            </Tr>
                          ),
                      )}
                    </Tbody>
                  </Table>
                )}
              </main>
              <footer className="mt-4 flex flex-col items-center justify-center gap-2 px-12">
                <span className="text-lg font-bold">Legenda</span>
                <ul className="flex gap-2">
                  <li className="flex h-8 items-center justify-center rounded-sm bg-green-400 px-2">
                    <span className="text-lg">Normal</span>
                  </li>
                  <li className="flex h-8 items-center justify-center rounded-sm bg-red-400 px-2">
                    <span className="text-lg">Vazamento</span>
                  </li>
                  <li className="flex h-8 items-center justify-center rounded-sm bg-blue-400 px-2">
                    <span className="text-lg">Offline</span>
                  </li>
                </ul>

                <ul className="flex flex-col items-start justify-center gap-2">
                  <li className="text-sm">N = Normal;</li>
                  <li className="text-sm">V = Vazamento;</li>
                  <li className="text-sm">O = Offline;</li>
                  <li className="text-sm">TC = Total Clientes;</li>
                  <li className="text-sm">TCO = Total Controladoras;</li>
                  <li className="text-sm">VSG = Valor Sensor de Gás</li>
                  <li className="text-sm">VB = Valor Bateria</li>
                </ul>
              </footer>
            </>
          )}
        </div>
      </MapContainer>
      {/* <ShowJson data={buildingsMap} /> */}
    </>
  );
}
