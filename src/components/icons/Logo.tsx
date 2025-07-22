import { Cog } from 'lucide-react';
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2" aria-label="Anointed Multilinks LTD">
      <Cog className="h-8 w-8 text-primary" />
      <span className="font-bold text-xl font-headline tracking-tight">
        Anointed Multilinks
      </span>
    </div>
  );
}
