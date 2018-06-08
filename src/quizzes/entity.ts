import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsOptional } from 'class-validator';
import Questions from '../questions/entity';

@Entity() 
export default class Quiz extends BaseEntity {

    @PrimaryGeneratedColumn() 
    id?: number

    @IsString()
    @Column('text', {nullable:false})
    title: string

    @IsOptional()
    @IsString()
    @Column('text', {nullable:true})
    webhookUrl: string

    @Column()
    teacherId: number

    @OneToMany(_ => Questions, question => question.quiz, {eager: true, cascadeInsert: true})
    questions: Questions[];

} 