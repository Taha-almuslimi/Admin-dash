import React, { useState } from 'react';
import { Search, Star, Eye, Trash2, Flag, X, ChevronLeft, CheckCircle } from 'lucide-react';

const reviewsData = [
  { id: 'REV-001', rater: 'أحمد محمد', raterType: 'مستأجر', target: 'مؤسسة التقنية', targetType: 'مؤجر', rating: 5, text: 'تعامل ممتاز ومعدة نظيفة جداً، أنصح بالتعامل معهم بقوة.', date: '2024-05-18', status: 'نشط', opId: 'OP-2024-0847' },
  { id: 'REV-002', rater: 'شركة البناء', raterType: 'مؤجر', target: 'ياسر علي', targetType: 'مستأجر', rating: 2, text: 'تأخر في تسليم المعدة عن الوقت المتفق عليه، والمعدة رجعت غير نظيفة.', date: '2024-05-15', status: 'نشط', opId: 'OP-2024-0822' },
  { id: 'REV-003', rater: 'علي صالح', raterType: 'مستأجر', target: 'أحمد محمد', targetType: 'مؤجر', rating: 1, text: 'أسوأ تعامل، المعدة تعطلت في ثاني يوم ورفض يعوضني.', date: '2024-05-10', status: 'محذوف', opId: 'OP-2024-0790' },
  { id: 'REV-004', rater: 'مؤسسة الإعمار', raterType: 'مؤجر', target: 'سالم سعيد', targetType: 'مستأجر', rating: 4, text: 'مستأجر محترم وحافظ على المعدة بشكل جيد.', date: '2024-05-05', status: 'نشط', opId: 'OP-2024-0755' },
];

export default function Reviews() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const openDrawer = (review) => {
    setSelectedReview(review);
    setShowDrawer(true);
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} size={14} className={i < rating ? "text-brand-warning fill-brand-warning" : "text-brand-border"} />
    ));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      
      {/* Filter Bar */}
      <div className="bg-brand-card p-4 rounded-xl shadow-sm border border-brand-border flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center flex-1">
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="بحث في التقييمات..." 
              className="w-full pl-4 pr-10 py-2 rounded-lg border border-brand-border bg-brand-content focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-sm"
            />
            <Search className="absolute right-3 top-2.5 text-brand-text-muted" size={18} />
          </div>
          
          <select className="border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-primary">
            <option value="">النوع: الكل</option>
            <option value="tenant">مستأجر</option>
            <option value="owner">مؤجر</option>
          </select>
          <select className="border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-primary">
            <option value="">التقييم: الكل</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="2">⭐⭐</option>
            <option value="1">⭐</option>
          </select>
          <select className="border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-primary">
            <option value="">الحالة: الكل</option>
            <option value="active">نشط</option>
            <option value="deleted">محذوف</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
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
              {reviewsData.map((rev) => (
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
                      <button onClick={() => openDrawer(rev)} className="p-1.5 text-brand-text-muted hover:text-brand-info hover:bg-brand-info/10 rounded-lg transition-colors" title="عرض التفاصيل">
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

      {/* Drawer Overlay */}
      {showDrawer && (
        <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={() => setShowDrawer(false)} />
      )}

      {/* Details Drawer */}
      <div className={`fixed top-0 bottom-0 right-0 w-full md:w-[480px] bg-brand-card shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${showDrawer ? 'translate-x-0' : 'translate-x-full'}`}>
        {selectedReview && (
          <>
            <div className="flex items-center justify-between p-6 border-b border-brand-border bg-brand-content/50">
              <h2 className="text-xl font-bold text-brand-text-primary">تفاصيل التقييم</h2>
              <button onClick={() => setShowDrawer(false)} className="p-2 text-brand-text-muted hover:text-brand-danger rounded-full hover:bg-brand-danger/10 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              <div className="flex items-center justify-between bg-white border border-brand-border p-4 rounded-xl shadow-sm">
                <div className="text-center">
                  <p className="text-xs text-brand-text-muted mb-1 font-bold">المُقيِّم ({selectedReview.raterType})</p>
                  <p className="font-bold text-brand-primary hover:underline cursor-pointer">{selectedReview.rater}</p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="h-px bg-brand-border w-10 mx-2"></div>
                  <ChevronLeft size={16} className="text-brand-text-muted" />
                  <div className="h-px bg-brand-border w-10 mx-2"></div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-brand-text-muted mb-1 font-bold">الهدف ({selectedReview.targetType})</p>
                  <p className="font-bold text-brand-primary hover:underline cursor-pointer">{selectedReview.target}</p>
                </div>
              </div>

              <div className="flex justify-between items-center px-2">
                <div className="flex items-center space-x-1 space-x-reverse" dir="ltr">
                  {renderStars(selectedReview.rating)}
                  <span className="font-bold text-brand-text-primary ml-2">{selectedReview.rating}.0</span>
                </div>
                <div className="text-sm text-brand-text-muted font-medium" dir="ltr">{selectedReview.date}</div>
              </div>

              <div className="bg-brand-content p-5 rounded-xl border border-brand-border text-brand-text-primary font-medium leading-relaxed">
                "{selectedReview.text}"
              </div>

              <div className="border border-brand-border rounded-xl overflow-hidden hover:border-brand-primary transition-colors">
                <div className="bg-brand-content/50 px-4 py-2 border-b border-brand-border text-xs font-bold text-brand-text-muted">العملية المرتبطة</div>
                <div className="p-4 bg-white flex justify-between items-center cursor-pointer group">
                  <div>
                    <p className="font-bold text-brand-text-primary group-hover:text-brand-primary transition-colors" dir="ltr">{selectedReview.opId}</p>
                    <p className="text-xs text-brand-text-muted mt-1">اضغط لعرض تفاصيل العملية</p>
                  </div>
                  <ChevronLeft size={20} className="text-brand-text-muted group-hover:text-brand-primary transition-colors" />
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="p-4 border-t border-brand-border bg-white flex space-x-3 space-x-reverse">
              <button className="flex-1 py-2.5 rounded-lg font-bold text-sm bg-brand-success/10 text-brand-success hover:bg-brand-success hover:text-white transition-colors border border-brand-success/20 flex items-center justify-center">
                <CheckCircle size={18} className="ml-2" /> إبقاء التقييم
              </button>
              <button className="flex-1 py-2.5 rounded-lg font-bold text-sm bg-brand-danger/10 text-brand-danger hover:bg-brand-danger hover:text-white transition-colors border border-brand-danger/20 flex items-center justify-center">
                <Trash2 size={18} className="ml-2" /> حذف
              </button>
              <button className="flex-1 py-2.5 rounded-lg font-bold text-sm bg-brand-warning/10 text-brand-warning hover:bg-brand-warning hover:text-white transition-colors border border-brand-warning/20 flex items-center justify-center">
                <Flag size={18} className="ml-2" /> إبلاغ
              </button>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
