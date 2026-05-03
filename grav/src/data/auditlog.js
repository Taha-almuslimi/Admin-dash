export const auditData = [
  { id: 1, time: '18 مايو 2024, 14:30', admin: 'أحمد علي', role: 'Super Admin', roleColor: 'success', event: 'إجراء مالي', eventColor: 'success', details: 'تحويل أرباح للمؤجر مؤسسة التقنية بقيمة 450,000 ر.ي', ip: '192.168.1.45' },
  { id: 2, time: '18 مايو 2024, 11:15', admin: 'سارة محمد', role: 'Support', roleColor: 'info', event: 'قرار نزاع', eventColor: 'warning', details: 'إغلاق النزاع #D-2024-001 وقبول الخصم بقيمة 50,000 ر.ي', ip: '10.0.0.12' },
  { id: 3, time: '17 مايو 2024, 09:45', admin: 'أحمد علي', role: 'Super Admin', roleColor: 'success', event: 'تعديل بيانات', eventColor: 'info', details: 'تحديث سياسة الاستخدام (البند 3.1)', ip: '192.168.1.45' },
  { id: 4, time: '16 مايو 2024, 16:20', admin: 'سارة محمد', role: 'Support', roleColor: 'info', event: 'حذف محتوى', eventColor: 'warning', details: 'حذف التقييم #REV-003 لمخالفته الآداب العامة', ip: '10.0.0.12' },
  { id: 5, time: '15 مايو 2024, 10:05', admin: 'خالد عمر', role: 'Finance', roleColor: 'warning', event: 'حظر/تعليق مستخدم', eventColor: 'danger', details: 'حظر دائم للمستخدم "علي صالح" لاحتيال مالي', ip: '172.16.0.5' },
];

export const adminsData = [
  { id: 1, name: 'أحمد علي', email: 'ahmed@email.com', role: 'Super Admin', roleColor: 'success' },
  { id: 2, name: 'سارة محمد', email: 'sara@email.com', role: 'Support', roleColor: 'info' },
  { id: 3, name: 'خالد عمر', email: 'khaled@email.com', role: 'Finance', roleColor: 'warning' },
];

export const permissionsData = [
  { action: 'إدارة المستخدمين', super: true, support: true, finance: false },
  { action: 'الإشراف المالي', super: true, support: false, finance: true },
  { action: 'إدارة النزاعات', super: true, support: true, finance: false },
  { action: 'Audit Log', super: true, support: false, finance: false },
  { action: 'إدارة المعدات', super: true, support: true, finance: false },
];

export const sessionsData = [
  { id: 1, device: 'Windows PC - Chrome', ip: '192.168.1.45', time: 'نشط الآن', current: true },
  { id: 2, device: 'iPhone 13 - Safari', ip: '10.0.0.12', time: 'آخر نشاط: قبل ساعتين', current: false },
  { id: 3, device: 'MacBook Pro - Safari', ip: '172.16.0.5', time: 'آخر نشاط: أمس 14:30', current: false },
];
