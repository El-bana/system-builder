import { Suspense } from "react";
import { MainLayout } from "./components/layout/MainLayout";
import { ToastProvider } from "./components/ui/Toast";
import { ReviewPanel } from "./features/builder/components/ReviewPanel";
import { SystemBuilder } from "./features/builder/components/SystemBuilder";

function App() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-blue-50">
          <p className="text-gray-500 font-medium">Loading builder data...</p>
        </div>
      }
    >
      <ToastProvider>
        <MainLayout builder={<SystemBuilder />} review={<ReviewPanel />} />
      </ToastProvider>
    </Suspense>
  );
}

export default App;
