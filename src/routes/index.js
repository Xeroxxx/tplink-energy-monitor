const express = require('express');
const router = express.Router();

const deviceManager = require('../services/device-manager');

router.get('/', function(req, res) {
  let devices = sortDevices(deviceManager.getAllDevices());
  res.render('home', {
    devices
  });
});

router.get('/settings', function(req, res) {
  res.render('settings', {
    deviceManager,
    devices: sortDevices(deviceManager.getAllDevices())
  });
});

router.get('/:deviceId', function(req, res) {
  let deviceId = req.params.deviceId;
  deviceId = deviceManager.getDevice(deviceId);

  if (deviceId) {
    res.render('device-view', {
      device: deviceId,
      devices: sortDevices(deviceManager.getAllDevices())
    });
  } else {
    res.redirect('/');
  }
});


function sortDevices(devices) {
  return devices.slice().sort((a, b) => {
    return a.alias.toLowerCase().localeCompare(b.alias.toLowerCase())
  })
}

module.exports = router;
