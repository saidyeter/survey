"use client"

import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

interface PartipicationProgressProps {
  current: number,
  total: number,
}

export function PartipicationProgress({ current, total }: PartipicationProgressProps) {

  const data = [
    {
      name: 'Katılan',
      total: current
    },

    {
      name: 'Katılmayan',
      total: total - current
    }
  ]

  return (
    <div className="w-full pt-2 pb-2">

      <ResponsiveContainer width="100%" height={200}>
        <PieChart >
          <Pie
            label={(d) => d.name + ': ' + d.value}
            data={data}
            dataKey="total"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={50}
            onClick={(d) => {
              console.log(d);

            }}
          >
            {
              data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={`#${colors[index]}`} />
              ))
            }
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
const colors = [
  '26577C',
  'E55604',
  '61A3BA',
  'D2DE32',
  'A2C579',
  'A9A9A9',
  'FECDA6',
  'FF9130',
  'FF5B22',
]