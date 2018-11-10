const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema(
    {
        name: {type: String},
        code: {type: String, require: true},
        members: [{type: Schema.Types.ObjectId, ref: 'users'}]
    },
    {timestamps: {createdAt: "createdAt"}}
);

module.exports = mongoose.model("groups", groupSchema);