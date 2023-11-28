const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: { type: String, required: true },
    tag: { type: String, required: true },
  },
  {
    versionKey: false,
  },
  {
    timestamps: true,
  }
);

const NoteModel = mongoose.model("note", noteSchema);

module.exports = {
  NoteModel,
};
