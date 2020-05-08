package bibek.epita.quiz.services.business;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.transaction.Transactional.TxType;

import bibek.epita.quiz.datamodel.Answer;
import bibek.epita.quiz.datamodel.MCQAnswer;
import bibek.epita.quiz.datamodel.MCQChoice;
import bibek.epita.quiz.datamodel.Question;
import bibek.epita.quiz.datamodel.Quiz;
import bibek.epita.quiz.services.dao.QuestionDAO;
import bibek.epita.quiz.services.dao.QuizDAO;

public class QuestionDataService {
	@Inject
	QuestionDAO questionDAO;
	
	@Inject
	QuizDAO quizDAO;
	
	@Transactional(value = TxType.REQUIRED)
	public void addQuestion(Question question) {
		questionDAO.create(question);
		
		Quiz q = quizDAO.getById(question.getQuiz().getId());
		Quiz quiz = new Quiz();
		quiz.setId(q.getId());
		quiz.setTitle(q.getTitle());
		quiz.setCode(q.getCode());
		List<Question> questions = q.getQuestions();
		
		if(questions != null) {	
			questions.add(question);
			quiz.setQuestions(questions);
		}else {
			List<Question> quests = new ArrayList<Question>();
			quests.add(question);
			quiz.setQuestions(quests);
		}
		
		quizDAO.update(quiz);
	}
	
	@Transactional(value = TxType.REQUIRED)
	public void updateQuestion(Question question) {
		questionDAO.update(question);
	}
	
	@Transactional(value = TxType.REQUIRED)
	public void deleteQuestion(long id) {
		questionDAO.delete(id);
	}
	
	@Transactional(value = TxType.REQUIRED)
	public Question getQuestion(long id) {
		return questionDAO.getById(id);
	}
	
	@Transactional(value = TxType.REQUIRED)
	public List<Question> allQuestions() {
		List<Question> questions = new ArrayList<Question>();
		
		for(Question question: questionDAO.all()) {
			if(question.getMcqChoices().size() > 0) {
				List<MCQChoice> mcqchoices = new ArrayList<MCQChoice>();
				for(MCQChoice mcqchoice: question.getMcqChoices()) {
					mcqchoices.add(mcqchoice);
				}
				question.setMcqChoices(mcqchoices);
			}
			questions.add(question);
		}
		return questions;
	}
	
	@Transactional(value = TxType.REQUIRED)
	public List<Question> searchQuestion(Question q) {
		List<Question> questions = new ArrayList<Question>();
		
		for(Question question: questionDAO.search(q)) {
//			System.out.println(question.getId());
			if(question.getMcqChoices().size() > 0) {
				List<MCQChoice> mcqchoices = new ArrayList<MCQChoice>();
				for(MCQChoice mcqchoice: question.getMcqChoices()) {
					mcqchoices.add(mcqchoice);
				}
				question.setMcqChoices(mcqchoices);
			}
			questions.add(question);
		}
		return questions;
	}
	
}
