import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsBoolean } from 'class-validator';
import Questions from '../questions/entity';

@Entity()
export default class Answer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Column('text', {nullable:false})
    answer: string

    @Column('text', {nullable:true})
    answerValue: number

    @ManyToOne(_ => Questions, questions => questions.answer, {eager:false})
    question: Questions

}
