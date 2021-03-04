export class Order {
    id: number;
    pin: boolean;
    mtcn: string;
    paymentMode: PaymentMode;
    date: string;
    status: OrderStatus;
    amount: number;
    currencyRate: number;
    amountPayedDestination: number;
    exchangeRate: number;
    fee: number;
    originCountryIso: string;
    destinationCountryIso: string;
    originCurrencyIso: string;
    destinationCurrencyIso: string;
    comment: string;
    bankName: string;
    bankCode; string;
    bankAccountNumber: string;
    bankAccountType: string;
    reference: string;
    source: string;

    sender: MtUser;
    beneficiary: MtUser;
    approvedBy: number;
    originAgent: string;
    originAgencyCode: string;
    destinationAgencyCode: string;
}

export enum PaymentMode{
    BANK_DEPOSIT, CASH_PICKUP, CASH_DELIVERY, CASH_TO_WALLET
}

export enum OrderStatus{
    PAID, WAIT, CANCELLED, REFUND, PROCESSED, NEW, ERROR
}

export class MtUser{
    phoneNumber: string;
    name: string;
    middleName: string;
    lastName: string;
    secondLastName: string;
    address: string;
    secondPhoneNumber: string;
    countryIso: string;
    state: string;
    city: string;
    idType: string;
    idNumber: string;
    idExpiation: string;
}