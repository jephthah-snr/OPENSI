import AppError from "../../../shared/utils/AppError";
import httpStatus from "http-status";

let keyValueStore: Record<string, string> = {};

export default class MainService {

  public async getAllKeyStore() {
    return keyValueStore;
  }

  public async addKeyStore(payload: { key: string; value: string }) {
    if (!payload.key || !payload.value || keyValueStore.hasOwnProperty(payload.key)) {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid key value");
    }

    keyValueStore[payload.key] = payload.value;
  }

  public async getSingleKeyStore(key: string) {
    console.log(key)
    if (!keyValueStore.hasOwnProperty(key)) {
      throw new AppError(httpStatus.NOT_FOUND, "Key not found");
    }
  
    const value = keyValueStore[key];
    const data = { key, value };
    return data;
  }

  public async updateKeyStore(key: string, value: string) {
    if (!value || !keyValueStore.hasOwnProperty(key)) {
      throw new AppError(httpStatus.BAD_REQUEST, "Bad request");
    }

    keyValueStore[key] = value;
    return { [key]: value };
  }

  public async deleteKeyStore(key: string) {
    if (!keyValueStore.hasOwnProperty(key)) {
      throw new AppError(httpStatus.NOT_FOUND, "Key not found");
    }
    delete keyValueStore[key];
  }
}
