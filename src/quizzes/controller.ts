import { JsonController, NotFoundError, Post, HttpCode, Get, Body, Param, Delete } from 'routing-controllers'
import Quiz from './entity'

@JsonController()
export default class QuizController {

    @Get('/quizzes/:id')
    getQuiz(
        @Param('id') id:  number
    ) {
        return Quiz.findOneById(id)
    }

    @Get('/quizzes')
    async allQuizzes(){
        const quizzes = await Quiz.find()
        return { quizzes }
    }

    @Post('/quizzes')
    @HttpCode(201)
    createQuiz(
        @Body() quiz: Quiz
    ) {
        return quiz.save()
    }

    @Delete('/quizzes/:id')
    async deleteQuiz(
        @Param('id') id: number 
    ) {
        const quiz = await Quiz.findOneById(id)

        if (!quiz) throw new NotFoundError('Nothing to Delete here!')

        if (quiz) Quiz.removeById(id)
        return 'Quiz Deleted.'
    }
}