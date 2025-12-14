interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 min-w-[360px] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        {title && (
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        )}

        {children}
      </div>
    </div>
  );
}
// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title?: string;
//   maxWidth?: string;
//   children: React.ReactNode;
// }

// export default function Modal({
//   isOpen,
//   onClose,
//   title,
//   maxWidth = "1400px",
//   children,
// }: ModalProps) {
//   if (!isOpen) return null;

//   return (
//     <div
//       className="
//         fixed inset-0 z-[999]
//         flex items-center justify-center
//         bg-black/70 backdrop-blur-sm
//         animate-fadeIn
//       "
//       onClick={onClose}
//     >
//       <div
//         className="
//           bg-white border border-gray-200 shadow-xl
//           rounded-2xl p-8
//           w-[95vw] max-h-[90vh]
//           overflow-y-auto
//           animate-scaleIn
//         "
//         style={{ maxWidth }}
//         onClick={(e) => e.stopPropagation()}
//       >
//         {title && (
//           <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
//             {title}
//           </h2>
//         )}

//         {children}
//       </div>
//     </div>
//   );
// }
