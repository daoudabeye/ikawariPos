export class Wallet{
    id: number;
    type: TypeWallet;
    address: string;
    currency: string;
    balanca: number;
    lastOperation: string
}

export enum TypeWallet{
    PRINCIPAL,
    WAITING,
    COMMISSION,
    TAXES,
    SEQUESTRE,
    REMBOURSEMENT,
    DESTRUCTION
}