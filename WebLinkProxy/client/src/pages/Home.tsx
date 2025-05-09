import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProxyForm from "@/components/ProxyForm";
import ProxyViewer from "@/components/ProxyViewer";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <ProxyForm 
            url={url} 
            setUrl={setUrl} 
            isLoading={isLoading} 
            setIsLoading={setIsLoading}
            error={error}
            setError={setError}
          />
          <ProxyViewer 
            url={url}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
