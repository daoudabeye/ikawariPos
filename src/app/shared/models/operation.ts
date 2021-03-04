import { PaymentMode } from "./sendForm";

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

export class PaymentForm {
    orderId: number;
    paymentMode: PaymentMode;
    countryIso: string;
    nationalId: NationalIdType;
    idNumber: string;
    expirationDate: string;
    operationDate: string;
    bankName: string;
    accountNumber: string;
    bankOperationRef: string;
    pinCode: string;

    hasError: boolean;
    error: string;
    
}

export class PinCodeCheck {
    orderId: number;
    pinCode: string;
    result: boolean;
    attemptLeft: number;
    error: string;
    
}

export class OperationConfigId{
    countryIsoCode: string;
    type: OperationType;
}

export enum OperationType{
    TRANSFERS, PAYMENT, DEPOSIT, WITHDRAWAL, SEND
}

export enum NationalIdType{
    PASSPORT, NATIONAL_ID, CONSUL, AUTRE
}
