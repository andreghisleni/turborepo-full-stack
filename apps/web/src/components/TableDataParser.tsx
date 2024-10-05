import { CellContext } from '@tanstack/react-table';
import React from 'react';

import { format } from 'date-fns';

/* eslint react/display-name: off */

// import { Container } from "./styles";

export const TableDataTime: React.FC<{
  cellContext: CellContext<any, unknown>;
  fullTime?: 'date-time' | 'date' | 'time';
}> = ({ cellContext: { getValue }, fullTime = 'date-time' }) => {
  return (
    <span>
      {getValue<string | Date | null>() &&
        format(
          new Date(getValue<string | Date>()),
          fullTime === 'date-time'
            ? 'dd/MM/yyyy HH:mm'
            : fullTime === 'date'
              ? 'dd/MM/yyyy'
              : 'HH:mm',
        )}
    </span>
  );
};

export const tableDataParser =
  (fullTime?: 'date-time' | 'date' | 'time') => (cellContext: CellContext<any, unknown>) => (
    <TableDataTime {...{ cellContext, fullTime }} />
  );
