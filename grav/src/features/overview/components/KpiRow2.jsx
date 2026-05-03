import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Shield, Activity } from 'lucide-react';

const lineData = [
  { name: '1', completed: 40, cancelled: 5 },
  { name: '5', completed: 30, cancelled: 8 },
  { name: '10', completed: 45, cancelled: 2 },
  { name: '15', completed: 27, cancelled: 10 },
  { name: '20', completed: 50, cancelled: 4 },
  { name: '25', completed: 35, cancelled: 6 },
  { name: '30', completed: 60, cancelled: 3 },
];

export default function KpiRow2() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-brand-card rounded-xl p-5 border border-brand-border shadow-sm flex items-center justify-between">
        <div>
          <p className="text-brand-text-muted text-sm mb-1">معدل الإلغاء</p>
          <p className="text-2xl font-bold text-brand-text-primary">8.4%</p>
        </div>
        <div className="w-24 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData.slice(-5)}>
              <Line type="monotone" dataKey="cancelled" stroke="#F39C12" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-brand-card rounded-xl p-5 border border-brand-border shadow-sm flex items-center justify-between">
        <div>
          <p className="text-brand-text-muted text-sm mb-1">معدل النزاعات</p>
          <p className="text-2xl font-bold text-brand-text-primary">3.2%</p>
        </div>
        <div className="flex items-center text-brand-success bg-brand-success/10 px-3 py-1 rounded-full text-sm font-bold">
          <Shield size={16} className="ml-1" /> طبيعي
        </div>
      </div>

      <div className="bg-brand-card rounded-xl p-5 border border-brand-border shadow-sm flex items-center justify-between">
        <div>
          <p className="text-brand-text-muted text-sm mb-1">Escrow المحتجز</p>
          <p className="text-2xl font-bold text-brand-text-primary">2,450,000 <span className="text-sm font-normal text-brand-text-muted">ر.ي</span></p>
        </div>
        <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
          <Activity size={20} />
        </div>
      </div>
    </div>
  );
}
