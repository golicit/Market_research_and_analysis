const mongoose = require('mongoose');

const CoursesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }, // in paise as integer
    originalPrice: { type: Number, default: null },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Update updatedAt before saving
CoursesSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Courses = mongoose.model('Courses', CoursesSchema);
module.exports = Courses;