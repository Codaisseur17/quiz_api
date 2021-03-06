import {
  JsonController,
  NotFoundError,
  BadRequestError,
  Post,
  HttpCode,
  Get,
  Body,
  Param,
  Delete,
  CurrentUser,
  HttpError
} from 'routing-controllers'
import Quiz from './entity'
import * as request from 'superagent'

type User = {
  userId: number
  isTeacher: boolean
}


@JsonController()
export default class QuizController {
  @Get('/quizzes/:id')
  getQuiz(@Param('id') id: number) {
    return Quiz.findOneById(id)
  }

  @Get('/quizzes')
  async allQuizzes(@CurrentUser() user: User) {
    const quizzes = await Quiz.find()
    return { quizzes }
  }


  @Post('/quizzes')
  @HttpCode(201)
  async createQuiz(
    @CurrentUser() user: User,
    @Body() quiz: Quiz) {
      if(!user.isTeacher)throw new BadRequestError("You Shall Not Pass!")
      const quizhook = {
        quizName: quiz.title,
        url: quiz.webhookUrl
      }
      let forwardErr
      const webHook = process.env.WEBHOOKS_URL || 'http://webhooks:4004/quizhook'
      // have to be async for err check
      await request
        .post(webHook)
        .send(quizhook)
        .then(res => {
          // incoming response from webHook
          console.log(res.text)
        })
        .catch(err => {
          // incoming error from webHook
          forwardErr = err
          console.log(err)
        })


    return quiz.save()
  }


  @Delete('/quizzes/:id')
  async deleteQuiz(@Param('id') id: number) {
    const quiz = await Quiz.findOneById(id)

    if (!quiz) throw new NotFoundError('Nothing to Delete here!')

    if (quiz) Quiz.removeById(id)
    return 'Quiz Deleted.'
  }
}
