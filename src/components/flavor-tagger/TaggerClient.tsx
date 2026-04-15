"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface TaggerClientProps {
  filenames: string[];
}

export default function TaggerClient({ filenames }: TaggerClientProps) {
  const [flavorMap, setFlavorMap] = useState<Record<string, string>>({});

  const handleInputChange = (filename: string, val: string) => {
    setFlavorMap(prev => ({
      ...prev,
      [filename]: val
    }));
  };

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD') // decompose accents
      .replace(/[\u0300-\u036f]/g, '') // remove accents
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, '') // remove special characters
      .replace(/-+/g, '-') // remove multiple hyphens
      .replace(/^-+|-+$/g, ''); // trim hyphens from start/end
  };

  const handleSend = () => {
    let message = "";
    filenames.forEach(filename => {
      const flavorName = flavorMap[filename] || "";
      if (flavorName.trim() !== "") {
        const slug = slugify(flavorName);
        message += `${filename} -> ${flavorName}\n(Save as: cone-${slug}.jpg)\n\n`;
      }
    });

    if (!message) {
      alert("Please enter at least one flavor name.");
      return;
    }

    const encodedMessage = encodeURIComponent(message.trim());
    window.open(`https://wa.me/393402362566?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 min-h-screen bg-[var(--color-background-primary)]">
      <header className="mb-8 mt-4 md:mt-8 text-center">
        <h1 className="text-4xl text-[var(--color-text-primary)] font-bold mb-4 font-[family-name:var(--font-heading)]">Flavor Tagger</h1>
        <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto text-lg">
          Please type the name of the flavor next to each cone photo, then click Send at the bottom.
        </p>
      </header>

      <div className="space-y-6 md:space-y-8">
        {filenames.map((filename) => (
          <div key={filename} className="flex flex-col md:flex-row items-center gap-4 bg-[var(--color-background-secondary)] p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="relative w-full md:w-32 h-40 shrink-0">
              <Image 
                src={`/assets/temp-cones/${filename}`}
                alt={filename}
                fill
                className="object-contain rounded-2xl"
              />
            </div>
            
            <div className="w-full flex-grow flex flex-col gap-2">
              <div className="text-xs text-[var(--color-text-secondary)] font-mono opacity-70">{filename}</div>
              <input 
                type="text" 
                placeholder="Flavor name..." 
                value={flavorMap[filename] || ""}
                onChange={(e) => handleInputChange(filename, e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-green)] focus:border-transparent text-lg text-[var(--color-text-primary)] bg-white shadow-inner"
              />
            </div>
          </div>
        ))}
        {filenames.length === 0 && (
          <p className="text-center text-[var(--color-text-secondary)] py-12">No images found in temp-cones folder.</p>
        )}
      </div>

      <div className="mt-12 mb-16 flex justify-center">
        <button 
          onClick={handleSend}
          className="bg-[var(--color-brand-green)] hover:brightness-110 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 text-lg w-full md:w-auto"
        >
          Send to Patrick via WhatsApp
        </button>
      </div>
    </div>
  );
}
