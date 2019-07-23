const express = require('express');
const router = express.Router();

const deviceManager = require('../services/device-manager');
const dataFetcher = require('../services/data-fetcher');
const dataBroadcaster = require('../services/data-broadcaster');
const dataLogger = require('../services/data-logger.js');

router.ws('/', function (ws, req) {
  let error = err => {
    err && console.log('Error in ws.js', err);
  };

  ws.on('error', error);
  
  ws.on('message', msg => {

    let message = JSON.parse(msg);

    if (ws.readyState !== ws.OPEN) {
      error('not open');
      return;
    }

    // Latest data is always pushed out to clients, but clients can also request cached data at any time.
    if (message.requestType === 'getCachedData') {
      let deviceId = message.deviceId;
      let cachedData = dataFetcher.getCachedData(deviceId);

      ws.send(dataBroadcaster.generatePayload('realtimeUsage', deviceId, cachedData.realtimeUsage), error);
      ws.send(dataBroadcaster.generatePayload('dailyUsage', deviceId, cachedData.dailyUsage), error);
      ws.send(dataBroadcaster.generatePayload('monthlyUsage', deviceId, cachedData.monthlyUsage), error);
      ws.send(dataBroadcaster.generatePayload('powerState', deviceId, cachedData.powerState), error);
      dataLogger.getLogEntriesForDevice(deviceId, (loggedData) => {
        ws.send(dataBroadcaster.generatePayload('loggedData', deviceId, loggedData), error);
      });

    } else if (message.requestType === 'togglePowerState') {
      let deviceId = message.deviceId;
      let device = deviceManager.getDevice(deviceId);
      if (device !== undefined) {
        device.togglePowerState().then(result => {
          ws.send(dataBroadcaster.generatePayload('powerState', deviceId, {
            isOn: result,
            uptime: 0
          }), error);
        });
      }
    }
  });
});

module.exports = router;
