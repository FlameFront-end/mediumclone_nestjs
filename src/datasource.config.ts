import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import * as process from "process";

config();

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/migration/**/*{.ts,.js}"],
  migrationsTableName: "migrations_TypeORM",
  synchronize: false,
  logging: true,
};

const datasourceConfig = new DataSource(dataSourceOptions);
export default datasourceConfig;
