import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X, AlertCircle, ArrowRight } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL including http:// or https://"),
});

type ProxyFormProps = {
  url: string;
  setUrl: (url: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
};

export default function ProxyForm({ 
  url, 
  setUrl, 
  isLoading, 
  setIsLoading, 
  error, 
  setError 
}: ProxyFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: url || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    
    try {
      setUrl(values.url);
      // We don't need to do anything else here as the ProxyViewer
      // will use the URL value to load the iframe
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
      toast({
        title: "Error",
        description: "Failed to load the requested URL",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Enter a URL to access via proxy
                  </FormLabel>
                  <div className="flex">
                    <FormControl>
                      <Input
                        placeholder="https://example.com"
                        className="flex-grow rounded-r-none border-r-0 focus:ring-2 focus:ring-primary focus:border-primary"
                        {...field}
                      />
                    </FormControl>
                    <Button 
                      type="submit" 
                      className="bg-primary hover:bg-blue-600 text-white rounded-l-none"
                      disabled={isLoading}
                    >
                      <ArrowRight className="mr-1 h-4 w-4" /> Go
                    </Button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Enter the full URL including http:// or https://
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1"
            onClick={() => setError(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </Alert>
      )}

      {isLoading && (
        <div className="mb-6">
          <div className="h-1 w-full relative overflow-hidden bg-gray-200 rounded">
            <div className="h-1 bg-primary animate-[loading_2s_linear_infinite]"></div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">Loading content...</p>
        </div>
      )}
    </>
  );
}
