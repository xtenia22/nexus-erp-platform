"use client";

import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
  alt: string;
};

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const validImages = images.filter(Boolean);
  const [selectedImage, setSelectedImage] = useState(validImages[0] ?? null);

  if (!selectedImage) {
    return (
      <div className="flex h-80 w-full items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-500">
        Sin imagen
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="h-80 w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <img
          src={selectedImage}
          alt={alt}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      {validImages.length > 1 && (
        <div className="flex gap-3">
          {validImages.map((image) => {
            const isSelected = image === selectedImage;

            return (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`h-20 w-24 overflow-hidden rounded-xl border transition ${
                  isSelected
                    ? "border-slate-300"
                    : "border-slate-800 hover:border-slate-600"
                }`}
              >
                <img
                  src={image}
                  alt={alt}
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}