# Power Monitor Guide

Date: 8/15/2018  
Author: Drake Lambert

## Monitoring Computer Configuration

Install the Power Tool software and connect the Power Monitor to your monitoring computer. Note that Linux and Mac OS machines are not currently supported by the Power Tool software.

See [Power Monitor User Manual](http://msoon.github.io/powermonitor/PowerTool/doc/LVPM%20Manual.pdf) for Power Tool installation and Power Monitor setup instructions.

## Monitoring Power Consumption

This section assumes you have installed the Power Tool software and correctly connected the Power Monitor as per the user manual.

### For Battery Powered Devices

Devices with batteries cannot be reliably monitored for power consumption via their charging ports in most cases. This is due to the following reasons:

- The device may use the battery as a power buffer. This would mean that the measured power draw represents the power drawn to charge the battery only.
- The device likely charges the battery while plugged in. This would mean that even if the device can draw operating power from the charging port, there would be no way to distinguish between power drawn to charge the battery and power drawn to operate the device.

You may still use the following guide to monitor power consumption of a battery powered device.

### Get Device Power Requirements

The first step in monitoring the power consumption of any device is to learn its required power specifications. For example, the Raspberry Pi 2 Model B requires a 5 volt power supply with a recommended current capacity of 1.8 amps. Under-powering any device may result in operational errors, or in the worst case, damage the device or peripherals.

It is important to note that **the Power Monitor can only output 2.01 to 4.55 volts on its own.** By using an external power supply, you can achieve higher voltages. **Using a voltage of over 5.5 volts may damage the Power Monitor!**

### Connect Device to Power Monitor

Depending on how your device is made, it may connect to power via many different connectors or arrangement of pins. This guide focuses on using an external power supply that can connect to a male USB-A lead, and a device that can connect to a female USB-A lead. Provided with the Power Monitor should be a project box with 4 leads. Use the table below to connect the Power Monitor, power supply, and your device. **For safety, connect the components in the order of the table.**

| Lead              | Connection
| ---               | ---
| Male USB-A        | Your power supply
| Male BNC          | Female BNC on Power Monitor
| Male black banana | Female black banana on Power Monitor
| Female USB-A      | Your device

### Start Monitoring

1. Activate the Power Monitor via the large button.
    - A green LED indicates proper startup.
2. Open the Power Tool software.
    - If you are prompted to select a device:
        - Select the correct Power Monitor.
        - If you don't see the Power Monitor in the list, ensure you have installed and configured the software and drivers properly. See [Power Monitor User Manual](http://msoon.github.io/powermonitor/PowerTool/doc/LVPM%20Manual.pdf).
3. In bottom left, set "VOLTAGE SOURCE" to "Aux".
4. In bottom left, set "DISPLAYED CHANNELS" to "Aux".
5. In bottom left, set "DISPLAYED MEASUREMENTS" to the desired selections.
6. In top right, click "Vout Disable".
    - "Vout" may already be disabled. This is indicated in the top right.
7. In bottom right, click "RUN".

### While Monitoring

- You may need to adjust the graph scale, units, and offset in the bottom right.
- Depending on your monitoring computer's memory, you are limited to graphing power consumption for a certain time. This will not affect data files written to disk.

### Stop Monitoring

1. In the bottom right, click "STOP".
2. Optionally disconnect your device and power supply.

### Analyze Data

You can view a basic line graph of your data within Power Tool.

Other tools, like Microsoft Excel, can be used to preform further data analysis. To further analyze data in a comma-separated-values (CSV) format:

1. In the bottom right, click "Export".
2. Select "CSV" format.
3. Optionally set granularity and time range.
4. Click "Ok".
5. Save file to a memorable location.
6. Open file with desired program.

### Cleanup

1. Deactivate Power Monitor.
2. Close Power Tool.
3. Disconnect all cables.

## Analysis Methodology

When analyzing the power consumption of any device, it is important to isolate as many variables as possible. The best way to do this is to collect base line data for your device. Monitor your device for a suitable length of time to get a good idea of normal power use. Compare the normal power usage data to experimental data.

## Additional Resources

- [Monsoon Solutions Website](https://www.msoon.com/)
- [Power Monitor Product Page](http://msoon.github.io/powermonitor/LVPM.html)
- [Power Monitor User Manual](http://msoon.github.io/powermonitor/PowerTool/doc/LVPM%20Manual.pdf)