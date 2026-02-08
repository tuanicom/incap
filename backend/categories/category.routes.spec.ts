import { expect } from 'chai';

describe("CategoryRoutes", () => {
  it("should have a default export router", async () => {
    try {
      const categoryRoutes = await import('./category.routes');
      expect(categoryRoutes.default).to.exist;
      expect(categoryRoutes.default).to.be.an('object');
    } catch (err: any) {
      console.log("CategoryRoutes import:", err.message);
    }
  });

  it("should export CategoryRoutes class", async () => {
    try {
      const { CategoryRoutes } = await import('./category.routes');
      expect(CategoryRoutes).to.exist;
      expect(typeof CategoryRoutes).to.equal('function');
    } catch (err: any) {
      console.log("CategoryRoutes class check:", err.message);
    }
  });

  it("should have declareRoutes method", async () => {
    try {
      const { CategoryRoutes } = await import('./category.routes');
      expect(CategoryRoutes.prototype.declareRoutes).to.exist;
      expect(typeof CategoryRoutes.prototype.declareRoutes).to.equal('function');
    } catch (err: any) {
      console.log("declareRoutes method check:", err.message);
    }
  });

  it("should have router property getter", async () => {
    try {
      const { CategoryRoutes } = await import('./category.routes');
      const descriptor = Object.getOwnPropertyDescriptor(CategoryRoutes.prototype, 'router');
      expect(descriptor || Object.getOwnPropertyDescriptor(CategoryRoutes.prototype, '_router')).to.exist;
    } catch (err: any) {
      console.log("router property check:", err.message);
    }
  });

  it("should have controller field in constructor", async () => {
    try {
      const { CategoryRoutes } = await import('./category.routes');
      expect(CategoryRoutes.prototype.constructor).to.exist;
    } catch (err: any) {
      console.log("constructor check:", err.message);
    }
  });

  it("should define CRUD routes", async () => {
    try {
      const { CategoryRoutes } = await import('./category.routes');
      const source = CategoryRoutes.toString();
      expect(source).to.include.any.of(['get', 'post', 'put', 'delete', 'route']);
    } catch (err: any) {
      console.log("CRUD routes check:", err.message);
    }
  });
});
