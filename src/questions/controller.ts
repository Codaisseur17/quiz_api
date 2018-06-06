import { JsonController, NotFoundError, Post, Put HttpCode, Get, Delete, Body, Param } from 'routing-controllers'
import Questions from './entity';

@JsonController()
export default class QuestionsController {

    @Get('/questions/:id')
    getQuestion(
        @Param('id') id: number
    ) {
        return Questions.findOneById(id)
    }

    // @Post('/questions/:id')
    // @HttpCode(201)
    // createQuestion(
    //     @Body() question: Questions
    // ) {
    //     return question.save()
    // }

    @Post('/questions')
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
        const question = await Questions.findOneById(id)

        if (!question) throw new NotFoundError('Nothing to Delete here!')

        if (question) Questions.removeById(id)
        return 'Question Deleted.'
    }
}
