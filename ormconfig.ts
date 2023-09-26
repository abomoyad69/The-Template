import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const config: TypeOrmModuleOptions = {
   type: 'oracle',
   host: "192.168.2.18",
   port: 1521,
   username: "khwarzmi_sharjah",
   password: "khwarzmi_sharjah",
   database: "KHWARZMI",
   logging: ["error"],
   synchronize: false,
   connectString: "(DESCRIPTION=(ADDRESS=(PROTOCOL = TCP)(HOST = 192.168.2.18)(PORT = 1521))(CONNECT_DATA= (SERVER=dedicated)(SERVICE_NAME = KHWARZMI)))",
   entities: [
      "dist/database/entities/*.{ts,js}"
   ],
   subscribers: [
      "subscriber/*.js"
   ],
   migrations: [
      "dist/database/migration/*.{ts,js}"
   ],
   autoLoadEntities: true
};
export = config;