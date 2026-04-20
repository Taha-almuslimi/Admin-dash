import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Legend, PieChart, Pie, Cell 
} from 'recharts';
import { Calendar, Download, FileText, ChevronDown } from 'lucide-react';

const govData = [
  { name: 'صنعاء', value: 850 },
  { name: 'عدن', value: 420 },
  { name: 'تعز', value: 310 },
  { name: 'حضرموت', value: 280 },
  { name: 'إب', value: 150 },
  { name: 'الحديدة', value: 120 },
];

const profitData = [
  { name: 'يناير', value: 1200000 },
  { name: 'فبراير', value: 1800000 },
  { name: 'مارس', value: 1500000 },
  { name: 'أبريل', value: 2200000 },
  { name: 'مايو', value: 2800000 },
  { name: 'يونيو', value: 3500000 },
];

const compareData = [
  { name: 'يناير', completed: 85, cancelled: 15 },
  { name: 'فبراير', completed: 90, cancelled: 10 },
  { name: 'مارس', completed: 82, cancelled: 18 },
  { name: 'أبريل', completed: 92, cancelled: 8 },
  { name: 'مايو', completed: 95, cancelled: 5 },
];

const topOwnersData = [
  { name: 'شركة البناء', value: 145 },
  { name: 'مؤسسة التقنية', value: 120 },
  { name: 'أحمد محمد', value: 85 },
  { name: 'معدات اليمن', value: 64 },
  { name: 'علي صالح', value: 42 },
];

// For fake Gauge Chart
const disputeRate = 3.2; 
const gaugeData = [
  { name: 'Disputes', value: disputeRate, color: disputeRate > 5 ? '#E74C3C' : '#27AE60' },
  { name: 'Safe', value: 100 - disputeRate, color: '#F4F6F9' }
];

export default function Analytics() {
  const [dateRange, setDateRange] = useState('هذا الأسبوع');
  const [showExportOptions, setShowExportOptions] = useState(false);

  const formatCurrency = (value) => {
    if(value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
    if(value >= 1000) return (value / 1000).toFixed(1) + 'K';
    return value;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header & Date Range */}
      <div className="bg-brand-card p-4 rounded-xl shadow-sm border border-brand-border flex flex-wrap gap-4 items-center justify-between z-20 relative">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none pl-10 pr-4 py-2 border border-brand-border rounded-lg bg-brand-content text-brand-text-primary text-sm font-bold focus:outline-none focus:border-brand-primary"
            >
              <option value="هذا الأسبوع">هذا الأسبوع</option>
              <option value="هذا الشهر">هذا الشهر</option>
              <option value="هذا العام">هذا العام</option>
              <option value="مخصص">تاريخ مخصص...</option>
            </select>
            <ChevronDown size={16} className="absolute left-3 top-3 text-brand-text-muted" />
          </div>

          {dateRange === 'مخصص' && (
            <div className="flex items-center space-x-2 space-x-reverse text-sm">
              <input type="date" className="border border-brand-border rounded-lg px-3 py-1.5 bg-brand-content" />
              <span className="text-brand-text-muted">إلى</span>
              <input type="date" className="border border-brand-border rounded-lg px-3 py-1.5 bg-brand-content" />
              <button className="bg-brand-primary text-white px-4 py-1.5 rounded-lg hover:bg-brand-primary/90 transition-colors">تطبيق</button>
            </div>
          )}
        </div>

        <div className="relative">
          <button 
            onClick={() => setShowExportOptions(!showExportOptions)}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-bold shadow-sm hover:bg-brand-primary/90 transition-colors"
          >
            <Download size={16} />
            <span>تصدير التقرير</span>
            <ChevronDown size={14} className="ml-1" />
          </button>
          
          {showExportOptions && (
            <div className="absolute left-0 top-full mt-2 w-32 bg-white rounded-xl shadow-lg border border-brand-border overflow-hidden z-50">
              <button className="w-full text-right px-4 py-2.5 text-sm font-bold hover:bg-brand-content transition-colors flex items-center">
                <FileText size={16} className="ml-2 text-brand-danger" /> PDF
              </button>
              <button className="w-full text-right px-4 py-2.5 text-sm font-bold hover:bg-brand-content transition-colors flex items-center border-t border-brand-border">
                <FileText size={16} className="ml-2 text-brand-success" /> CSV
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Row 1: Charts (6 cols each) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* عمليات التأجير حسب المحافظة */}
        <div className="lg:col-span-6 bg-brand-card rounded-xl p-6 border border-brand-border shadow-sm">
          <h3 className="text-lg font-bold text-brand-text-primary mb-6">عمليات التأجير حسب المحافظة</h3>
          <div className="h-72 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={govData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888888', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888888', fontSize: 12}} />
                <Tooltip cursor={{fill: '#F4F6F9'}} contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E0E0E0', direction: 'rtl' }} />
                <Bar dataKey="value" name="عدد العمليات" fill="#2D5A27" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* الأرباح الإجمالية بالزمن */}
        <div className="lg:col-span-6 bg-brand-card rounded-xl p-6 border border-brand-border shadow-sm">
          <h3 className="text-lg font-bold text-brand-text-primary mb-6">الأرباح الإجمالية بالزمن</h3>
          <div className="h-72 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={profitData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#27AE60" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#27AE60" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888888', fontSize: 12}} />
                <YAxis tickFormatter={formatCurrency} axisLine={false} tickLine={false} tick={{fill: '#888888', fontSize: 12}} />
                <Tooltip formatter={(value) => value.toLocaleString() + ' ر.ي'} contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E0E0E0', direction: 'rtl' }} />
                <Area type="monotone" dataKey="value" name="الأرباح" stroke="#27AE60" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Charts (4 cols each) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* معدل الإلغاء vs معدل الإكمال */}
        <div className="lg:col-span-4 bg-brand-card rounded-xl p-6 border border-brand-border shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-brand-text-primary mb-6">معدل الإلغاء vs الإكمال</h3>
          <div className="flex-1 min-h-[250px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={compareData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888888', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888888', fontSize: 12}} />
                <Tooltip cursor={{fill: '#F4F6F9'}} contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E0E0E0', direction: 'rtl' }} />
                <Legend wrapperStyle={{ fontSize: '12px', direction: 'rtl' }} />
                <Bar dataKey="completed" name="مكتملة" fill="#27AE60" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cancelled" name="ملغاة" fill="#E74C3C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* أفضل المؤجرين أداءً */}
        <div className="lg:col-span-4 bg-brand-card rounded-xl p-6 border border-brand-border shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-brand-text-primary mb-6">أفضل المؤجرين أداءً</h3>
          <div className="flex-1 min-h-[250px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={topOwnersData} margin={{ top: 5, right: 0, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E0E0E0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#222', fontSize: 12, fontWeight: 'bold'}} width={80} />
                <Tooltip cursor={{fill: '#F4F6F9'}} contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E0E0E0', direction: 'rtl' }} />
                <Bar dataKey="value" name="عدد العمليات" fill="#3498DB" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* معدل النزاعات الإجمالي (Gauge) */}
        <div className="lg:col-span-4 bg-brand-card rounded-xl p-6 border border-brand-border shadow-sm flex flex-col justify-center items-center relative">
          <h3 className="text-lg font-bold text-brand-text-primary mb-2 w-full text-right">معدل النزاعات الإجمالي</h3>
          <div className="flex-1 flex flex-col items-center justify-center w-full mt-4" dir="ltr">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={gaugeData}
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={70}
                  outerRadius={100}
                  dataKey="value"
                  stroke="none"
                >
                  {gaugeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute bottom-10 flex flex-col items-center">
              <span className={`text-4xl font-bold ${disputeRate > 5 ? 'text-brand-danger' : 'text-brand-success'}`}>
                {disputeRate}%
              </span>
              <span className="text-sm font-bold text-brand-text-muted mt-1">الهدف: &lt; 5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs Table */}
      <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
        <div className="p-4 border-b border-brand-border bg-brand-content/30">
          <h3 className="text-lg font-bold text-brand-text-primary">جدول المؤشرات الرئيسية (KPIs)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-brand-content text-brand-text-muted font-medium border-b border-brand-border">
              <tr>
                <th className="px-6 py-4">المؤشر</th>
                <th className="px-6 py-4 text-center">القيمة الحالية</th>
                <th className="px-6 py-4 text-center">الهدف</th>
                <th className="px-6 py-4 text-center">الفارق</th>
                <th className="px-6 py-4 text-center">التقييم</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border font-bold">
              <tr className="hover:bg-brand-content/50 transition-colors">
                <td className="px-6 py-4">معدل إكمال العمليات</td>
                <td className="px-6 py-4 text-center text-brand-text-primary">87%</td>
                <td className="px-6 py-4 text-center text-brand-text-muted">90%</td>
                <td className="px-6 py-4 text-center text-brand-warning">-3%</td>
                <td className="px-6 py-4 text-center text-lg">🟡</td>
              </tr>
              <tr className="hover:bg-brand-content/50 transition-colors">
                <td className="px-6 py-4">معدل النزاعات</td>
                <td className="px-6 py-4 text-center text-brand-success">3.2%</td>
                <td className="px-6 py-4 text-center text-brand-text-muted">&lt; 5%</td>
                <td className="px-6 py-4 text-center text-brand-success">✅</td>
                <td className="px-6 py-4 text-center text-lg">🟢</td>
              </tr>
              <tr className="hover:bg-brand-content/50 transition-colors">
                <td className="px-6 py-4">معدل الإلغاء</td>
                <td className="px-6 py-4 text-center text-brand-success">8%</td>
                <td className="px-6 py-4 text-center text-brand-text-muted">&lt; 10%</td>
                <td className="px-6 py-4 text-center text-brand-success">✅</td>
                <td className="px-6 py-4 text-center text-lg">🟢</td>
              </tr>
              <tr className="hover:bg-brand-content/50 transition-colors">
                <td className="px-6 py-4">متوسط تقييم المؤجرين</td>
                <td className="px-6 py-4 text-center text-brand-success">4.5 / 5</td>
                <td className="px-6 py-4 text-center text-brand-text-muted">&gt; 4.0</td>
                <td className="px-6 py-4 text-center text-brand-success">✅</td>
                <td className="px-6 py-4 text-center text-lg">🟢</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
