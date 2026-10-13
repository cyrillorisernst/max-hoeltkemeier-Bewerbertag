import { Device, DeviceContainer, Employee } from "./types";

export const deviceSample: Device[] = [
    {
        "deviceType": "Laptop",
        "manufacturer": "Lenovo",
        "serial": "LNV-4821",
        "functional": false
    }, {
        "deviceType": "Headset",
        "manufacturer": "Jabra",
        "serial": "JBR-0934",
        "functional": false
    }, {
        "deviceType": "Monitor",
        "manufacturer": "Dell",
        "serial": "DEL-7710",
        "functional": true
    }
];

export const itStorage: DeviceContainer[] = [
    {
        id: 1,
        slots: 4,
        devices: [],
    },
    {
        id: 3,
        slots: 4,
        devices: [],
    },
    {
        id: 2,
        slots: 3,
        devices: [],
    }
]  


export const employee: Employee[] = [
    {
        id: 1,
        devices: []
    },
    {
        id: 3,
        devices: []
    },
    {
        id: 2,
        devices: []
    }
]  