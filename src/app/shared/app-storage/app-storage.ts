import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

export async function setAtStorage(key: string, value: any): Promise<void> {
  await Storage.set({
    key: key,
    value: JSON.stringify(value),
  });
}

export async function getFromStorage(key: string): Promise<any> {
  const item = await Storage.get({ key: key });
  return JSON.parse(item.value);
}

export async function removeFromStorage(key: string): Promise<void> {
  await Storage.remove({
    key: key,
  });
}
