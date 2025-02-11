import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { pinAuthSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  app.post("/api/validate-pin", async (req, res) => {
    try {
      const { pin } = pinAuthSchema.parse(req.body);
      const isValid = await storage.validatePin(pin);
      
      if (!isValid) {
        return res.status(401).json({ message: "Invalid PIN" });
      }

      res.json({ message: "PIN validated successfully" });
    } catch (error) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
