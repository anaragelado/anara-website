"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageGroup {
  baseSlug: string;
  files: string[];
  isUnknown: boolean;
  suggestedName: string;
}

interface MasterReviewClientProps {
  groupedImages: ImageGroup[];
}

export default function MasterReviewClient({ groupedImages }: MasterReviewClientProps) {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [names, setNames] = useState<Record<string, string>>({});
  const [knownStatus, setKnownStatus] = useState<Record<string, "confirmed" | "changing" | "unconfirmed">>(() => {
    const init: Record<string, "confirmed" | "changing" | "unconfirmed"> = {};
    groupedImages.forEach(g => {
      if (!g.isUnknown) init[g.baseSlug] = "unconfirmed";
    });
    return init;
  });

  const toggleSelection = (slug: string, filename: string) => {
    setSelections(prev => ({ ...prev, [slug]: filename }));
  };

  const handleNameChange = (slug: string, val: string) => {
    setNames(prev => ({ ...prev, [slug]: val }));
  };

  const handleConfirmKnown = (slug: string, suggestedName: string) => {
    setKnownStatus(prev => ({ ...prev, [slug]: "confirmed" }));
    setNames(prev => ({ ...prev, [slug]: suggestedName }));
  };

  const handleChangeKnown = (slug: string) => {
    setKnownStatus(prev => ({ ...prev, [slug]: "changing" }));
    setNames(prev => ({ ...prev, [slug]: "" }));
  };

  const handleSend = () => {
    // Validate
    let error = "";
    for (const group of groupedImages) {
      if (group.files.length > 1 && !selections[group.baseSlug]) {
        error = `Please select your favorite image for ${group.isUnknown ? 'an unknown flavor' : group.suggestedName}.`;
        break;
      }
      if (group.isUnknown && !names[group.baseSlug]?.trim()) {
        error = `Please type a name for all unknown flavors.`;
        break;
      }
      if (!group.isUnknown && knownStatus[group.baseSlug] === "unconfirmed") {
        error = `Please confirm or change the suggested name for ${group.suggestedName}.`;
        break;
      }
      if (!group.isUnknown && knownStatus[group.baseSlug] === "changing" && !names[group.baseSlug]?.trim()) {
        error = `Please type the new name for the flavor originally suggested as ${group.suggestedName}.`;
        break;
      }
    }

    if (error) {
      alert(error);
      return;
    }

    let message = "";
    groupedImages.forEach(flavor => {
      const selectedFile = flavor.files.length === 1 ? flavor.files[0] : selections[flavor.baseSlug];
      const finalName = names[flavor.baseSlug]?.trim();
      message += `[${finalName}] -> SELECTED: ${selectedFile}\n`;
    });

    const encodedMessage = encodeURIComponent(message.trim());
    window.open(`https://wa.me/393402362566?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 min-h-screen pb-24 text-[var(--color-text-primary)]">
      <header className="mb-12 mt-4 md:mt-8 text-center">
        <h1 className="text-4xl font-bold mb-4 font-heading">Unified Image Review</h1>
        <p className="text-text-secondary max-w-lg mx-auto text-lg">
          Please confirm flavor names and select your favorite photo from each group.
        </p>
      </header>

      <div className="space-y-12">
        {groupedImages.map((group) => {
          const finalNameInput = names[group.baseSlug] || "";
          
          return (
            <div key={group.baseSlug} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="mb-6 border-b pb-4">
                {group.isUnknown ? (
                  <div>
                     <h2 className="text-xl font-bold font-heading mb-2 text-gray-800">Unknown Flavor</h2>
                     <input 
                       type="text" 
                       placeholder="Type flavor name here..."
                       value={finalNameInput}
                       onChange={(e) => handleNameChange(group.baseSlug, e.target.value)}
                       className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all text-gray-800"
                     />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-bold font-heading mb-3 text-gray-800">
                      Suggested Flavor: <span className="text-brand-green">{group.suggestedName}</span>
                    </h2>
                    {knownStatus[group.baseSlug] === "unconfirmed" && (
                      <div className="flex gap-3 mt-2">
                        <button 
                          onClick={() => handleConfirmKnown(group.baseSlug, group.suggestedName)}
                          className="bg-brand-green text-white px-4 py-2 rounded-full font-bold shadow hover:scale-105 transition-transform"
                        >
                          ✅ Confirm
                        </button>
                        <button 
                          onClick={() => handleChangeKnown(group.baseSlug)}
                          className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold shadow hover:scale-105 transition-transform"
                        >
                          ❌ Change
                        </button>
                      </div>
                    )}
                    {knownStatus[group.baseSlug] === "confirmed" && (
                      <div className="flex items-center gap-3">
                        <span className="text-brand-green font-bold flex items-center gap-1">
                          ✅ Confirmed: {names[group.baseSlug]}
                        </span>
                        <button 
                          onClick={() => handleChangeKnown(group.baseSlug)}
                          className="text-sm text-gray-500 hover:text-gray-700 underline"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                    {knownStatus[group.baseSlug] === "changing" && (
                      <div className="mt-2">
                        <input 
                          type="text" 
                          placeholder="Type new flavor name here..."
                          value={finalNameInput}
                          onChange={(e) => handleNameChange(group.baseSlug, e.target.value)}
                          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all text-gray-800"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 md:gap-8 mt-6">
                {group.files.map(filename => {
                  const isSelected = group.files.length === 1 || selections[group.baseSlug] === filename;
                  
                  return (
                    <div 
                      key={filename} 
                      onClick={() => group.files.length > 1 && toggleSelection(group.baseSlug, filename)}
                      className={`relative transition-all duration-300 transform rounded-[1.2rem]
                        ${group.files.length > 1 ? 'cursor-pointer' : ''}
                        ${isSelected ? 'ring-4 ring-[#68B34A] scale-[1.02] shadow-md' : 'hover:scale-105 border border-gray-200'}
                      `}
                    >
                      <div className="relative w-32 aspect-square md:w-40">
                        <Image 
                          src={`/assets/new-cones/${filename}`}
                          alt={filename}
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                      {isSelected && group.files.length > 1 && (
                        <div className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-sm text-2xl z-10 border border-gray-100 flex items-center justify-center">
                          ✅
                        </div>
                      )}
                      <div className="text-center text-[10px] text-gray-400 mt-2 absolute -bottom-6 w-full font-mono bg-white bg-opacity-70 rounded px-1 truncate">
                        {filename}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {groupedImages.length === 0 && (
          <p className="text-center text-gray-500">No images found to review.</p>
        )}
      </div>

      <div className="mt-16 mb-16 flex justify-center">
        <button 
          onClick={handleSend}
          className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-8 md:py-5 md:px-10 rounded-full shadow-xl transition-transform hover:scale-105 active:scale-95 text-lg md:text-xl w-full md:w-auto flex items-center justify-center gap-3"
        >
           Send Selections to WhatsApp
        </button>
      </div>
    </div>
  );
}
