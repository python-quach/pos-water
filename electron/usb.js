const usbDetect = require('usb-detection');

module.exports = {
    loadUSBPrinter: function (device, printer) {
        return new Promise((resolve, reject) => {
            // POS PRINTER SETUP
            const options = { encoding: 'GB18030' /* default */ };
            let escpos;
            // let device;
            // let printer;

            usbDetect.startMonitoring();

            usbDetect
                .find()
                .then(function (devices) {
                    devices.forEach(function (item) {
                        if (item.deviceName === 'USB Printing Support') {
                            console.log('Found USB: ', { ...item });
                            escpos = require('escpos');
                            escpos.USB = require('escpos-usb');
                            device = new escpos.USB();
                            printer = new escpos.Printer(device, options);
                            console.log({ device, printer });
                            resolve({ device, printer, usbDetect });
                        }
                    });
                })
                .catch(function (err) {
                    escpos = null;
                    device = null;
                    printer = null;
                    // resolve({ device, printer });
                    resolve({ device, printer, usbDetect });
                });

            usbDetect.on('add', function (usbDevice) {
                usbDetect
                    .find()
                    .then(function (devices) {
                        devices.forEach(function (item) {
                            if (item.deviceName === 'USB Printing Support') {
                                // console.log('Found USB: ', { ...item });
                                escpos = require('escpos');
                                escpos.USB = require('escpos-usb');
                                setTimeout(function () {
                                    device = new escpos.USB();
                                    printer = new escpos.Printer(
                                        device,
                                        options
                                    );
                                    resolve({ device, printer, usbDetect });
                                }, 1000);
                            }
                        });
                    })
                    .catch(function () {
                        escpos = null;
                        device = null;
                        printer = null;
                        resolve({ device, printer, usbDetect });
                    });
            });

            usbDetect.on('remove', function () {
                escpos = null;
                device = null;
                printer = null;
                resolve({ device, printer, usbDetect });
            });
        });
    },
};
