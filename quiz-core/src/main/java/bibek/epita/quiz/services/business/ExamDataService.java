package bibek.epita.quiz.services.business;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.transaction.Transactional.TxType;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import bibek.epita.quiz.datamodel.Answer;
import bibek.epita.quiz.datamodel.MCQAnswer;
import bibek.epita.quiz.datamodel.MCQChoice;
import bibek.epita.quiz.datamodel.Question;
import bibek.epita.quiz.datamodel.User;
import bibek.epita.quiz.services.dao.AnswerDAO;
import bibek.epita.quiz.services.dao.MCQAnswerDAO;
import bibek.epita.quiz.services.dao.QuestionDAO;
import bibek.epita.quiz.services.dao.UserDAO;

public class ExamDataService {
	
	private static final Logger LOGGER = LogManager.getLogger(ExamDataService.class);
	
	@Inject
	UserDAO userDAO;
	
	@Inject
	QuestionDAO questionDAO;
	
	@Inject
	AnswerDAO answerDAO;
	
	@Inject
	MCQAnswerDAO mcqAnswerDAO;
	
	@Transactional(value = TxType.REQUIRED)
	public void answerToQuestion(Answer answer, long questionId, String userId) throws ExamBusinessException {
		//check values
		//if not valid : throw exception?
		
		//main logic part
		//checks if the question exists in db, same for user
		//	first : check if there's an id
		//  call dao.getById(obj) to check if it there
		
		//otherwise : throw exception?
		
		//Assigning user and questions to the answer
		User user = userDAO.getById(userId);
//		System.out.println(user.getLoginName());
		answer.setUser(user);
		Question question = questionDAO.getById(questionId);
//		System.out.println(question.getId());
		answer.setQuestion(question);
		
		answerDAO.create(answer);	
		
	}
	
	@Transactional(value = TxType.REQUIRED)
	public void mcqAnswerToQuestion(List<MCQChoice> choices, long questionId, String userId) throws ExamBusinessException {
		//check values
		//if not valid : throw exception?
		
		//main logic part
		//checks if the question exists in db, same for user
		//	first : check if there's an id
		//  call dao.getById(obj) to check if it there
		
		//otherwise : throw exception?
		
		//Assigning user and questions to the answer
		User user = userDAO.getById(userId);
//		System.out.println(user.getLoginName());
		
		Question question = questionDAO.getById(questionId);
//		System.out.println(question.getId());
		
		for(MCQChoice choice: choices) {

			MCQAnswer answer = new MCQAnswer();
			answer.setUser(user);
			answer.setQuestion(question);
			answer.setChoice(choice);
			mcqAnswerDAO.create(answer);	
		}
		
		
		
	}
	
	@Transactional(value = TxType.REQUIRED)
	public List<Answer> getUserAnswer(String userId){
		List<Answer> answers = new ArrayList<Answer>();
		for(Answer answer: answerDAO.all()) {
			if(answer.getUser().getLoginName().equals(userId)) {
				answers.add(answer);
			}
		}
		return answers;
	}
	
	@Transactional(value = TxType.REQUIRED)
	public List<MCQAnswer> getUserMCQAnswer(String userId){
		List<MCQAnswer> answers = new ArrayList<MCQAnswer>();
		for(MCQAnswer answer: mcqAnswerDAO.all()) {
			if(answer.getUser().getLoginName().equals(userId)) {
				answers.add(answer);
			}
		}
		return answers;
	}
	
}
