import { Star, Eye, Trash2, Flag } from 'lucide-react';

const renderStars = (rating) => {
  return Array(5).fill(0).map((_, i) => (
    <Star key={i} size={14} className={i < rating ? "text-brand-warning fill-brand-warning" : "text-brand-border"} />
  ));
};

export default function ReviewsTable({ reviews, onOpenDrawer }) {
  return (
    <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead className="bg-brand-content text-brand-text-muted font-medium border-b border-brand-border">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">المُقيِّم</th>
              <th className="px-6 py-4">الهدف</th>
              <th className="px-6 py-4 text-center">التقييم</th>
              <th className="px-6 py-4 w-1/3">نص المراجعة (مختصر)</th>
              <th className="px-6 py-4 text-center">التاريخ</th>
              <th className="px-6 py-4 text-center">الحالة</th>
              <th className="px-6 py-4 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {reviews.map((rev) => (
              <tr key={rev.id} className="hover:bg-brand-content/50 transition-colors">
                <td className="px-6 py-4 font-bold text-brand-text-muted" dir="ltr">{rev.id}</td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-bold text-brand-text-primary">{rev.rater}</p>
                    <p className="text-xs text-brand-text-muted">{rev.raterType}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-bold text-brand-text-primary">{rev.target}</p>
                    <p className="text-xs text-brand-text-muted">{rev.targetType}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center space-x-1 space-x-reverse" dir="ltr">
                    {renderStars(rev.rating)}
                  </div>
                </td>
                <td className="px-6 py-4 text-brand-text-muted truncate max-w-xs">{rev.text}</td>
                <td className="px-6 py-4 text-center text-brand-text-muted" dir="ltr">{rev.date}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    rev.status === 'نشط' ? 'bg-brand-success/10 text-brand-success' : 'bg-brand-danger/10 text-brand-danger'
                  }`}>
                    {rev.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center space-x-2 space-x-reverse">
                    <button onClick={() => onOpenDrawer(rev)} className="p-1.5 text-brand-text-muted hover:text-brand-info hover:bg-brand-info/10 rounded-lg transition-colors" title="عرض التفاصيل">
                      <Eye size={18} />
                    </button>
                    <button className="p-1.5 text-brand-text-muted hover:text-brand-danger hover:bg-brand-danger/10 rounded-lg transition-colors" title="حذف التقييم">
                      <Trash2 size={18} />
                    </button>
                    <button className="p-1.5 text-brand-text-muted hover:text-brand-warning hover:bg-brand-warning/10 rounded-lg transition-colors" title="إبلاغ">
                      <Flag size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
