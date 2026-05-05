export const financeTabs = [
  { id: 'payments', label: 'جميع المدفوعات' },
  { id: 'escrow', label: 'حسابات Escrow' },
  { id: 'profits', label: 'الأرباح المحوّلة' },
  { id: 'refunds', label: 'استردادات التأمين' }
];

export const paymentsData = [1, 2, 3, 4, 5, 6, 7].map((i) => ({
  id: `TRX-00${i}`,
  tenant: i % 2 === 0 ? 'ياسر علي' : 'أحمد محمد',
  equipment: i % 3 === 0 ? 'رافعة شوكية' : 'حفار JCB',
  rent: 15000 + i * 1000,
  insurance: 50000,
  date: `2024-05-${String(i + 10).padStart(2, '0')}`,
  status: i % 3 === 0 ? 'معلق' : 'مكتمل',
  statusKey: i % 3 === 0 ? 'pending' : 'paid',
  statusColor: i % 3 === 0 ? 'warning' : 'success',
}));

export const escrowData = [1, 2, 3, 4, 5, 6, 7].map((i) => ({
  id: `OP-2024-08${i}`,
  amount: 150000 + i * 10000,
  since: '12 مايو 2024',
  status: i % 3 === 0 ? 'Completed' : 'In Use',
  statusKey: i % 3 === 0 ? 'completed' : 'inuse',
  statusColor: i % 3 === 0 ? 'success' : 'warning',
}));

const owners = ['مؤسسة التقنية', 'شركة البناء الحديثة', 'أحمد محمد', 'شركة الإعمار', 'مؤسسة النقل', 'علي صالح', 'شركة السلام', 'مؤسسة الأمل'];
const amounts = ['450,000', '320,000', '180,000', '750,000', '95,000', '210,000', '560,000', '140,000'];
const statuses = [
  { key: 'processing', label: 'Processing', color: 'info' },
  { key: 'completed', label: 'تم التحويل', color: 'success' },
  { key: 'pending', label: 'معلق', color: 'warning' },
];

export const profitsData = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
  id: `PROF-${i}`,
  owner: owners[i - 1],
  count: 8 + i * 3,
  profits: amounts[i - 1],
  status: statuses[i % 3].label,
  statusKey: statuses[i % 3].key,
  statusColor: statuses[i % 3].color,
}));

const tenants = ['أحمد محمد', 'ياسر علي', 'خالد عبدالله', 'سالم سعيد', 'مؤسسة السلام', 'شركة البناء', 'علي صالح'];
const insurances = ['100,000', '50,000', '30,000', '150,000', '80,000', '120,000', '45,000'];
const refunds = ['100,000', '50,000', '25,000', '150,000', '80,000', '110,000', '45,000'];
const refundStatuses = [
  { key: 'refunded', label: 'تم الاسترداد', color: 'success' },
  { key: 'processing', label: 'قيد المعالجة', color: 'warning' },
  { key: 'partial', label: 'خصم جزئي', color: 'info' },
];

export const refundsData = [1, 2, 3, 4, 5, 6, 7].map((i) => ({
  id: `REF-${i}`,
  tenant: tenants[i - 1],
  insurance: insurances[i - 1],
  refund: refunds[i - 1],
  date: `2024-05-${String(i + 10).padStart(2, '0')}`,
  status: refundStatuses[i % 3].label,
  statusKey: refundStatuses[i % 3].key,
  statusColor: refundStatuses[i % 3].color,
}));
