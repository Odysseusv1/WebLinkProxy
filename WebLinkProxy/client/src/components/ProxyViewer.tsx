import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Globe } from "lucide-react";

type ProxyViewerProps = {
  url: string;
  isLoading: boolean;
  error: string | null;
};

export default function ProxyViewer({ url, isLoading, error }: ProxyViewerProps) {
  const [iframeKey, setIframeKey] = useState(0);

  // Reset iframe when URL changes to force reload
  useEffect(() => {
    setIframeKey(prev => prev + 1);
  }, [url]);

  return (
    <Card className="bg-white rounded-lg shadow-sm overflow-hidden">
      {!url && !isLoading && !error ? (
        <div className="py-12 flex flex-col items-center justify-center text-center px-4">
          <div className="bg-gray-100 rounded-full p-4 mb-4">
            <Globe className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-lg font-medium text-gray-900 mb-2">No website loaded</h2>
          <p className="text-gray-500 max-w-md">
            Enter a URL above to browse websites through our secure proxy.
          </p>
        </div>
      ) : (
        url && !isLoading && !error && (
          <iframe
            key={iframeKey}
            src={`/api/proxy?url=${encodeURIComponent(url)}`}
            className="w-full h-[calc(100vh-16rem)] border-0 rounded-lg"
            title="Proxied website content"
            sandbox="allow-same-origin allow-scripts"
          />
        )
      )}
    </Card>
  );
}
