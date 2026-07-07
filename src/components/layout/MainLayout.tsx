import type { ReactNode } from "react";

export function MainLayout({
  builder,
  review,
}: {
  builder: ReactNode;
  review: ReactNode;
}) {
  return (
    <div className="md:px-4">
      <div className="max-w-299 mx-auto lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_399px] lg:gap-7.25 items-start">
          <h2 className="text-3xl px-5.25 py-5 font-bold text-center block lg:hidden">
            Let’s get started!
          </h2>
          <div className="w-full">{builder}</div>
          <div className="w-full">{review}</div>
        </div>
      </div>
    </div>
  );
}
