module.exports = {
    printAddReceipt: function (device, printer, data) {
        const renewFee = `Membership Fee: $${data.field9}`;
        const fullname = `${data.field4} -- ${data.field7}`;
        const gallonLeft = `Gallon Total  : ${data.field31}`;
        const blank = '';
        const time = `${data.field15}  ${data.field32}`;
        const message = `Thank You                [Account#: ${data.field22}]`;

        device.open(function (error) {
            if (error) return console.log(error.message);
            printer
                .font('a')
                .align('lt')
                .text(fullname)
                .text(`NEW MEMBERSHIP`)
                .text(renewFee)
                .text(gallonLeft)
                .text(time)
                .text(blank)
                .text(message)
                .text('Mckee Pure Water')
                .text('(408) 729-1319')
                .text(blank)
                .cut()
                .close();
        });
    },
    printBuyReceipt: function (device, printer, data) {
        const fullname = `${data.fullname} -- ${data.fourDigit}`;
        const prevGallon = `Gallon Prev: ${data.prev}`;
        const gallonBuy = `Gallon Buy : ${data.buy}`;
        const blank = '';
        const gallonLeft = `Gallon Left: ${data.remain}`;
        const message = `Thank You                [Account#: ${data.account}]`;

        if (device) {
            device.open(function (error) {
                if (error) return console.log(error.message);
                printer
                    .font('a')
                    .align('lt')
                    .text(fullname.trim())
                    .text(prevGallon)
                    .text(gallonBuy)
                    .text(gallonLeft)
                    .text(data.invoiceTime + ' ' + data.invoiceTime)
                    .text(blank)
                    .text(message)
                    .text('Mckee Pure Water')
                    .text('(408) 729-1319')
                    .text(blank)
                    .cut()
                    .close();
            });
        }
    },
    printReceipt: function (device, printer, data) {
        if (device) {
            if (device) {
                if (data.type === 'BUY') {
                    device.open(function (error) {
                        if (error) return console.log(error.message);
                        printer
                            .font('a')
                            .align('lt')
                            .text(data.fullname.trim())
                            .text(data.prevGallon)
                            .text(data.gallonBuy)
                            .text(data.gallonLeft)
                            .text(data.date + ' ' + data.time)
                            .text(data.blank)
                            .text(data.message)
                            .text(data.store)
                            .text(data.phone)
                            .text(data.blank)
                            .cut()
                            .close();
                    });
                } else if (data.type === 'RENEW') {
                    device.open(function (error) {
                        if (error) return console.log(error.message);
                        printer
                            .font('a')
                            .text(data.fullname.trim())
                            .text(data.renewFee)
                            .text(`Gallon Prev : ${data.previous}`)
                            .text(data.renewGallon)
                            .text(data.totalGallon)
                            .text(data.date + ' ' + data.time)
                            .text(data.blank)
                            .text(data.message)
                            .text(data.store)
                            .text(data.phone)
                            .text(data.blank)
                            .cut()
                            .close();
                    });
                } else if (data.type === 'NEW') {
                    device.open(function (error) {
                        if (error) return console.log(error.message);
                        printer
                            .font('a')
                            .align('lt')
                            .text(data.fullname)
                            .text(`NEW MEMBERSHIP`)
                            .text(data.renewFee)
                            .text(data.gallonLeft)
                            .text(data.time)
                            .text(data.blank)
                            .text(data.message)
                            .text(data.store)
                            .text(data.phone)
                            .text(data.blank)
                            .cut()
                            .close();
                    });
                }
            }
        }
    },
    printDailyReport: function (device, printer, data) {
        const totalRenewFee = `Total Fee  : $${data.totalFee}`;
        const totalNew = `Total New  : ${data.totalNew}`;
        const totalRenew = `Total Renew: ${data.totalRenew}`;
        const totalBuyAmount = `Total Buy  : ${data.totalBuy}`;

        if (device) {
            device.open(function (error) {
                if (error) return console.log(error.message);
                printer
                    .font('a')
                    .align('lt')
                    .text('Mckee Pure Water')
                    .text(`Daily Report`)
                    .text(`${data.date} - ${data.time}`)
                    .text(totalRenewFee)
                    .text(totalNew)
                    .text(totalRenew)
                    .text(totalBuyAmount)
                    .text('')
                    .text('')
                    .cut()
                    .close();
            });
        }
    },
    printSenterDailyReport: function (device, printer, data) {
        const {
            totalNewFee,
            totalNewGallon,
            totalRenewFee,
            totalRenewGallon,
            totalBuy,
            date,
            time,
        } = data;
        // NEW MEMBERSHIP REPORT
        const totalNew = `Membership Fee: $${totalNewFee}`;
        const totalGallon = `Membership Gallon: ${totalNewGallon}`;

        // RENEW REPORT
        const totalFee = `Renewal Fee:    $${totalRenewFee}`;
        const totalRenew = `Renew Gallon:      ${totalRenewGallon}`;

        // TOTAL BUY GALLON
        const totalBuyGallon = `Buy Gallon:        ${totalBuy}`;

        // TOTAL SALES
        const totalSales = `Total Sales:    $${totalRenewFee + totalNewFee}`;

        const report = {
            totalNew,
            totalGallon,
            totalFee,
            totalRenewGallon,
            totalBuyGallon,
            totalSales,
        };

        console.log(report);

        if (device) {
            device.open(function (error) {
                if (error) return console.log(error.message);
                printer
                    .font('a')
                    .align('lt')
                    .text('V&J Senter Pure Water')
                    .text(`Daily Report`)
                    .text(`${date} - ${time}`)
                    .text('')
                    .text(totalGallon)
                    .text(totalRenew)
                    .text(totalBuyGallon)
                    .text('')
                    .text(totalNew)
                    .text(totalFee)
                    .text(totalSales)
                    .text('')
                    .text('')
                    .cut()
                    .close();
            });
        }
    },
    printRenewReceipt: function (device, printer, data) {
        const renewGallon = `Gallon Renew: ${data.renew}`;
        const renewFee = `Renew Fee   : $${data.fee}`;
        const fullname = `${data.fullname} -- ${data.fourDigit}`;
        const totalGallon = `Gallon Left : ${data.remain}`;
        const message = `Thank You                [Account#: ${data.account}]`;
        const blank = '';

        if (device) {
            device.open(function (error) {
                if (error) return console.log(error.message);
                printer
                    .font('a')
                    .align('lt')
                    .text(blank)
                    .text(fullname.trim())
                    .text(renewFee)
                    .text(`Gallon Prev : ${data.prev}`)
                    .text(renewGallon)
                    .text(totalGallon)
                    .text(data.invoiceDate + ' ' + data.invoiceTime)
                    .text(blank)
                    .text(message)
                    .text('Mckee Pure Water')
                    .text('(408) 729-1319')
                    .text(blank)
                    .cut()
                    .close();
            });
        }
    },
};
