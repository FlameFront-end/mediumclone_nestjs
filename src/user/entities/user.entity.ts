import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { encodePassword } from "../../utils/bcrypt";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column({ default: "" })
  bio: string;

  @Column({ default: "" })
  image: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await encodePassword(this.password);
  }
}
