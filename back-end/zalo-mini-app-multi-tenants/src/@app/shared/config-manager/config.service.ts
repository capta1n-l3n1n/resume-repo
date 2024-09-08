import { Injectable } from "@nestjs/common";
import * as dotenv from "dotenv";
import { join } from "path";
@Injectable()
export class ConfigService {
  private static instance: ConfigService = null;

  private constructor(filePath: string) {
    console.log(process.env.HOST_ENV);
    const path = join(process.cwd(), "environments", filePath);
    dotenv.config({ path });
  }

  static async getInstanseAsync(reload?: boolean, envPath?: string) {
    if (this.instance == null || reload === true) {
      const defaultEnvPath = `.env.${process.env.HOST_ENV}`;
      this.instance = new ConfigService(envPath || defaultEnvPath);
    }
    return this.instance;
  }

  static getInstanse() {
    return this.instance;
  }

  get(key: string): string {
    return process.env[key];
  }
}
