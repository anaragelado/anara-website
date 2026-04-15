"use client";

import React, { useState } from 'react';
import Image from 'next/image';

export type FlavorItem = {
  filename: string;
  suggestion: string;
  status: 'pending' | 'confirmed' | 'manual';
  finalName: string;
};

interface TaggerClientProps {
  initialFlavors: FlavorItem[];
}

export default function TaggerClient({ initialFlavors }: TaggerClientProps) {
  // Initialize state. If suggestion is empty, start in 'manual'.
  const [flavors, setFlavors] = useState<FlavorItem[]>(() => 
    initialFlavors.map(f => ({
      ...f,
      status: f.suggestion ? f.status : 'manual'
    }))
  );

  const updateFlavor = (filename: string, updates: Partial<FlavorItem>) => {
    setFlavors(prev => prev.map(f => f.filename === filename ? { ...f, ...updates } : f));
  };

  const handleCorrect = (filename: string, suggestion: string) => {
    updateFlavor(filename, { status: 'confirmed', finalName: suggestion });
  };

  const handleChange = (filename: string) => {
    updateFlavor(filename, { status: 'manual' });
  };

  const handleInputChange = (filename: string, val: string) => {
    updateFlavor(filename, { finalName: val });
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
    flavors.forEach(f => {
      // Only include if confirmed or manual and finalName is not empty
      if ((f.status === 'confirmed' || f.status === 'manual') && f.finalName.trim() !== "") {
        const slug = slugify(f.finalName);
        message += `${f.filename} -> ${f.finalName}\n(Save as: cone-${slug}.jpg)\n\n`;
      }
    });

    if (!message) {
      alert("Please enter or confirm at least one flavor name.");
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
          Please review the AI suggestions or type the name of the flavor next to each cone photo, then click Send at the bottom.
        </p>
      </header>

      <div className="space-y-12 md:space-y-8">
        {flavors.map((f) => (
          <div key={f.filename} className={`flex flex-col md:flex-row items-center gap-6 bg-[var(--color-background-secondary)] p-6 rounded-3xl shadow-sm border ${f.status === 'confirmed' ? 'border-green-400 ring-2 ring-green-100' : 'border-gray-100'}`}>
            <div className="relative w-full md:w-64 shrink-0">
              {/* Added aspect-[3/4] on mobile/default */}
              <div className="relative w-full h-auto aspect-[3/4] md:aspect-auto md:h-64">
                <Image 
                  src={`/assets/temp-cones/${f.filename}`}
                  alt={f.filename}
                  fill
                  className="object-cover rounded-2xl shadow-sm"
                />
              </div>
            </div>
            
            <div className="w-full flex-grow flex flex-col gap-4">
              <div className="text-xs text-[var(--color-text-secondary)] font-mono opacity-70 bg-gray-50 p-2 rounded-lg inline-block w-max">{f.filename}</div>
              
              {f.suggestion && (
                <div className="text-xl font-[family-name:var(--font-heading)] font-bold text-gray-800">
                  AI Suggestion: <span className="text-[var(--color-brand-green)]">{f.suggestion}</span>
                </div>
              )}

              {f.status === 'pending' && (
                <div className="flex flex-row gap-4 mt-2">
                  <button 
                    onClick={() => handleCorrect(f.filename, f.suggestion)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-full transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2 text-lg"
                  >
                    <span>✅</span> Correct
                  </button>
                  <button 
                    onClick={() => handleChange(f.filename)}
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold py-3 px-4 rounded-full transition-transform active:scale-95 shadow-sm flex items-center justify-center gap-2 text-lg"
                  >
                    <span>❌</span> Change
                  </button>
                </div>
              )}

              {f.status === 'confirmed' && (
                <div className="mt-2 p-4 bg-green-50 border border-green-100 rounded-xl text-green-800 font-medium flex items-center gap-2">
                  <span>✅</span> Confirmed as {f.finalName}
                  <button onClick={() => handleChange(f.filename)} className="ml-auto text-sm underline text-green-600 hover:text-green-800">Edit</button>
                </div>
              )}

              {f.status === 'manual' && (
                <div className="w-full mt-2">
                  <input 
                    type="text" 
                    placeholder="Type flavor name..." 
                    value={f.finalName}
                    onChange={(e) => handleInputChange(f.filename, e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-green)] focus:border-transparent text-xl text-[var(--color-text-primary)] bg-white shadow-inner font-medium"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        {flavors.length === 0 && (
          <p className="text-center text-[var(--color-text-secondary)] py-12">No images found.</p>
        )}
      </div>

      <div className="mt-16 mb-16 flex justify-center">
        <button 
          onClick={handleSend}
          className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-5 px-10 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 text-xl w-full md:w-auto flex items-center justify-center gap-3"
        >
          Send to Patrick via WhatsApp
        </button>
      </div>
    </div>
  );
}
