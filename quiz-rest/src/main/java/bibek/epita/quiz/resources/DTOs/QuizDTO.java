package bibek.epita.quiz.resources.DTOs;

import java.util.ArrayList;
import java.util.List;

import bibek.epita.quiz.datamodel.Question;
import bibek.epita.quiz.datamodel.Quiz;

public class QuizDTO {
	private long id;
	private String title;
	private String code;
	private List<QuestionDTO> questions;
	public QuizDTO() {}
	
	public QuizDTO(Quiz entity) {
		this.id = entity.getId();
		this.title = entity.getTitle();
		this.code = entity.getCode();
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public List<QuestionDTO> getQuestions() {
		return questions;
	}

	public void setQuestions(List<QuestionDTO> questions) {
		this.questions = questions;
	}
}
