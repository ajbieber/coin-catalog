/**
 * @module app.models.coin
 *
 * @author Austin Bieber
 *
 * @description Defines the coin database model.
 */

// NPM Modules
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Internal Modules
const validate = require('../lib/validate');


const CoinSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: uuidv4,
    validate: validate.Coin._id
  },
  country: {
    type: String,
    required: true,
    index: true
  },
  denomType: {
    type: String,
    index: true,
    required: true
  },
  denomAmount: {
    type: Number,
    required: true,
    validate: validate.Coin.denomAmount
  },
  year: {
    type: Number,
    required: true
  },
  composition: {
    type: [String],
    index: true
  },
  dateAcquired: {
    type: Date
  },
  purchasePrice: {
    type: Number
  },
  dateSold: {
    type: Date
  },
  sellingPrice: {
    type: Date
  },
  value: {
    type: Number
  },
  grade: {
    type: Number,
    index: true,
    validate: validate.Coin.grade
  },
  grader: {
    type: String,
    validate: validate.Coin.grader
  },
  tags: {
    type: [String]
  },
  proof: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String
  },
  user: {
    type: String,
    ref: 'User',
    required: true,
    index: true
  },
  collections: {
    type: [String],
    ref: 'Collection',
    required: true,
    index: true
  }
});

module.exports = mongoose.model('Coin', CoinSchema);