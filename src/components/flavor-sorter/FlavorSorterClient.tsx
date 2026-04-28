"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown, Send, GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Flavor } from "@/data/flavors";
import { Creation } from "@/data/creations";

const FLAVOR_NAMES: Record<string, string> = {
  "salted-pistachio": "Salted Pistachio",
  "mango": "Mango",
  "natas": "Fior di Latte",
  "strawberry": "Strawberry",
  "hazelnut-piemont": "Hazelnut Piemont",
  "pineapple": "Pineapple",
  "oreo": "Oreo",
  "raspberry": "Raspberry",
  "peanut-chocolate": "Peanut & Chocolate",
  "doce-de-leite": "Doce de Leite",
  "watermelon": "Watermelon",
  "lemon": "Lemon",
  "madeira-banana": "Madeira Banana",
  "salted-caramel": "Salted Caramel",
  "belgian-chocolate": "Belgian Chocolate",
  "algarve-orange": "Algarve Orange",
  "baunilha-bourbon-madagascar": "Madagascan Bourbon Vanilla",
  "cinnamon": "Cinnamon",
  "coconut": "Coconut",
  "coffee": "Coffee",
  "belgian-chocolate-algarve-orange": "Belgian Chocolate with Algarve Orange",
  "melon": "Melon",
};

const CREATION_NAMES: Record<string, string> = {
  "pastel-de-nata": "Pastel de Nata",
  "morango-natas": "Strawberry & Cream Swirl",
  "carrot-cake": "Carrot Cake",
  "madagascan-vanilla": "Madagascan Vanilla with Damson Swirl",
  "natas-toffee-pinhoes": "Cream with Toffee & Caramelised Pine Nuts",
};

function moveInArray<T>(arr: T[], index: number, direction: "up" | "down"): T[] {
  const next = [...arr];
  const swap = direction === "up" ? index - 1 : index + 1;
  if (swap < 0 || swap >= next.length) return next;
  [next[index], next[swap]] = [next[swap], next[index]];
  return next;
}

interface SortRowProps {
  id: string;
  image: string;
  alt: string;
  name: string;
  index: number;
  total: number;
  onMove: (index: number, direction: "up" | "down") => void;
}

function SortRow({ id, image, alt, name, index, total, onMove }: SortRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] px-3 py-3"
    >
      {/* Drag handle */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
        className="flex h-10 w-8 cursor-grab items-center justify-center rounded-md text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-background-primary)] active:cursor-grabbing"
      >
        <GripVertical size={18} strokeWidth={1.75} />
      </button>

      <span className="w-5 text-center text-sm font-medium text-[var(--color-text-secondary)]">
        {index + 1}
      </span>

      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg sm:h-16 sm:w-16">
        {image ? (
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 640px) 80px, 64px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[var(--color-background-primary)] text-xs text-[var(--color-text-secondary)]">
            No photo
          </div>
        )}
      </div>

      <span className="flex-1 text-sm font-medium leading-snug">{name}</span>

      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={() => onMove(index, "up")}
          disabled={index === 0}
          aria-label="Move up"
          className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-[var(--color-background-primary)] disabled:opacity-25"
        >
          <ChevronUp size={20} strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={() => onMove(index, "down")}
          disabled={index === total - 1}
          aria-label="Move down"
          className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-[var(--color-background-primary)] disabled:opacity-25"
        >
          <ChevronDown size={20} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

interface SortableSectionProps<T extends { id?: string; key?: string }> {
  items: T[];
  getId: (item: T) => string;
  getImage: (item: T) => string;
  getAlt: (item: T) => string;
  getName: (item: T) => string;
  onReorder: (items: T[]) => void;
  onMove: (index: number, direction: "up" | "down") => void;
}

function SortableSection<T extends { id?: string; key?: string }>({
  items,
  getId,
  getImage,
  getAlt,
  getName,
  onReorder,
  onMove,
}: SortableSectionProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((item) => getId(item) === active.id);
    const newIndex = items.findIndex((item) => getId(item) === over.id);
    onReorder(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(getId)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2">
          {items.map((item, i) => (
            <SortRow
              key={getId(item)}
              id={getId(item)}
              image={getImage(item)}
              alt={getAlt(item)}
              name={getName(item)}
              index={i}
              total={items.length}
              onMove={onMove}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

interface Props {
  flavors: Flavor[];
  creations: Creation[];
}

export default function FlavorSorterClient({ flavors: initialFlavors, creations: initialCreations }: Props) {
  const [flavors, setFlavors] = useState(initialFlavors);
  const [creations, setCreations] = useState(initialCreations);

  const handleFlavorMove = (index: number, direction: "up" | "down") => {
    setFlavors((prev) => moveInArray(prev, index, direction));
  };

  const handleCreationMove = (index: number, direction: "up" | "down") => {
    setCreations((prev) => moveInArray(prev, index, direction));
  };

  const handleSend = () => {
    const flavorLines = flavors
      .map((f, i) => `${i + 1}. ${FLAVOR_NAMES[f.id] ?? f.id}`)
      .join("\n");
    const creationLines = creations
      .map((c, i) => `${i + 1}. ${CREATION_NAMES[c.key] ?? c.key}`)
      .join("\n");

    const text = `[Staple Flavours]\n${flavorLines}\n\n[Creations]\n${creationLines}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/393402362566?text=${encoded}`, "_blank");
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <h1 className="mb-2 font-heading text-3xl font-bold">Flavor Sorter</h1>
      <p className="mb-10 text-sm text-[var(--color-text-secondary)]">
        Drag the <GripVertical className="inline-block" size={14} /> handle or use the arrows to reorder. Then send the order to Patrick.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold">Order: Staple Flavours</h2>
        <SortableSection
          items={flavors}
          getId={(f) => f.id}
          getImage={(f) => f.image}
          getAlt={(f) => f.imageAlt}
          getName={(f) => FLAVOR_NAMES[f.id] ?? f.id}
          onReorder={setFlavors}
          onMove={handleFlavorMove}
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold">Order: Our Creations</h2>
        <SortableSection
          items={creations}
          getId={(c) => c.key!}
          getImage={(c) => c.image}
          getAlt={(c) => c.key!}
          getName={(c) => CREATION_NAMES[c.key!] ?? c.key!}
          onReorder={setCreations}
          onMove={handleCreationMove}
        />
      </section>

      <button
        type="button"
        onClick={handleSend}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-green px-6 py-4 text-base font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
      >
        <Send size={18} strokeWidth={2} />
        Send Order to Patrick
      </button>
    </div>
  );
}
