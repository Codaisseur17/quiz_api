import { JsonController, NotFoundError, Post, HttpCode, Get, Put, Body, Param } from 'routing-controllers'
import Quiz from './entity'

@JsonController()
export default class QuizController {

    @Get('/quizzes/:id')
    getQuiz(
        @Param('id') id: number
    ) {
        return Quiz.findOne(id)
    }

    @Post('/quizzes')
    @HttpCode(201)
    createAdvert(
        @Body() quiz: Quiz
    ) {
        return quiz.save()
    }

    @Delete('/quizzes/:id')
    async deleteQuiz(
        @Param('id') id: number 
    ) {
        const quiz = await Quiz.findOne(id)

        if (!quiz) throw new NotFoundError('Nothing to Delete here!')

        if (quiz) Quiz.removeById(id)
        return 'Quiz Deleted.'
    }
}