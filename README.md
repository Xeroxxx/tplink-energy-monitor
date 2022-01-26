# :warning:	:bangbang::bangbang:	Project archived/discontinued :bangbang::bangbang: :warning:	

There are enough alternatives to monitor TP-Link HS110 or TP-Link Kasa devices with smart home software like Home Assistant, ioBroker or OpenHAB with full functionality like power measurement, cumulative measurement and switching. So we decided to discontinue the project from our side as there is no reason to run a standalone application anymore.

Feel free to fork and continue the project while honoring the license.

# Supported tags for Docker Images

[latest, latest-arm32v6, latest-arm32v7, latest-arm64v8](https://hub.docker.com/r/xeroxxx/tplink-energy-monitor/tags) || [Branch - Master](https://github.com/xeroxxx/tplink-energy-monitor/tree/master)

[dev, dev-arm32v6, dev-arm32v7, dev-arm64v8](https://hub.docker.com/r/xeroxxx/tplink-energy-monitor/tags) || [Branch - Dev](https://github.com/Xeroxxx/tplink-energy-monitor/tree/dev)

# TPLink Energy Monitor
[![Build Status](https://travis-ci.org/Xeroxxx/tplink-energy-monitor.svg?branch=master)](https://travis-ci.org/xeroxxx/tplink-energy-monitor)

A web based monitoring dashboard displaying energy usage data and statistics for TP-Link HS110 smart plugs.

Written in Node.js + Express, and fully responsive so works well on mobile devices.

<p align="center">
  <img alt="Screenshot" src="https://i.imgur.com/cNqXYU4.png" height="521" width="960">
</p>

# Development

Originally programmed by James Barnett - https://github.com/jamesbarnett91/tplink-energy-monitor

Current development by Xeroxxx, nbyx, SebastianSiebert

# Features
- Automatically scans for TP-Link smart plug devices on your local network on server start.
- Realtime current, voltage, power readings.
- Recent power usage trend chart.
- Configurable power usage history logger.
- Plug on/off state and uptime.
- Toggle on/off state
- Daily & monthly energy usage totals and averages.
- Historical daily and monthly energy usage charts.

# Setup
You can use any of the following methods to get the project running:

### Packaged executable
The easiest way to run the project is to download one of the packaged executables from the [releases page](https://github.com/jamesbarnett91/tplink-monitor/releases). These are zip files containing a single executable file and some config. Just download the relevant file for your OS (Windows, Linux and MacOS available), extract the zip somewhere and double click executable. Then go to `localhost:3000` in your browser to access the dashboard.

### Docker
Alternatively, you can pull the `xeroxxx/tplink-energy-monitor` image and run that.
Note that because the server needs access to your local network to scan for TP-Link devices, you must run the image using [host networking](https://docs.docker.com/network/host/) e.g.:
```
$ docker run -d --network host xeroxxx/tplink-energy-monitor
```
### Docker Persistant Data
```
$ docker run -d --network host -v <localfolder>:/opt/tplink-monitor/data xeroxxx/tplink-energy-monitor
```


### Node + NPM

To run directly via NPM:
```sh
$ git clone https://github.com/xeroxxx/tplink-energy-monitor && cd tplink-energy-monitor
$ npm install
$ npm start
```

# Logging
By default this app will log the current power usage of each plug every minute, and store 24 hours worth of entries (removing the older entries as new ones are added) to files in the root project directory. This log interval, max retention limit and log directory are configurable in the `logger-config.json` file in the root project directory.
```
{
  // Directory path specifying where log files should be stored. It will be created if it doesn't already exist.
  "logDirPath": "/opt/tplink-monitor/data",

  // The number of seconds between each log entry
  "logIntervalSeconds": 60,

  // The maximum number of log entries to store
  "maxLogEntries": 1440 // 24hrs at 1 log/min
}
```

You can also specify the path to a custom logger config file as a command line argument, and the application will load that config rather than the default one in the project root e.g.
```
npm start /home/username/tplink-logger-config.json
```

The logged data is shown on the 'Logged Usage' graph on the dashboard.
Logs are written in JSON format, with the filename `<plug-id>-log.json` e.g. `8FCA808B79-log.json`. Each file contains all the log entries for that plug, up to the maximum configured number, at which point it will remove the oldest entry when adding a new one.

If you are running the app from the Docker image and you want to change the logger config, you can mount your desired config file into `/opt/tplink-monitor/`. The logs can be accessed in the same way.

Each logfile is a JSON array of entries. Each entry contains a timestamp in unix/epoch format `ts`, and a power reading in watts `pw`.

If you want to analyse the log files in Excel or similar office tools you can convert the JSON file into csv format. This can be done numerous ways including online converters such as [konklone.io/json](https://konklone.io/json/), or if you are on a Unix system (or otherwise have access to `sed`) user [ballachango](https://github.com/jamesbarnett91/tplink-energy-monitor/issues/6#issuecomment-433663873) has posted this sed command `sed -e 's/},{/\\\n/g' -e 's/[]["tspw:}{\\]//g' <input.json> > log.csv`

# Note
Because the server needs access to your local network to scan for TP-Link device, you must run the server on the same network which your TP Link plugs are connected to. For the vast majority of people this shouldn't be an issue, and you can still use different network interfaces (i.e. plug(s) on WiFi and server on ethernet) as long as they all connect to the same network.

A note for Windows users: There seems to be an issue with the UDP broadcast the server performs to scan for devices which occurs when you also have VirtualBox installed on your Windows machine. I think this is because the response from the plug is routed to the VirtualBox Host-Only network adapter, rather than your primary network interface (for some reason).

If you hit this issue you can try disabling the VirtualBox adapter in `Control Panel > Network and Internet > Network Connections` and see if that solves the problem.

# TODOs
- [x] Show historical data (Done)
- [x] Build dists (Done)
- [x] Docker image (Done)
- [x] Support switching between multiple plugs (Done)
- [x] Switch to websockets (Done)
- [x] Configurable realtime usage logging (Done)
- [x] Toggle on/off state (Done)
- [x] Show cumulative energy usage (day/month/year) on device (Done)
- [ ] Show cumulative energy usage form all devices
- [ ] Rescan for devices on the fly (Restart Container for now)
- [ ] Add daily cost metrics
