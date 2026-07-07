import type { ReactNode } from "react";

export function MainLayout({
  builder,
  review,
}: {
  builder: ReactNode;
  review: ReactNode;
}) {
  return (
    <div className="max-w-360 mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_399px] gap-7.5 items-start">
        <div className="w-full">{builder}</div>
        <div className="w-full">{review}</div>
      </div>
    </div>
  );
}
