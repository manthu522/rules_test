var mongoose = require('mongoose'),
    Schema    = mongoose.Schema;

var Rule = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  title: {
    type: String
  },
  description: String,
  dateCreated: {
    type: Date,
    default: new Date()
  },
  provisioning: {},
  newProvisions: [],
  schedule: {
    startTime: {
      type: Date,
      default: new Date()
    },
    endTime:{
      type: Date,
      default: new Date()
    },
    weekly: {
      type: Boolean,
      default: true
    },
    ran: {
      type: Boolean,
      default: false
    },
    days: {
      monday: {
        type: Boolean,
        default: true,
      },
      tuesday: {
        type: Boolean,
        default: true,
      },
      wednesday: {
        type: Boolean,
        default: true,
      },
      thursday: {
        type: Boolean,
        default: true,
      },
      friday: {
        type: Boolean,
        default: true,
      },
      saturday: {
        type: Boolean,
        default: true,
      },
      sunday: {
        type: Boolean,
        default: true,
      },
    }
  },
  enabled: Boolean
});

Rule.virtual('totalTime')
  .get(function () {
    'use strict';
    var tT = this.startTime - this.endTime;
    return {
      totalTime: tT
    };
  })
;

Rule.index({userId: 1, _id: 1});

module.exports = mongoose.model('Rule', Rule);
