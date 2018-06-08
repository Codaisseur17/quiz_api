import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator';
import Quiz from '../quizzes/entity';
import Answer from '../answers/entity';

@Entity()
export default class Questions extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Column('text', {nullable:false})
    question: string

    @IsString()
    @Column('text', {nullable:false})
    topic: string

    @ManyToOne(_ => Quiz, quiz => quiz.questions, {eager:false})
    quiz: Quiz

    @OneToMany(_ => Answer, answer => answer.question, {eager: true, cascadeInsert: true})
    answer: Answer[];

}
