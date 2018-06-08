import { JsonController, NotFoundError, Post, HttpCode, Get, Delete, Body, Param } from 'routing-controllers'
import Answer from './entity';
import Question from '../questions/entity';

@JsonController()
export default class AnswerController {

    @Get('/answer/:id')
    getQuestion(
        @Param('id') id: number
    ) {
        return Answer.findOneById(id)
    }

    @Get('/answer')
    async allAnswer(){
        const answer = await Answer.find()
        return { answer }
    }

    @Post('/answer')
    @HttpCode(201)
    async createQuestion(
        @Body() answer: Answer
    ) {
        const question = (await Question.findOneById(answer.question))!
        answer.question = question
        return answer.save()
    }

    @Delete('/answer/:id')
    async deleteQuestion(
        @Param('id') id: number
    ) {
        const question = await Answer.findOneById(id)

        if (!question) throw new NotFoundError('Nothing to Delete here!')

        if (question) Answer.removeById(id)
        return 'Question Deleted.'
    }
}