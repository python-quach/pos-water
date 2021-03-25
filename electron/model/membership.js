class Membership {
    constructor({
        record_id,
        account,
        firstName,
        lastName,
        fullname,
        areaCode,
        threeDigit,
        fourDigit,
        phone,
        memberSince,
        prev,
        renew,
        buy,
        remain,
        fee,
        invoiceDate,
        invoiceTime,
    }) {
        this.field20 = record_id;
        this.field22 = account;
        this.field1 = firstName;
        this.field2 = lastName;
        this.field4 = fullname;
        this.field5 = areaCode;
        this.field6 = threeDigit;
        this.field7 = fourDigit;
        this.field8 = phone;
        this.field10 = memberSince;
        this.field31 = prev;
        this.field28 = renew;
        this.field19 = buy;
        this.field12 = remain;
        this.field9 = fee;
        this.field15 = invoiceDate;
        this.field32 = invoiceTime;
    }

    // Getter
    get record() {
        const account = this.field22;
        const data = [
            this.field20,
            this.field22,
            this.field1,
            this.field2,
            this.field4,
            this.field5,
            this.field6,
            this.field7,
            this.field8,
            this.field10,
            this.field31,
            this.field28,
            this.field19,
            this.field12,
            this.field9,
            this.field15,
            this.field32,
        ];
        return [account, data];
    }
}

module.exports = Membership;
