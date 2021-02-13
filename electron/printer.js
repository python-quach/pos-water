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
};
