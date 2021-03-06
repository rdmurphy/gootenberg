"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function (config) {
  let credentials;

  if (typeof config === 'string') {
    credentials = await (0, _fsExtra.readJSON)(config);
  } else if (typeof config === 'object') {
    credentials = config;
  }

  this.client = new _googleAuthLibrary.JWT({
    email: credentials['client_email'],
    key: credentials['private_key'],
    scopes: ['https://www.googleapis.com/auth/drive']
  });
  await this.client.authorize();
  return this;
};

var _fsExtra = require("fs-extra");

var _googleAuthLibrary = require("google-auth-library");

;