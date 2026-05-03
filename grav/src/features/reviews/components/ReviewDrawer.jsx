import React from 'react';
import { X, ChevronLeft, CheckCircle, Trash2, Flag, Star } from 'lucide-react';

export default function ReviewDrawer({ showDrawer, setShowDrawer, selectedReview }) {
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} size={14} className={i < rating ? "text-brand-warning fill-brand-warning" : "text-brand-border"} />
    ));
  };

  return (
    <>
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
    </>
  );
}
