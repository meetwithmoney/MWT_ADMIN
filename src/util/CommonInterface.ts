export interface IhookFrom {
    name: string;
    validate: IValidate
}

export interface IValidate {
    required?: Irequired;
    pattern?: IPattern;
}

export interface Irequired {
    value?: boolean
}
export interface IPattern {
    value?: string | RegExp;
    message?: string
}

export interface IAxiosResponse {
    message: string;
    data?: any;
}
export interface ErrorInterface {
    message: string;
}