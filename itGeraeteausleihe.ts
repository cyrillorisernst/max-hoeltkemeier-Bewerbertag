//types
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


//sample data
const deviceSample: Device[] = [
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

const itStorage: DeviceContainer[] = [
    {
        id: 1,
        slots: 4,
        devices: ["LNV-4821"],
    },
    {
        id: 3,
        slots: 4,
        devices: ["JBR-0934"],
    },
    {
        id: 2,
        slots: 3,
        devices: ["DEL-7710"],
    }
]


const employee: Employee[] = [
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


//functions

let devices: Device[] = deviceSample;
let deviceContainer: DeviceContainer[] = itStorage;
let employeeList: Employee[] = employee;


//retreiving devices starts here:
function getDeviceTypes(availableDevices: Device[]) {
    let typeList: string[] = [];
    for (let i = 0; i < availableDevices.length; i++) {
        if (!typeList.includes(availableDevices[i].deviceType)) {
            typeList.push(availableDevices[i].deviceType);
        }
    }
    return typeList;
}


function getAvailableDevicesByType(deviceInputType: string) {
    let deviceSerials: string[] = [];
    let deviceList: Device[] = [];

    deviceContainer.forEach((ct) => {
        ct.devices.forEach((item) => {
            deviceSerials.push(item);
        })
    })

    deviceList = devices.filter((dvc) => {
        return deviceSerials.includes(dvc.serial)
    })

    return deviceList;
}

function rentDevice(employeeId: number, deviceSerial: string) {

    //find employee and give the person the device
    let rentingEmployee = employeeList.find((empl) => {
        return employeeId == empl.id;
    });

    let device = devices.find((dv) => {
        return deviceSerial == dv.serial;
    });

    if (device) {
        rentingEmployee?.devices.push(device.serial);
    }
    //remove it from container
    for (let i = 0; i < deviceContainer.length; i++) {
        let foundIdx = deviceContainer[i].devices.findIndex((dvc) => { return deviceSerial === dvc })

        if (foundIdx) {
            deviceContainer[i].devices.splice(foundIdx, 1);
        }

    }
}



// returning devices starts here:
function returnDevice(containerId: number, deviceSerial: string, isFunctional: boolean, employeeId: number) {

    //find the device by serial
    const returnedDevice = deviceSample.find((item) => {
        item.serial == deviceSerial;
    });

    if (returnedDevice) {
        //check for functionality
        returnedDevice.functional = isFunctional;

        //put it in the container
        let container = deviceContainer.find((ct) => {
            return ct.id == containerId;
        })

        if (container) {
            container.devices.push(returnedDevice.serial);
        }

        for (let i = 0; i < deviceContainer.length; i++) {
            if (container?.id == deviceContainer[i].id) {
                deviceContainer[i] = container;
                break;
            }
        }

        //remove it from employee
        let employeeIdx: number | null = null;

        let employee = employeeList.find((empl, emplIdx) => {
            employeeIdx = emplIdx;
            return empl.id == employeeId;
        })


        const emplDeviceIdx = employee?.devices.findIndex((serial) => {
            return serial == deviceSerial;
        }) ?? 0;

        employee?.devices.splice(emplDeviceIdx, 1);

        if (employeeIdx && employee) {
            employeeList[employeeIdx] = employee;
        }
    }
}

function findFreeContainerSpace(): DeviceContainer[] {

    for (let i = 0; i < deviceContainer.length; i++) {
        if (deviceContainer[i].slots < deviceContainer[i].devices.length) {
            return [deviceContainer[i]];
        }
    }
    return [];
}


//command line interaction with user, renting is created first, 
//but users need to be able to choose between renting and returning later on:


const availableDeviceTypes = getDeviceTypes(devices);

//these could also be given as parameters from and to their respective functions instead of defining them here
let selectedDeviceType = "";
let availableDeviceList = [];
let selectedDeviceSerial = "";
let selectedEmployeeId = "";

const container = document.getElementById("containerDiv");
if (container) {
    const newParagraph = document.createElement("p");
    newParagraph.textContent = "What type of device are you looking for?";

    container.appendChild(newParagraph);

}

const btnContainer = document.getElementById("btnContainer");
if (btnContainer) {
    availableDeviceTypes.forEach((entry, idx) => {
        const typeButton = document.createElement("button");

        typeButton.textContent = entry;
        typeButton.id = idx.toString();


        typeButton.addEventListener("click", () => {
            selectedDeviceType = entry;
            clearAndListDevices();
        });

        btnContainer.appendChild(typeButton);
    });
}
function clearAndListDevices() {

    if (availableDeviceTypes.length) {
        availableDeviceList = getAvailableDevicesByType(selectedDeviceType);

        if (availableDeviceList && container && btnContainer) {
            container?.replaceChildren();
            const newParagraph = document.createElement("p");
            newParagraph.textContent = "What device do you want to rent?";

            container.appendChild(newParagraph);

            btnContainer?.replaceChildren();
            availableDeviceList.forEach((entry, idx) => {

                if (entry.functional) {
                    const btn = document.createElement("button");

                    btn.textContent = entry.manufacturer + " " + entry.serial;
                    btn.id = entry.serial;


                    btn.addEventListener("click", () => {
                        
                    });

                    btnContainer.appendChild(btn);
                }
            });


        }
        console.table(availableDeviceList);
    }
}

function takeDeviceFromContainer(){
    
}

