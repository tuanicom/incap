import mongoose from 'mongoose';

// Clear any previously registered models to avoid OverwriteModelError during tests
const modelNames = mongoose.modelNames();
for (const name of modelNames) {
    try {
        if ((mongoose as any).deleteModel) {
            (mongoose as any).deleteModel(name);
        } else {
            delete (mongoose as any).models[name];
        }
    } catch (err) {
    // ignore
    }
}
