import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsOptional } from 'class-validator';
import Questions from '../questions/entity';
import User from '../../../users/src/entities/users'

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

    @OneToMany(_ => Questions, question => question.quiz, {eager: true, cascadeInsert: true})
    questions: Questions[];

    @ManyToOne(_ => User, user => user.quiz)
    user: User

} 