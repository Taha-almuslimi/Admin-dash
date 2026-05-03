import { X, AlertTriangle, PauseCircle, Ban } from "lucide-react";

export default function UserActionModal({
  isOpen,
  user,
  actionType,
  setActionType,
  onClose,
}) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-brand-card rounded-xl w-full max-w-md shadow-2xl border border-brand-border animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-brand-border flex justify-between items-center">
          <h3 className="text-lg font-bold flex items-center text-brand-text-primary">
            {actionType === "warn" && (
              <AlertTriangle className="text-brand-warning ml-2" />
            )}
            {actionType === "suspend" && (
              <PauseCircle className="text-brand-warning ml-2" />
            )}
            {actionType === "ban" && <Ban className="text-brand-danger ml-2" />}
            {actionType === "warn"
              ? "تحذير"
              : actionType === "suspend"
                ? "تعليق مؤقت"
                : "حظر دائم"}{" "}
            للمستخدم
          </h3>
          <button
            onClick={onClose}
            className="text-brand-text-muted hover:text-brand-danger"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-center space-x-3 space-x-reverse bg-brand-content p-3 rounded-lg border border-brand-border">
            <img src={user.avatar} alt="" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-bold text-sm">{user.name}</p>
              <p className="text-xs text-brand-text-muted" dir="ltr">
                {user.phone}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-text-primary mb-2">
              نوع الإجراء
            </label>
            <div className="flex space-x-4 space-x-reverse">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="actionType"
                  checked={actionType === "warn"}
                  onChange={() => setActionType("warn")}
                  className="text-brand-primary focus:ring-brand-primary"
                />
                <span className="mr-2 text-sm">تحذير</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="actionType"
                  checked={actionType === "suspend"}
                  onChange={() => setActionType("suspend")}
                  className="text-brand-warning focus:ring-brand-warning"
                />
                <span className="mr-2 text-sm">تعليق مؤقت</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="actionType"
                  checked={actionType === "ban"}
                  onChange={() => setActionType("ban")}
                  className="text-brand-danger focus:ring-brand-danger"
                />
                <span className="mr-2 text-sm">حظر دائم</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-text-primary mb-2">
              السبب <span className="text-brand-danger">*</span>
            </label>
            <textarea
              className="w-full border border-brand-border bg-brand-content rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary h-24 resize-none"
              placeholder="اكتب سبب الإجراء بالتفصيل..."
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-text-primary mb-2">
              ربط بسياسة
            </label>
            <select className="w-full border border-brand-border bg-brand-content rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary">
              <option value="">اختر السياسة المخالفة...</option>
              <option value="policy_1">
                مخالفة شروط الاستخدام (البند 3.1)
              </option>
              <option value="policy_2">احتيال مالي</option>
              <option value="policy_3">إساءة للمستخدمين الآخرين</option>
            </select>
          </div>
        </div>

        <div className="p-4 border-t border-brand-border bg-brand-content/50 rounded-b-xl flex justify-end space-x-3 space-x-reverse">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-brand-text-primary font-bold text-sm bg-white border border-brand-border hover:bg-gray-50 rounded-lg transition-colors"
          >
            إلغاء
          </button>
          <button
            className={`px-5 py-2.5 text-white font-bold text-sm rounded-lg transition-colors shadow-sm
            ${
              actionType === "warn"
                ? "bg-brand-warning hover:bg-brand-warning/90"
                : actionType === "suspend"
                  ? "bg-brand-warning hover:bg-brand-warning/90"
                  : "bg-brand-danger hover:bg-brand-danger/90"
            }`}
          >
            تأكيد الإجراء
          </button>
        </div>
      </div>
    </div>
  );
}
