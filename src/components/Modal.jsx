import { useEffect, useRef } from 'react';

// Thin wrapper around the native <dialog> element: focus trapping, Esc to close
// and the backdrop come from the browser. Clicking the backdrop also closes it.
export default function Modal({ open, onClose, className = '', labelledBy, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return undefined;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (!open) return undefined;
    document.documentElement.classList.add('cx-lock');
    return () => document.documentElement.classList.remove('cx-lock');
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={`cx-dialog ${className}`}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      {open && children}
    </dialog>
  );
}
