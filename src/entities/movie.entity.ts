import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("movies")
export class Movie {
    @PrimaryGeneratedColumn("increment")
    id:number;

    @Column({ type: "varchar", length: 50, unique:true })
    name: string;

    @Column({ type: "text", nullable:true })
    description?: string | Text | null | undefined;

    @Column({ type: "integer" })
    duration: number;

    @Column({ type: "integer" })
    price: number;
}