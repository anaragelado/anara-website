"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface GroupedFlavor {
  slug: string;
  name: string;
  images: string[];
}

interface CuratorClientProps {
  groupedFlavors: GroupedFlavor[];
  problematicFiles: string[];
}

export default function CuratorClient({ groupedFlavors, problematicFiles }: CuratorClientProps) {
  const [selections, setSelections] = useState<Record<string, string>>({});

  const toggleSelection = (slug: string, filename: string) => {
    setSelections(prev => ({
      ...prev,
      [slug]: filename
    }));
  };

  const handleSend = () => {
    if (Object.keys(selections).length === 0) {
      alert("Please select at least one photo.");
      return;
    }

    let message = "";
    groupedFlavors.forEach(flavor => {
      const selectedFile = selections[flavor.slug];
      if (selectedFile) {
        message += `${flavor.name} -> SELECTED: ${selectedFile}\n`;
      }
    });

    const encodedMessage = encodeURIComponent(message.trim());
    window.open(`https://wa.me/393402362566?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 min-h-screen bg-[var(--color-background-primary)] pb-24">
      <header className="mb-12 mt-4 md:mt-8 text-center">
        <h1 className="text-4xl text-[var(--color-text-primary)] font-bold mb-4 font-[family-name:var(--font-heading)]">Step 2: Choose Your Favorites</h1>
        <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto text-lg">
          Please tap the best looking photo for each flavor. We will use the selected photos on the website.
        </p>
      </header>

      <div className="space-y-12">
        {groupedFlavors.map((flavor) => (
          <div key={flavor.slug} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6 text-gray-800 capitalize border-b pb-4">
              {flavor.name}
            </h2>
            <div className="flex flex-wrap gap-4 md:gap-8">
              {flavor.images.map(filename => {
                const isSelected = selections[flavor.slug] === filename;
                
                return (
                  <div 
                    key={filename} 
                    onClick={() => toggleSelection(flavor.slug, filename)}
                    className={`relative cursor-pointer transition-all duration-300 transform rounded-[1.2rem]
                      ${isSelected ? 'ring-4 ring-[#68B34A] scale-[1.02] shadow-md' : 'hover:scale-105 border border-gray-200'}
                    `}
                  >
                    <div className="relative w-32 aspect-[3/4] md:w-40">
                      <Image 
                        src={`/assets/images/${filename}`}
                        alt={filename}
                        fill
                        className="object-cover rounded-xl"
                      />
                    </div>
                    {isSelected && (
                      <div className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-sm text-2xl z-10 border border-gray-100">
                        ✅
                      </div>
                    )}
                    <div className="text-center text-[10px] text-gray-400 mt-2 absolute -bottom-6 w-full font-mono bg-white bg-opacity-70 rounded px-1">
                      {filename.split('-').pop()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {groupedFlavors.length === 0 && (
          <p className="text-center text-gray-500">No flavors found to curate.</p>
        )}
      </div>

      {problematicFiles.length > 0 && (
        <div className="mt-16 bg-gray-50 border border-gray-200 p-6 md:p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-orange-500">⚠️</span> Action Required: Missing Clean Photos
          </h2>
          <p className="text-gray-700 mb-6 bg-white p-4 rounded-xl shadow-sm text-sm border-l-4 border-orange-400">
            <strong className="text-orange-700">Note from Patrick:</strong> I have double-checked all the files transferred via email and WhatsApp. 
            The images below were the only versions received. Please send the clean, text-free versions of these specific ice creams directly to me via email.
          </p>
          <div className="flex flex-wrap gap-4 md:gap-6">
             {problematicFiles.map(filename => (
                <div key={filename} className="relative w-28 aspect-[3/4] md:w-32 border-2 border-orange-200 rounded-xl overflow-hidden opacity-80 shadow-inner">
                  <Image 
                    src={`/assets/images/${filename}`}
                    alt={filename}
                    fill
                    className="object-cover"
                  />
                </div>
             ))}
          </div>
        </div>
      )}

      <div className="mt-16 flex justify-center fixed bottom-8 left-0 right-0 z-50 px-4 pointer-events-none">
        <button 
          onClick={handleSend}
          className="pointer-events-auto bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-8 md:py-5 md:px-10 rounded-full shadow-2xl transition-transform hover:scale-105 active:scale-95 text-lg md:text-xl w-full md:w-auto flex items-center justify-center gap-3 border-4 border-white"
        >
           Send Selections to Patrick
        </button>
      </div>
    </div>
  );
}
