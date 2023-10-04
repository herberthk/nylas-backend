import fs from "fs";
import { v4 as uuidv4 } from "uuid";

import type { User } from "../types";

interface Class {
  filename: string;
  getJSONRecords: () => Promise<string>;
  findUser: (id: string, emailAddress: string) => Promise<User | undefined>;
  updateUser: (id: string, payload: Omit<User, "id">) => Promise<User>;
  createUser: (payload: User) => Promise<User>;
  createOrUpdateUser(id: string, attributes: User): Promise<User>;
}

class MockDB implements Class {
  public filename: string;

  constructor(filename: string) {
    if (!filename) {
      throw new Error("Filename is required");
    }
    this.filename = filename;
    try {
      fs.accessSync(filename, fs.constants.R_OK | fs.constants.W_OK);
    } catch (err) {
      fs.writeFileSync(filename, "[]");
    }
  }

  async getJSONRecords() {
    // Read filecontents of the datastore
    const jsonRecords = await fs.promises.readFile(this.filename, {
      encoding: "utf8",
    });
    // Parse JSON records in JavaScript
    return JSON.parse(jsonRecords);
  }

  // Logic to find data
  async findUser(id: string, emailAddress?: string) {
    const jsonRecords: User[] = await this.getJSONRecords();
    return jsonRecords.find(
      (r) => r.emailAddress === emailAddress || r.id === id
    );
  }

  // Logic to update data
  async updateUser(id?: string, payload?: User) {
    const jsonRecords: User[] = await this.getJSONRecords();

    const idx = jsonRecords.findIndex((r) => r.id === id);
    if (idx === -1) {
      throw new Error("Record not found");
    }

    // Update existing record
    jsonRecords[idx] = { ...jsonRecords[idx], ...payload };

    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(jsonRecords, null, 2)
    );
    return jsonRecords[idx];
  }

  // Logic to add data
  async createUser(payload: User) {
    const jsonRecords: User[] = await this.getJSONRecords();
    // const id = uuidv4();
    // const user = {
    //   id: uuidv4(),
    //   ...payload,
    // };
    payload.id = uuidv4();
    // Adding new record

    jsonRecords.push(payload);

    // Writing all records back to the file
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(jsonRecords, null, 2)
    );

    return payload;
  }

  // Logic to add or update data
  async createOrUpdateUser(id: string, attributes: User) {
    const record = await this.findUser(id, attributes?.emailAddress);
    if (record) {
      return await this.updateUser(record?.id, attributes);
    } else {
      return await this.createUser(attributes);
    }
  }
}

export const mockDB = new MockDB("datastore.json");
// 'datastore.json' is created at runtime
