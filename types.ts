export type Device = {
    "deviceType": string;
    "manufacturer": string;
    "serial": string;
    "functional": boolean;
}

export type DeviceContainer = {
    "id": number;
    "slots": number;
    "devices": string[];
}


export type Employee = {
    "id": number;
    "devices": string[];
}
