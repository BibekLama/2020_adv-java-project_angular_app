package bibek.epita.quiz.tests.integration;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import bibek.epita.quiz.datamodel.Answer;
import bibek.epita.quiz.datamodel.Question;
import bibek.epita.quiz.datamodel.User;
import bibek.epita.quiz.services.business.ExamBusinessException;
import bibek.epita.quiz.services.business.ExamDataService;
import bibek.epita.quiz.services.dao.AnswerDAO;
import bibek.epita.quiz.services.dao.QuestionDAO;
import bibek.epita.quiz.services.dao.UserDAO;
import bibek.epita.quiz.tests.unit.TestQuestionDAO;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "/applicationContext.xml")
public class TestExamDataService {
	
	private static final Logger LOGGER = LogManager.getLogger(TestExamDataService.class);
	
	@Inject
	ExamDataService ds;
	
	@Inject
	AnswerDAO answerDao;
	
	@Inject
	UserDAO userDao;
	
	@Inject
	QuestionDAO questionDao;
	
	@Test
	public void testAnswerToQuestion()  {
		//given
		User user = new User();
		user.setLoginName("test");
		user.setEmail("test@test.com");
		userDao.create(user);
		
		Question question = new Question();
		question.setTitle("What is Java?");
		questionDao.create(question);
		
		//when
		Answer answer = new Answer();
		answer.setContent("I don't know");
		
//		try {
//			ds.answerToQuestion(user, question, answer);
//		} catch (ExamBusinessException e) {
//			//Log exception using a logger
//			e.printStackTrace();
//		} catch (Exception e) {
//			LOGGER.error("Some exception occured while adding answers to the question", e);
//		}
			
		//then
		Answer fetchedAnswer = answerDao.getById(answer.getId());
		Assert.assertEquals(fetchedAnswer.getUser().getLoginName(), user.getLoginName()); 
		
		
	}
}
