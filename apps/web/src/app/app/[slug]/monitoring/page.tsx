import { Metadata } from 'next';
import { unstable_noStore } from 'next/cache';

import { AppAbilityCan } from '@/utils/app-ability';
import MonitoringMap from './monitoring-map';

export const metadata: Metadata = {
  title: 'Mapa de Monitoramento',
};

export default async function MonitoringMapPage() {
  unstable_noStore();

  const r = AppAbilityCan(a => a.can('get-all', 'Building'));

  if (r) {
    return r;
  }

  return <MonitoringMap />;
}
