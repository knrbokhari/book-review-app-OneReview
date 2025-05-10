"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { CloseIcon } from "@/assets/icons";
// import { useLocale } from "next-intl";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  const cancelButtonRef = useRef(null);
  // const locale = useLocale();
  // const dir = ["ar", "he", "fa", "ur"].includes(locale) ? "rtl" : "ltr";

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        initialFocus={cancelButtonRef}
        static
        open={open}
        onClose={onClose}
        dir={"rtl"}
      >
        <div className="min-h-full text-center md:p-5">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 h-full w-full bg-gray-900 bg-opacity-50" />
          </Transition.Child>

          {/* Centering trick */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="min-w-content relative inline-block max-w-full text-start align-middle transition-all md:rounded-xl">
              <button
                onClick={onClose}
                aria-label="Close panel"
                ref={cancelButtonRef}
                className="absolute right-4 top-4 z-[60] inline-block outline-none focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <CloseIcon className="h-4 w-4" />
              </button>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
