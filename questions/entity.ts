import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator';
import Quiz from '../quizzes/entities';

@Entity() 
export default class Questions extends BaseEntity {

    @PrimaryGeneratedColumn() 
    id?: number

    @IsString()
    @Column('text', {nullable:false})
    question: string

    @IsString()
    @Column('text', {nullable:true})
    option1: string

    @IsString()
    @Column('text', {nullable:true})
    option2: string

    @IsString()
    @Column('text', {nullable:true})
    option3: string

    @IsString()
    @Column('text', {nullable:true})
    option4: string

    @IsString()
    @Column('text', {nullable:false})
    correct_answer: string
    
    @ManyToOne(_ => Quiz, quiz => quiz.questions, {eager: true, cascade: true})
} 