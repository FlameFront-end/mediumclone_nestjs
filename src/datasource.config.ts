import { DataSource, DataSourceOptions } from "typeorm";
import * as process from "process";

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "qwerty",
  database: "mediumclone",
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/migration/**/*{.ts,.js}"],
  migrationsTableName: "migrations_TypeORM",
  synchronize: false,
  logging: true,
};

const datasourceConfig = new DataSource(dataSourceOptions);
export default datasourceConfig;
