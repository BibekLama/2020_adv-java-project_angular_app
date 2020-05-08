package bibek.epita.quiz.services.business;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.transaction.Transactional.TxType;

import bibek.epita.quiz.datamodel.Answer;
import bibek.epita.quiz.datamodel.MCQChoice;
import bibek.epita.quiz.datamodel.Question;
import bibek.epita.quiz.datamodel.Quiz;
import bibek.epita.quiz.services.dao.QuizDAO;

public class QuizDataService {
	@Inject
	QuizDAO quizDAO;
	
	@Transactional(value = TxType.REQUIRED)
	public void addQuiz(Quiz quiz) {
		quizDAO.create(quiz);
	}
	
	@Transactional(value = TxType.REQUIRED)
	public void updateQuiz(Quiz quiz) {
		quizDAO.update(quiz);
	}
	
	@Transactional(value = TxType.REQUIRED)
	public void deleteQuiz(long id) {
		quizDAO.delete(id);
	}
	
	@Transactional(value = TxType.REQUIRED)
	public List<Quiz> allQuizs() {
		List<Quiz> quizs = new ArrayList<Quiz>();
		
		for(Quiz quiz: quizDAO.all()) {
			System.out.println(quiz.getId());
			if(quiz.getQuestions().size() > 0) {
				List<Question> questions = new ArrayList<Question>();
				for(Question question: quiz.getQuestions()) {
					List<MCQChoice> choices = new ArrayList<MCQChoice>();
					for(MCQChoice choice: question.getMcqChoices()) {
						choices.add(choice);
					}
					questions.add(question);
				}
				quiz.setQuestions(questions);
			}
			quizs.add(quiz);
		}
		return quizs;
	}
	
	@Transactional(value = TxType.REQUIRED)
	public List<Quiz> searchQuizs(Quiz q) {
		List<Quiz> quizs = new ArrayList<Quiz>();
		
		for(Quiz quiz: quizDAO.search(q)) {
			System.out.println(quiz.getId());
			if(quiz.getQuestions().size() > 0) {
				List<Question> questions = new ArrayList<Question>();
				for(Question question: quiz.getQuestions()) {
					List<MCQChoice> choices = new ArrayList<MCQChoice>();
					for(MCQChoice choice: question.getMcqChoices()) {
						choices.add(choice);
					}
					questions.add(question);
				}
				quiz.setQuestions(questions);
			}
			quizs.add(quiz);
		}
		return quizs;
	}
	
	@Transactional(value = TxType.REQUIRED)
	public Quiz getQuiz(long id) {
		Quiz quiz = quizDAO.getById(id);
		if(quiz.getQuestions().size() > 0) {
			List<Question> questions = new ArrayList<Question>();
			for(Question question: quiz.getQuestions()) {
				List<MCQChoice> choices = new ArrayList<MCQChoice>();
				for(MCQChoice choice: question.getMcqChoices()) {
					choices.add(choice);
				}
				questions.add(question);
			}
			quiz.setQuestions(questions);
		}
		return quiz;
	}
}
