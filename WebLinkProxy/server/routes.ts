import type { Express } from "express";
import { createServer, type Server } from "http";
import fetch from "node-fetch";
import { URL } from "url";

export async function registerRoutes(app: Express): Promise<Server> {
  // Proxy route to handle external requests
  app.get("/api/proxy", async (req, res) => {
    try {
      const targetUrl = req.query.url as string;
      
      if (!targetUrl) {
        return res.status(400).json({ message: "URL parameter is required" });
      }
      
      // Validate URL
      try {
        new URL(targetUrl);
      } catch (err) {
        return res.status(400).json({ message: "Invalid URL format" });
      }

      const response = await fetch(targetUrl);
      
      if (!response.ok) {
        return res.status(response.status).json({ 
          message: `Failed to fetch content: ${response.statusText}` 
        });
      }

      // Get content type to determine how to handle the response
      const contentType = response.headers.get("content-type") || "";
      
      // Set the appropriate content type for the response
      res.setHeader("Content-Type", contentType);
      
      // Add CORS headers to allow the content to be displayed in an iframe
      res.setHeader("Access-Control-Allow-Origin", "*");
      
      // Pass through the response from the target URL
      response.body.pipe(res);
      
    } catch (error) {
      console.error("Proxy error:", error);
      res.status(500).json({ 
        message: "Error fetching the requested URL", 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}
