import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("USERS")
export class Users {
  @PrimaryGeneratedColumn({ name: "ID" })
  id: number;

  @Column({ name: "STATUS" })
  status: number;

  @Column({ name: "USER_TYPE" })
  userType: number;

  @Column({ name: "NAMEAR" })
  nameAr: string;

  @Column({ name: "NAMEEN" })
  nameEn: string;

  @Column({ name: "USERNAME" })
  username: string;

  @Column({ name: "USERPASSWORD" })
  userPassword: string;

  @Column({ name: "EMAIL" })
  email: string;

  @Column({ name: "ADDRESS" })
  address: string;

  @Column({ name: "DATE_CREATED" })
  dateCreated: Date;

  @Column({ name: "DATE_MODIFIED" })
  dateModified: Date;

  @Column({ name: "MODIFIED_BY" })
  modifiedBy: number;

  @Column({ name: "MOBILENUMBER" })
  phoneNumber: string;

  @Column({ name: "CREATED_BY" })
  createdBy: number;

  @Column({ name: "ISADMIN" })
  isAdmin: number;

  @Column({ name: "SURVEY_USER_ID" })
  surveyUserID: number;

  @Column({ name: "IMAGE" })
  image: string;

  @Column({ name: "PROFILE_ID" })
  profileID: number;

  @Column({ name: "CODE" })
  code: number;

  @Column({ name: "PLAIN_PASSWORD" })
  plainPassword: string;

  @Column({ name: "CLIENT_ID" })
  clientID: string;

  @Column({ name: "EXTENSION_PHONE_NO" })
  extensionPhoneNo: number;

  @Column({ name: "IMAGE_PATH" })
  imagePath: string;
}
