export class Customer{
    username: string;
    firstName: string;
    lastName: string;
    authId: string;
    profile: CustomerProfile;
    email: string;
    mobilePhone: string;

    mobileVerified: boolean;
    individual: boolean;

    status: CustomerStatus;
}

export enum CustomerStatus {
    Approved, Pending, Rejected, blacklisted, suspended
}

export enum CustomerProfile {
    BANK, B2B, SUPERAGENT, MASTERAGENT, AGENT, CF
}