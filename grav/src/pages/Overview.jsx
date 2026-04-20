import React, { useState } from 'react';
import { 
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  ShoppingCart, DollarSign, AlertTriangle, Users, TrendingUp, TrendingDown,
  Activity, Shield, Eye
} from 'lucide-react';

const lineData = [
  { name: '1', completed: 40, cancelled: 5 },
  { name: '5', completed: 30, cancelled: 8 },
  { name: '10', completed: 45, cancelled: 2 },
  { name: '15', completed: 27, cancelled: 10 },
  { name: '20', completed: 50, cancelled: 4 },
  { name: '25', completed: 35, cancelled: 6 },
  { name: '30', completed: 60, cancelled: 3 },
];

const pieData = [
  { name: 'Pending', value: 15, color: '#888888' },
  { name: 'Confirmed', value: 25, color: '#3498DB' },
  { name: 'In Use', value: 30, color: '#F39C12' },
  { name: 'Completed', value: 120, color: '#27AE60' },
  { name: 'Cancelled', value: 10, color: '#E74C3C' },
  { name: 'Disputed', value: 5, color: '#C0392B' },
];

export default function Overview() {
  const [chartFilter, setChartFilter] = useState('شهر');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* KPI Row 1: 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-brand-card rounded-xl p-6 border border-brand-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-lg flex items-center justify-center">
              <ShoppingCart size={24} />
            </div>
            <span className="flex items-center text-brand-success text-sm font-bold">
              <TrendingUp size={16} className="mr-1" /> +12%
            </span>
          </div>
          <div>
            <p className="text-brand-text-muted text-sm mb-1">عمليات التأجير</p>
            <p className="text-[32px] font-bold text-brand-text-primary leading-none">1,240</p>
          </div>
        </div>

        <div className="bg-brand-card rounded-xl p-6 border border-brand-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-brand-success/10 text-brand-success rounded-lg flex items-center justify-center">
              <DollarSign size={24} />
            </div>
            <span className="flex items-center text-brand-success text-sm font-bold">
              <TrendingUp size={16} className="mr-1" /> +8%
            </span>
          </div>
          <div>
            <p className="text-brand-text-muted text-sm mb-1">الأرباح</p>
            <p className="text-[32px] font-bold text-brand-text-primary leading-none">4.2M <span className="text-base font-normal text-brand-text-muted">ر.ي</span></p>
          </div>
        </div>

        <div className="bg-brand-card rounded-xl p-6 border border-brand-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-brand-danger/10 text-brand-danger rounded-lg flex items-center justify-center">
              <AlertTriangle size={24} />
            </div>
            <span className="flex items-center text-brand-danger text-sm font-bold px-2 py-1 bg-brand-danger/10 rounded-full">
              🔴 مراجعة
            </span>
          </div>
          <div>
            <p className="text-brand-text-muted text-sm mb-1">النزاعات</p>
            <p className="text-[32px] font-bold text-brand-text-primary leading-none">18</p>
          </div>
        </div>

        <div className="bg-brand-card rounded-xl p-6 border border-brand-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-brand-info/10 text-brand-info rounded-lg flex items-center justify-center">
              <Users size={24} />
            </div>
            <span className="flex items-center text-brand-success text-sm font-bold">
              <TrendingUp size={16} className="mr-1" /> +24 اليوم
            </span>
          </div>
          <div>
            <p className="text-brand-text-muted text-sm mb-1">المستخدمون</p>
            <p className="text-[32px] font-bold text-brand-text-primary leading-none">3,580</p>
          </div>
        </div>
      </div>

      {/* KPI Row 2: 3 Cards */}
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Line Chart */}
        <div className="xl:col-span-8 bg-brand-card rounded-xl p-6 border border-brand-border shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-lg font-bold text-brand-text-primary">عمليات التأجير — آخر 30 يوماً</h3>
            <div className="flex bg-brand-content rounded-lg p-1">
              {['أسبوع', 'شهر', '3 أشهر', 'سنة'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setChartFilter(tab)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    chartFilter === tab ? 'bg-white text-brand-text-primary shadow-sm' : 'text-brand-text-muted hover:text-brand-text-primary'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="h-80 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888888', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888888', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E0E0E0', direction: 'rtl' }}
                  itemStyle={{ color: '#222' }}
                />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ direction: 'rtl' }} />
                <Line type="monotone" dataKey="completed" name="مكتملة" stroke="#27AE60" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="cancelled" name="ملغاة" stroke="#F39C12" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="xl:col-span-4 bg-brand-card rounded-xl p-6 border border-brand-border shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-brand-text-primary mb-6">توزيع حالات الطلبات</h3>
          <div className="flex-1 min-h-[300px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E0E0E0', direction: 'rtl' }}
                  itemStyle={{ color: '#222' }}
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ fontSize: '12px', paddingTop: '20px', direction: 'rtl' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Disputes Table */}
        <div className="bg-brand-card rounded-xl p-6 border border-brand-border shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-brand-text-primary">آخر النزاعات</h3>
            <button className="text-brand-info text-sm font-medium hover:underline">عرض الكل</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-brand-content text-brand-text-muted font-medium">
                <tr>
                  <th className="py-3 px-4 rounded-r-lg">#</th>
                  <th className="py-3 px-4">المستأجر</th>
                  <th className="py-3 px-4">المؤجر</th>
                  <th className="py-3 px-4">المعدة</th>
                  <th className="py-3 px-4">المبلغ</th>
                  <th className="py-3 px-4 rounded-l-lg text-center">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {[1, 2, 3].map(i => (
                  <tr key={i} className="hover:bg-brand-content/50 transition-colors">
                    <td className="py-3 px-4 text-brand-text-muted">#D-10{i}</td>
                    <td className="py-3 px-4 font-medium">أحمد محمد</td>
                    <td className="py-3 px-4 font-medium">شركة البناء</td>
                    <td className="py-3 px-4">حفار بوكلين</td>
                    <td className="py-3 px-4 font-bold text-brand-danger">45,000 ر.ي</td>
                    <td className="py-3 px-4 text-center">
                      <button className="bg-brand-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-brand-primary/90 transition-colors inline-flex items-center">
                        <Eye size={14} className="ml-1"/> مراجعة
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="bg-brand-card rounded-xl p-6 border border-brand-border shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-brand-text-primary">آخر البلاغات</h3>
            <button className="text-brand-info text-sm font-medium hover:underline">عرض الكل</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-brand-content text-brand-text-muted font-medium">
                <tr>
                  <th className="py-3 px-4 rounded-r-lg">#</th>
                  <th className="py-3 px-4">المُبلِّغ</th>
                  <th className="py-3 px-4">نوع البلاغ</th>
                  <th className="py-3 px-4">التاريخ</th>
                  <th className="py-3 px-4 rounded-l-lg text-center">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {[1, 2, 3].map(i => (
                  <tr key={i} className="hover:bg-brand-content/50 transition-colors">
                    <td className="py-3 px-4 text-brand-text-muted">#R-80{i}</td>
                    <td className="py-3 px-4 font-medium">ياسر علي</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-brand-warning/10 text-brand-warning rounded-md text-xs font-bold">سلوك مسيء</span>
                    </td>
                    <td className="py-3 px-4 text-brand-text-muted">منذ ساعتين</td>
                    <td className="py-3 px-4 text-center">
                      <button className="border border-brand-primary text-brand-primary px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-brand-primary/10 transition-colors inline-flex items-center">
                        معالجة
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
