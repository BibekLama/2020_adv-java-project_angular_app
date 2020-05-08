package bibek.epita.quiz.resources.DTOs;

import bibek.epita.quiz.datamodel.Question;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import bibek.epita.quiz.datamodel.Answer;
import bibek.epita.quiz.datamodel.MCQAnswer;
import bibek.epita.quiz.datamodel.MCQChoice;

public class QuestionDTO {
	private long id;
	
	private String title;
	
	private String type;
	
	private QuizDTO quiz;
	
	private List<MCQChoiceDTO> choices;
	
	public QuestionDTO() {}
	
	public QuestionDTO(Question entity) {
		this.id = entity.getId();
		this.title = entity.getTitle();
		this.type = entity.getType();
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<MCQChoiceDTO> getChoices() {
		return choices;
	}

	public void setChoices(List<MCQChoiceDTO> choices) {
		this.choices = choices;
	}

	public QuizDTO getQuiz() {
		return quiz;
	}

	public void setQuiz(QuizDTO quiz) {
		this.quiz = quiz;
	}
}
