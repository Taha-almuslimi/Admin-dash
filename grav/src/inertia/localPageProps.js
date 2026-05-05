import { auditData } from '../data/auditlog';
import {
  compareData,
  disputeRate,
  gaugeData,
  govData,
  profitData,
  topOwnersData,
} from '../data/analytics';
import { complaintsData, complaintsTabs } from '../data/complaints';
import { disputesData } from '../data/disputes';
import { equipmentData } from '../data/equipment';
import {
  escrowData,
  financeTabs,
  paymentsData,
  profitsData,
  refundsData,
} from '../data/finance';
import { lineData, pieData } from '../data/overview';
import { rentalsData, rentalsTabs } from '../data/rentals';
import { reviewsData } from '../data/reviews';
import { adminsData, permissionsData, sessionsData } from '../data/settings';
import { usersData } from '../data/users';

const notifications = [
  {
    id: 'NTF-001',
    type: 'danger',
    title: 'نزاع جديد مفتوح',
    time: 'منذ 10 دقائق',
    message: 'تم فتح نزاع جديد بواسطة المستأجر "أحمد محمد" حول العملية #OP-2024-0847 بمبلغ 45,000 ر.ي.',
  },
  {
    id: 'NTF-002',
    type: 'warning',
    title: 'نشاط مشبوه',
    time: 'منذ ساعة',
    message: 'تم رصد تسجيل دخول من جهاز جديد للمستخدم "شركة البناء" وتغيير معلومات الدفع.',
  },
  {
    id: 'NTF-003',
    type: 'info',
    title: 'بلاغ جديد',
    time: 'منذ ساعتين',
    message: 'قام المستخدم "ياسر علي" بالإبلاغ عن رسائل غير لائقة من المؤجر "علي صالح".',
  },
  {
    id: 'NTF-004',
    type: 'success',
    title: 'عملية تأجير مكتملة',
    time: 'منذ 3 ساعات',
    message: 'تم استلام المعدة وإغلاق العملية #OP-2024-0846 بنجاح، وجاري تحويل الأرباح.',
  },
];

export const localPageProps = {
  overview: {
    stats: {
      rentals: '1,240',
      profits: '4.2M',
      disputes: '18',
      users: '3,580',
    },
    rates: {
      cancel: '8.4%',
      dispute: '3.2%',
      escrow: '2,450,000',
    },
    lineData,
    pieData,
    disputes: disputesData.slice(0, 3),
    complaints: complaintsData.slice(0, 3),
    loading: false,
  },
  users: {
    users: usersData,
    filters: {},
    loading: false,
  },
  equipment: {
    equipment: equipmentData,
    filters: {},
  },
  rentals: {
    rentals: rentalsData,
    tabs: rentalsTabs,
    filters: {},
  },
  disputes: {
    disputes: disputesData,
    filters: {},
  },
  finance: {
    tabs: financeTabs,
    payments: paymentsData,
    escrow: escrowData,
    profits: profitsData,
    refunds: refundsData,
    filters: {},
    loading: false,
  },
  complaints: {
    complaints: complaintsData,
    tabs: complaintsTabs,
    notifications,
    filters: {},
  },
  analytics: {
    govData,
    profitData,
    compareData,
    topOwnersData,
    gaugeData,
    disputeRate,
  },
  reviews: {
    reviews: reviewsData,
    rentals: rentalsData,
    filters: {},
  },
  audit: {
    audit: auditData,
    filters: {},
  },
  settings: {
    admins: adminsData,
    permissions: permissionsData,
    sessions: sessionsData,
  },
};
