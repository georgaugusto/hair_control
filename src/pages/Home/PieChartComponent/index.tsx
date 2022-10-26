import React, { useCallback, useState } from 'react';
import { PieChart, Pie, Sector, Tooltip } from 'recharts';

import {
  HomeContainer,
  BoxContainer,
  HeaderContainer,
  Teste,
  GraphicContainer,
} from './styles';
import LayoutContext from '../../contexts/Layout';

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

export function PieChartComponent(data: any) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            color: '#334155',
            backgroundColor: '#ffffff',
            padding: '0.5rem',
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
          }}
        >
          <p
            className="label"
            style={{ fontWeight: 700 }}
          >{`Serviço: ${payload[0].name}`}</p>
          <p
            className="desc"
            style={{ color: '#334155' }}
          >{`Quantidade: ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <PieChart width={400} height={400}>
      {/* <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data.data}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
      /> */}
      <Pie
        dataKey="value"
        isAnimationActive={true}
        data={data.data}
        cx="50%"
        cy="50%"
        innerRadius={40}
        outerRadius={80}
        fill="#8884d8"
        label
      />

      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  );
}
