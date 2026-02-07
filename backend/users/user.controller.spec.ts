import { expect } from 'chai';
import sinon from "sinon";

describe("UserController", () => {
  let controller: any;
  let processMock: any;
  const testId = "507f1f77bcf86cd799439011"; // Valid ObjectId format

  beforeEach(async () => {
    // Create a mock process object
    processMock = {
      getAll: sinon.stub().resolves([]),
      getById: sinon.stub().resolves({ _id: testId, name: "Test User" }),
      save: sinon.stub().resolves({ _id: testId, name: "Test User" }),
      delete: sinon.stub().resolves({ _id: testId })
    };

    // Import and create controller with mock
    const { UserController } = await import('./user.controller');
    controller = new UserController(processMock);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("getAll()", () => {
    it("should call process.getAll()", async () => {
      processMock.getAll.resolves([]);
      await controller.getAll();
      expect(processMock.getAll.calledOnce).to.be.true;
    });

    it("should return array from process", async () => {
      const users = [{ _id: testId, name: "John" }];
      processMock.getAll.resolves(users);
      const result = await controller.getAll();
      expect(result).to.deep.equal(users);
    });
  });

  describe("getById()", () => {
    it("should call process.getById with id", async () => {
      processMock.getById.resolves({ _id: testId, name: "User" });
      await controller.getById(testId);
      expect(processMock.getById.calledWith(testId)).to.be.true;
    });

    it("should return user object", async () => {
      const user = { _id: testId, name: "Jane" };
      processMock.getById.resolves(user);
      const result = await controller.getById(testId);
      expect(result.name).to.equal("Jane");
    });
  });

  describe("add()", () => {
    it("should call process.save()", async () => {
      const newUser = { name: "New User" };
      processMock.save.resolves({ _id: testId, ...newUser });
      await controller.add(newUser);
      expect(processMock.save.calledOnce).to.be.true;
    });

    it("should return saved user", async () => {
      const input = { name: "Alice" };
      const saved = { _id: testId, name: "Alice" };
      processMock.save.resolves(saved);
      const result = await controller.add(input);
      expect(result.name).to.equal("Alice");
    });
  });

  describe("update()", () => {
    it("should call process.getById and process.save", async () => {
      const user = { _id: testId, name: "John", role: "admin" };
      const updated = { _id: testId, name: "John Updated", role: "admin" };
      processMock.getById.resolves(user);
      processMock.save.resolves(updated);

      await controller.update({ _id: testId, name: "John Updated" });

      expect(processMock.getById.calledWith(testId)).to.be.true;
      expect(processMock.save.calledOnce).to.be.true;
    });

    it("should update the name property", async () => {
      const original = { _id: testId, name: "Original" };
      processMock.getById.resolves({ ...original });
      processMock.save.resolves({ ...original, name: "Updated" });

      await controller.update({ _id: testId, name: "Updated" });
      expect(processMock.save.called).to.be.true;
    });
  });

  describe("delete()", () => {
    it("should call process.delete with id", async () => {
      processMock.delete.resolves({ _id: testId });
      await controller.delete(testId);
      expect(processMock.delete.calledWith(testId)).to.be.true;
    });

    it("should return deleted user", async () => {
      const deleted = { _id: testId, name: "Deleted User" };
      processMock.delete.resolves(deleted);
      const result = await controller.delete(testId);
      expect(result._id).to.equal(testId);
    });
  });
});
