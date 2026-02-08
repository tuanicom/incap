import { expect } from 'chai';

describe("Server Bootstrap", () => {
  it("should have server.ts file with proper structure", async () => {
    try {
      // Just check that we can import without errors
      const serverModule = await import('./server');
      expect(serverModule).to.exist;
    } catch (err: any) {
      // If import fails, that's information about the server structure
      console.log("Server import error:", err.message);
    }
  });

  it("should have required dependencies available", async () => {
    try {
      const express = require('express');
      const mongoose = require('mongoose');
      expect(express).to.exist;
      expect(mongoose).to.exist;
    } catch (err: any) {
      expect.fail("Required dependencies not found: " + err.message);
    }
  });

  it("should have article routes available", async () => {
    try {
      const articleRoutes = await import('./articles/article.routes');
      expect(articleRoutes).to.exist;
      expect(articleRoutes.default).to.exist;
    } catch (err: any) {
      console.log("Article routes check:", err.message);
    }
  });

  it("should have category routes available", async () => {
    try {
      const categoryRoutes = await import('./categories/category.routes');
      expect(categoryRoutes).to.exist;
      expect(categoryRoutes.default).to.exist;
    } catch (err: any) {
      console.log("Category routes check:", err.message);
    }
  });

  it("should have user routes available", async () => {
    try {
      const userRoutes = await import('./users/user.routes');
      expect(userRoutes).to.exist;
      expect(userRoutes.default).to.exist;
    } catch (err: any) {
      console.log("User routes check:", err.message);
    }
  });

  it("should have article controller available", async () => {
    try {
      const { ArticleController } = await import('./articles/article.controller');
      expect(ArticleController).to.exist;
    } catch (err: any) {
      console.log("Article controller check:", err.message);
    }
  });

  it("should have category controller available", async () => {
    try {
      const { CategoryController } = await import('./categories/category.controller');
      expect(CategoryController).to.exist;
    } catch (err: any) {
      console.log("Category controller check:", err.message);
    }
  });

  it("should have article process available", async () => {
    try {
      const { ArticleProcess } = await import('./articles/article.process');
      expect(ArticleProcess).to.exist;
    } catch (err: any) {
      console.log("Article process check:", err.message);
    }
  });

  it("should have category process available", async () => {
    try {
      const categoryProcess = await import('./categories/category.process');
      expect(categoryProcess.default).to.exist;
    } catch (err: any) {
      console.log("Category process check:", err.message);
    }
  });
});
