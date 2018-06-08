import 'reflect-metadata'
import { createKoaServer, Action } from 'routing-controllers'
import setupDb from './db'
import QuizController from './quizzes/controller'
import QuestionsController from './questions/controller'

const port = process.env.PORT || 4001

const app = createKoaServer({
  cors: true,
  controllers: [QuizController, QuestionsController],
  currentUserChecker: async (action: Action) => {
    const userId: number = action.request.headers['x-user-id']
    const isTeacher: boolean = action.request.headers['x-user-isteacher']

    console.log('userId', userId)
    console.log('isTeacher', isTeacher)

    return { userId, isTeacher }
  }
})

setupDb()
  .then(_ => {
    app.listen(port, () => console.log(`Listening on port ${port}`))
  })
  .catch(err => console.error(err))
