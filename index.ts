import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import setupDb from './db'
import QuizController from './quizzes/controller';
import QuestionsController from './questions/controller';

const port = process.env.PORT || 4001

const app = createKoaServer({
  controllers: [
    QuizController,
    QuestionsController
  ]
})

setupDb()
  .then(_ => {
    app.listen(port, () => console.log(`Listening on port ${port}`))
  })
  .catch(err => console.error(err))