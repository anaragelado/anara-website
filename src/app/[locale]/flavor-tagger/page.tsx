import { setRequestLocale } from "next-intl/server";
import TaggerClient, { FlavorItem } from "@/components/flavor-tagger/TaggerClient";

export default async function FlavorTaggerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Vision capabilities mapping
  const initialFlavors: FlavorItem[] = [
    { filename: 'IMG_20260412_104357.jpg', suggestion: 'Oreo', status: 'pending', finalName: '' },
    { filename: 'IMG_20260412_104438.jpg', suggestion: 'Oreo', status: 'pending', finalName: '' },
    { filename: 'IMG_20260412_104958.jpg', suggestion: 'Morango', status: 'pending', finalName: '' },
    { filename: 'IMG_20260412_105412.jpg', suggestion: 'Natas', status: 'pending', finalName: '' },
    { filename: 'IMG_20260412_105903.jpg', suggestion: 'Baunilha Madagascar', status: 'pending', finalName: '' },
    { filename: 'IMG_20260412_110253.jpg', suggestion: 'Baunilha Madagascar', status: 'pending', finalName: '' },
    { filename: 'IMG_20260412_110611.jpg', suggestion: 'Limão', status: 'pending', finalName: '' },
    { filename: 'IMG_20260412_110819.jpg', suggestion: 'Coco', status: 'pending', finalName: '' },
    { filename: 'IMG_20260412_111222.jpg', suggestion: 'Banana da Madeira', status: 'pending', finalName: '' },
    { filename: 'IMG_20260412_111608.jpg', suggestion: 'Ananás', status: 'pending', finalName: '' },
    { filename: 'IMG_20260412_111949.jpg', suggestion: 'Doce de Leite Argentino', status: 'pending', finalName: '' },
    { filename: 'IMG_20260412_112757.jpg', suggestion: 'Meloa', status: 'pending', finalName: '' },
    { filename: 'IMG_20260412_113342.jpg', suggestion: 'Avelã Piedmont', status: 'pending', finalName: '' },
    { filename: 'IMG_20260412_113759.jpg', suggestion: 'Manga', status: 'pending', finalName: '' },
    { filename: 'IMG_20260412_114011.jpg', suggestion: 'Laranja do Algarve', status: 'pending', finalName: '' },
    { filename: 'IMG_20260412_184152.jpg', suggestion: 'Canela', status: 'pending', finalName: '' },
    { filename: 'IMG_20260412_184243.jpg', suggestion: '', status: 'pending', finalName: '' },
    { filename: 'IMG_20260412_184545.jpg', suggestion: '', status: 'pending', finalName: '' },
    { filename: 'IMG_20260412_185103.jpg', suggestion: '', status: 'pending', finalName: '' },
    { filename: 'IMG_20260412_185151.jpg', suggestion: '', status: 'pending', finalName: '' },
    { filename: 'IMG_20260413_113933.jpg', suggestion: 'Chocolate Belga', status: 'pending', finalName: '' },
    { filename: 'IMG_20260413_173533.jpg', suggestion: 'Chocolate Belga', status: 'pending', finalName: '' },
    { filename: 'IMG_20260413_173902.jpg', suggestion: 'Chocolate Belga c/ Laranja', status: 'pending', finalName: '' },
    { filename: 'IMG_20260413_174437.jpg', suggestion: 'Chocolate Belga', status: 'pending', finalName: '' },
    { filename: 'IMG_20260413_175926.jpg', suggestion: 'Café', status: 'pending', finalName: '' },
    { filename: 'IMG_20260413_180559.jpg', suggestion: 'Melancia', status: 'pending', finalName: '' },
    { filename: 'IMG_20260413_180852.jpg', suggestion: 'Melancia', status: 'pending', finalName: '' },
    { filename: 'IMG_20260413_181154.jpg', suggestion: 'Morango', status: 'pending', finalName: '' },
    { filename: 'IMG_20260413_181533.jpg', suggestion: '', status: 'pending', finalName: '' },
    { filename: 'IMG_20260414_125252.jpg', suggestion: '', status: 'pending', finalName: '' },
    { filename: 'IMG_20260414_125457.jpg', suggestion: '', status: 'pending', finalName: '' },
    { filename: 'IMG_20260414_130038.jpg', suggestion: 'Caramelo salgado', status: 'pending', finalName: '' }
  ];

  return (
    <main className="w-full bg-[var(--color-background-primary)]">
      <TaggerClient initialFlavors={initialFlavors} />
    </main>
  );
}
