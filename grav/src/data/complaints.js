export const complaintsTabs = [
  { id: 'complaints', label: 'قائمة البلاغات' },
  { id: 'notifications', label: 'مركز الإشعارات' }
];

export const complaintsData = [
  { id: 'RPT-001', reporter: 'ياسر علي', type: 'مستخدم', target: 'أحمد محمد', date: 'منذ ساعتين', priority: 'high', status: 'جديد' },
  { id: 'RPT-002', reporter: 'ياسر علي', type: 'مستخدم', target: 'أحمد محمد', date: 'منذ ساعتين', priority: 'normal', status: 'جديد' },
  { id: 'RPT-003', reporter: 'ياسر علي', type: 'مستخدم', target: 'أحمد محمد', date: 'منذ ساعتين', priority: 'normal', status: 'جديد' },
  { id: 'RPT-004', reporter: 'ياسر علي', type: 'مستخدم', target: 'أحمد محمد', date: 'منذ ساعتين', priority: 'normal', status: 'جديد' }
];

export const notificationsData = [
  { id: 1, type: 'danger', title: '🔴 نزاع جديد مفتوح', time: 'منذ 10 دقائق', desc: 'تم فتح نزاع جديد بواسطة المستأجر "أحمد محمد" حول العملية #OP-2024-0847 بمبلغ 45,000 ر.ي.' },
  { id: 2, type: 'warning', title: '🟠 نشاط مشبوه', time: 'منذ ساعة', desc: 'تم رصد تسجيل دخول من جهاز جديد للمستخدم "شركة البناء" وتغيير معلومات الدفع.' },
  { id: 3, type: 'info', title: '🟡 بلاغ جديد', time: 'منذ ساعتين', desc: 'قام المستخدم "ياسر علي" بالإبلاغ عن رسائل غير لائقة من المؤجر "علي صالح".' },
  { id: 4, type: 'success', title: '🟢 عملية تأجير مكتملة', time: 'منذ 3 ساعات', desc: 'تم استلام المعدة وإغلاق العملية #OP-2024-0846 بنجاح، وجاري تحويل الأرباح.' }
];
