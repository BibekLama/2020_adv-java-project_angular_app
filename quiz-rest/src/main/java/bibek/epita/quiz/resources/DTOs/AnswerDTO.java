package bibek.epita.quiz.resources.DTOs;

import bibek.epita.quiz.datamodel.Answer;
import bibek.epita.quiz.datamodel.Question;
import bibek.epita.quiz.datamodel.User;

public class AnswerDTO {
	private long id;
	
	private String content;
	
	private long question;
	
	private User user;
	
	public AnswerDTO() {}
	
	public AnswerDTO(Answer entity) {
		this.content = entity.getContent();
		this.question = entity.getQuestion().getId();
		this.user = entity.getUser();
	}
	
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public long getQuestion() {
		return question;
	}
	public void setQuestion(long question) {
		this.question = question;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}
