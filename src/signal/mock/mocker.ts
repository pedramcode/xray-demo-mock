type DevicesModelDTO = {
  [deviceId: string]: {
    data: [
      time: number,
      [latitude: number, longitude: number, speed: number],
    ][];
    time: number;
  };
};

export default function generateMockDevices(
  deviceCount: number = 1,
): DevicesModelDTO {
  const mockData: DevicesModelDTO = {};

  for (let i = 0; i < deviceCount; i++) {
    const deviceId = generateRandomId();

    // Random number of records per device
    const recordCount = getRandomInt(2, 6);

    const data: [number, [number, number, number]][] = [];

    for (let j = 0; j < recordCount; j++) {
      const time = getRandomInt(100, 5000);
      const latitude = getRandomFloat(50, 52);
      const longitude = getRandomFloat(12, 13);
      const speed = getRandomFloat(0.5, 3);

      data.push([time, [latitude, longitude, speed]]);
    }

    mockData[deviceId] = {
      data,
      time: Date.now(),
    };
  }

  return mockData;
}

function generateRandomId(): string {
  return Math.random().toString(16).slice(2, 26).padEnd(24, '0');
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
