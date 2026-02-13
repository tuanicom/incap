import { expect } from 'chai';
import sinon from "sinon";

describe("UserController", () => {
  let controller: any;
  let processMock: any;
  const id = "123";

  beforeEach(async () => {
    // Create a minimal mock process object
    processMock = {
      getAll: sinon.stub().resolves([]),
      getById: sinon.stub().resolves({}),
      save: sinon.stub().resolves({}),
      delete: sinon.stub().resolves({})
    };

    // Now import and create controller with mock
    const { UserController } = await import('./user.controller');
    controller = new UserController(processMock);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("getAll()", () => {
    it("should get the list from process", async () => {
      processMock.getAll.resolves([]);
      await controller.getAll();
      expect(processMock.getAll.calledOnce).to.be.true;
    });

    it("should return results from process.getAll()", async () => {
      const users = [
        { _id: "1", name: "John Doe" },
        { _id: "2", name: "Jane Smith" }
      ];
      processMock.getAll.resolves(users);
      const result = await controller.getAll();
      expect(result).to.deep.equal(users);
      expect(result.length).to.equal(2);
    });

    it("should return empty array when no users exist", async () => {
      processMock.getAll.resolves([]);
      const result = await controller.getAll();
      expect(result).to.be.an('array');
      expect(result.length).to.equal(0);
    });

    it("should handle multiple users", async () => {
      const users = [
        { _id: "1", name: "User 1" },
        { _id: "2", name: "User 2" },
        { _id: "3", name: "User 3" }
      ];
      processMock.getAll.resolves(users);
      const result = await controller.getAll();
      expect(result.length).to.equal(3);
    });
  });

  describe(`getById("${id}")`, () => {
    it(`should get the item with id "${id}" from process`, async () => {
      processMock.getById.resolves({} as any);
      await controller.getById(id);
      expect(processMock.getById.calledWith(id)).to.be.true;
    });

    it(`should return user with id "${id}"`, async () => {
      const user = { _id: id, name: "John Doe" };
      processMock.getById.resolves(user);
      const result = await controller.getById(id);
      expect(result._id).to.equal(id);
      expect(result.name).to.equal("John Doe");
    });

    it("should handle user not found", async () => {
      processMock.getById.resolves(null);
      const result = await controller.getById("nonexistent");
      expect(result).to.be.null;
    });

    it("should call process.getById with correct parameter", async () => {
      processMock.getById.resolves({});
      await controller.getById("abc123");
      expect(processMock.getById.firstCall.args[0]).to.equal("abc123");
    });
  });

  describe("add()", () => {
    const input = { name: "New User" };

    it("should call the save function of the process", async () => {
      processMock.save.resolves({} as any);
      await controller.add(input);
      expect(processMock.save.calledOnce).to.be.true;
    });

    it("should pass input to process.save()", async () => {
      processMock.save.resolves({ _id: "new", ...input });
      await controller.add(input);
      expect(processMock.save.firstCall.args[0]).to.exist;
    });

    it("should return saved user", async () => {
      const saved = { _id: "123", ...input };
      processMock.save.resolves(saved);
      const result = await controller.add(input);
      expect(result._id).to.equal("123");
      expect(result.name).to.equal("New User");
    });

    it("should handle adding user with complex data", async () => {
      const complexInput = { name: "Complex User Name" };
      processMock.save.resolves({ _id: "1", ...complexInput });
      const result = await controller.add(complexInput);
      expect(result.name).to.equal("Complex User Name");
    });

    it("should call save with a modelinstance", async () => {
      processMock.save.resolves({ _id: "1", name: "Test" });
      await controller.add(input);
      expect(processMock.save.called).to.be.true;
    });
  });

  describe("update()", () => {
    const user = { _id: id, name: "Original" };
    const input = { _id: id, name: "Updated" };

    it(`should call the getById function of the process with "${id}"`, async () => {
      processMock.getById.resolves(user as any);
      processMock.save.resolves(user as any);
      await controller.update(input);
      expect(processMock.getById.calledWith(id)).to.be.true;
    });

    it("should call the save function of the process", async () => {
      processMock.getById.resolves(user as any);
      processMock.save.resolves(user as any);
      await controller.update(input);
      expect(processMock.save.calledOnce).to.be.true;
    });

    it("should update user name field", async () => {
      const original = { _id: id, name: "Old Name" };
      const updates = { _id: id, name: "New Name" };
      processMock.getById.resolves(original);
      processMock.save.resolves(updates);

      await controller.update(updates);
      expect(original.name).to.equal("New Name");
      expect(processMock.save.calledOnce).to.be.true;
    });

    it("should handle updating with same value", async () => {
      const user = { _id: id, name: "Same" };
      const input = { _id: id, name: "Same" };
      processMock.getById.resolves({ ...user });
      processMock.save.resolves(user);

      await controller.update(input);
      expect(processMock.save.called).to.be.true;
    });

    it("should return the updated user", async () => {
      const updated = { _id: id, name: "Updated User" };
      processMock.getById.resolves({ _id: id, name: "Old" });
      processMock.save.resolves(updated);

      const result = await controller.update({ _id: id, name: "Updated User" });
      expect(result._id).to.equal(id);
    });
  });

  describe(`delete("${id}")`, () => {
    it(`should delete the item with id "${id}" in process`, async () => {
      processMock.delete.resolves({} as any);
      await controller.delete(id);
      expect(processMock.delete.calledWith(id)).to.be.true;
    });

    it("should return the deleted user", async () => {
      const deleted = { _id: id, name: "Deleted" };
      processMock.delete.resolves(deleted);
      const result = await controller.delete(id);
      expect(result._id).to.equal(id);
      expect(result.name).to.equal("Deleted");
    });

    it("should handle deletion of non-existent user", async () => {
      processMock.delete.resolves(null);
      const result = await controller.delete("nonexistent");
      expect(result).to.be.null;
    });

    it("should be callable multiple times", async () => {
      processMock.delete.resolves({ _id: "1" });
      await controller.delete("1");
      await controller.delete("2");
      expect(processMock.delete.callCount).to.equal(2);
    });

    it("should pass correct id to delete", async () => {
      processMock.delete.resolves({});
      await controller.delete("test-id-123");
      expect(processMock.delete.firstCall.args[0]).to.equal("test-id-123");
    });
  });
});
