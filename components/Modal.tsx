'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onChange, title, description, children }) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.DialogPortal>
        <Dialog.Overlay
          className="
                bg-neutral-900/90
                backdrop-blur-sm
                fixed
                inset-0
                "
        />
        <Dialog.Content
          className="
                fixed
                drop-shadow-md
                border
                border-neutral-700
                top-[50%]
                left-[50%]
                max-h-full {/* Batas tinggi absolut */}
                {/* h-full <-- HAPUS KELAS INI */}
                md:h-auto {/* Biarkan tinggi menyesuaikan konten di desktop */}
                md:max-h-[85vh] {/* Batas tinggi di desktop */}
                w-full
                md:w-[90vw]
                md:max-w-[450px]
                translate-x-[-50%]
                translate-y-[-50%]
                rounded-md
                bg-neutral-800
                p-[25px]
                focus:outline-none
                overflow-y-auto {/* Pastikan ini tetap ada */}
                "
        >
          <Dialog.Title
            className="
                    text-xl
                    text-center
                    font-bold
                    mb-4
                    flex-shrink-0 {/* Cegah judul/deskripsi terkompresi aneh jika konten sangat tinggi */}
                    "
          >
            {title}
          </Dialog.Title>
          <Dialog.Description
            className="
                    mb-5
                    text-sm
                    leading-normal
                    text-center
                    flex-shrink-0 {/* Cegah judul/deskripsi terkompresi aneh jika konten sangat tinggi */}
                    "
          >
            {description}
          </Dialog.Description>
          <div>
            {children}
          </div>
          <Dialog.Close asChild>
            <button
              aria-label="Tutup"
              className="
                        text-neutral-400
                        hover:text-white
                        absolute
                        top-[10px]
                        right-[10px]
                        inline-flex
                        h-[25px]
                        w-[25px]
                        appearance-none
                        items-center
                        justify-center
                        rounded-full
                        focus:outline-none
                        flex-shrink-0 {/* Pastikan tombol close selalu terlihat */}
                        "
            >
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.DialogPortal>
    </Dialog.Root>
  );
};

Modal.displayName = 'Modal';
