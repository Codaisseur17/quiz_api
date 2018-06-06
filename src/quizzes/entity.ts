import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator';
import Questions from '../questions/entity';

@Entity() 
export default class Quiz extends BaseEntity {

    @PrimaryGeneratedColumn() 
    id?: number

    @IsString()
    @Column('text', {nullable:false})
    title: string

    @IsString()
    @Column('text', {nullable:true})
    webhook_url: string

    @OneToMany(_ => Questions, question => question.quiz, {eager: true, cascadeInsert: true})
    questions: Questions[];

} 