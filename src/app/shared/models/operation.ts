export class OperationConfig {
    name: string;
    operationConfigId: OperationConfigId;
    paymentModes: PaymentMode[];
    mainCurrencyIso: string;
    availableCurrenciesIso: string[];
    enabled: boolean;
    validation: boolean;
    minAmount: number;
    maxAmount: number ;
    fixedFee: number;
}

export class OperationConfigId{
    countryIsoCode: string;
    type: OperationType;
}

export enum PaymentMode{
    BANK_DEPOSIT, CASH_PICKUP, CASH_DELIVERY, CASH_TO_WALLET
}

export enum OperationType{
    TRANSFERS, PAYMENT, DEPOSIT, WITHDRAWAL, SEND
}
