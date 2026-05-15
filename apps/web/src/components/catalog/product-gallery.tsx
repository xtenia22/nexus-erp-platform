"use client";

import { useState } from "react";
import { company } from "@/companyLayer/company.config";

type ProductGalleryProps = {
  images: string[];
  alt: string;
};

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const validImages = images.filter(Boolean);
  const [selectedImage, setSelectedImage] = useState(validImages[0] ?? null);

  if (!selectedImage) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-sm text-slate-500 md:h-80">
        {company.content.catalog.productGallery.noImage}
      </div>
    );
  }

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="aspect-[4/3] w-full bg-slate-950 md:aspect-[16/11]">
          <img
            src={selectedImage}
            alt={alt}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        </div>
      </div>

      {validImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {validImages.map((image) => {
            const isSelected = image === selectedImage;

            return (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`h-16 w-20 shrink-0 overflow-hidden rounded-xl border transition md:h-20 md:w-24 ${
                  isSelected
                    ? "border-slate-200"
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