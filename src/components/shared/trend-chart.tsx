"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Yan", cursor: 400, copilot: 240, v0: 100 },
  { name: "Fev", cursor: 500, copilot: 300, v0: 150 },
  { name: "Mar", cursor: 600, copilot: 400, v0: 200 },
  { name: "Apr", cursor: 800, copilot: 500, v0: 300 },
  { name: "May", cursor: 1200, copilot: 600, v0: 500 },
  { name: "Iyun", cursor: 1500, copilot: 700, v0: 800 },
];

export function TrendChart() {
  return (
    <Card className="w-full bg-card/50">
      <CardHeader>
        <CardTitle>Eng ommabop AI vositalarining o'sish treti</CardTitle>
        <CardDescription>Oxirgi 6 oy ichidagi faollik va foydalanish ko'rsatkichlari</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#141418", borderColor: "#27272a", borderRadius: "8px" }}
                itemStyle={{ color: "#fff" }}
              />
              <Line type="monotone" dataKey="cursor" name="Cursor" stroke="#6366F1" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="copilot" name="GitHub Copilot" stroke="#14B8A6" strokeWidth={2} />
              <Line type="monotone" dataKey="v0" name="v0 by Vercel" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
