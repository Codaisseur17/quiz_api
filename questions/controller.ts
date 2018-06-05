import { JsonController, NotFoundError, Post, HttpCode, Get, Put, Body, Param } from 'routing-controllers'
import Questions from './entity';

@JsonController()
export default class QuestionsController {

    @Get('/questions/:id')
    getQuiz(
        @Param('id') id:  number
    ) {
        return Questions.findOne(id)
    }

    @Post('/questions/:id')
    @HttpCode(201)
    createQuestion(
        @Body() question: Questions
    ) {
        return question.save()
    }

    @Delete('/questions/:id')
    async deleteQuestion(
        @Param('id') id: number 
    ) {
        const quiz = await Questions.findOne(id)

        if (!question) throw new NotFoundError('Nothing to Delete here!')

        if (question) Questions.removeById(id)
        return 'Question Deleted.'
    }
}