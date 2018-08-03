# Power Monitor Guide

## Monitoring Computer Configuration

Install the Power Tool software and connect the Power Monitor to your monitoring computer. Note that Linux and Mac OS machines are not currently supported by the Power Tool software.

See [Power Monitor User Manual](http://msoon.github.io/powermonitor/PowerTool/doc/LVPM%20Manual.pdf) for Power Tool installation and Power Monitor setup instructions.

## Monitoring Power Consumption

This section assumes you have installed the Power Tool software and correctly connected the Power Monitor as per the user manual.

### Get Device Power Requirements

The first step in monitoring the power consumption of any device is to learn its required power specifications. For example, the Raspberry Pi 2 Model B requires a 5 volt power supply with a recommended current capacity of 1.8 amps. Under-powering any device may result in operational errors, or in the worst case, damage the device or peripherals.

It is important to note that **the Power Monitor can only output 2.01 to 4.55 volts on its own.** By using an external power supply, you can achieve higher voltages. **Using a voltage of over 5.5 volts may damage the Power Monitor!**

### Connect Device to Power Monitor

Depending on how your device is made, it may connect to power via many different connectors or arrangement of pins. Provided with the Power Monitor should be a customized cable with connections for the Power Monitor (BNC and banana), external power supply (Male USB A), and your test device (Female USB A).



### Battery Powered Devices

Devices with batteries cannot be reliably monitored for power consumption via their charging ports in most cases. This is due to the following reasons:

- The device may use the battery as a power buffer. This would mean that the measured power draw represents the power drawn to charge the battery only.
- The device likely charges the battery while plugged in. This would mean that even if the device can draw operating power from the charging port, there would be no way to distinguish between power drawn to charge the battery and power drawn to operate the device.

In the cases where you are confident that you can monitor power draw from the charging port, move on to 

For the most accurate results, use the following procedure where possible:

1. Learn the voltage and 

### 

### Case 1

Device: Samsung Galaxy S4

s

## Additional Resources

- [Monsoon Solutions Website](https://www.msoon.com/)
- [Power Monitor Product Page](http://msoon.github.io/powermonitor/LVPM.html)
- [Power Monitor User Manual](http://msoon.github.io/powermonitor/PowerTool/doc/LVPM%20Manual.pdf)