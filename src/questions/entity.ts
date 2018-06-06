import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator';
import Quiz from '../quizzes/entity';

@Entity()
export default class Questions extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text', {nullable:false})
    question: string

    @Column('text', {nullable:true})
    A: string

    @Column('text', {nullable:true})
    B: string

    @Column('text', {nullable:true})
    C: string

    @Column('text', {nullable:true})
    D: string

    @Column('text', {nullable:false})
    correctAnswer: string

    @ManyToOne(_ => Quiz, quiz => quiz.questions)
    quiz: Quiz

}
