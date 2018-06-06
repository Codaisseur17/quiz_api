import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator';
import Quiz from '../quizzes/entity';

@Entity() 
export default class Questions extends BaseEntity {

    @PrimaryGeneratedColumn() 
    id?: number

    @IsString()
    @Column('text', {nullable:false})
    question: string

    @IsString()
    @Column('text', {nullable:true})
    A: string

    @IsString()
    @Column('text', {nullable:true})
    B: string

    @IsString()
    @Column('text', {nullable:true})
    C: string

    @IsString()
    @Column('text', {nullable:true})
    D: string

    @IsString()
    @Column('text', {nullable:false})
    correct_answer: string

    @ManyToOne(_ => Quiz, quiz => quiz.questions)
    quiz: Quiz

} 