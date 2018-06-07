import { JsonController, NotFoundError, Post, HttpCode, Get, Delete, Body, Param } from 'routing-controllers'
import Questions from './entity';
import Quiz from '../quizzes/entity';

@JsonController()
export default class QuestionsController {

    @Get('/questions/:id')
    getQuestion(
        @Param('id') id: number
    ) {
        return Questions.findOneById(id)
    }

    @Get('/questions')
    async allQuestions(){
        const questions = await Questions.find()
        return { questions }
    }

    @Post('/questions')
    @HttpCode(201)
    async createQuestion(
        @Body() questions: Questions
    ) {
        const quiz = (await Quiz.findOneById(5))!
        questions.quiz = quiz
        // quiz.questions = (quiz.questions || []).concat([questions])
        // await quiz.save()
        return questions.save()
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
