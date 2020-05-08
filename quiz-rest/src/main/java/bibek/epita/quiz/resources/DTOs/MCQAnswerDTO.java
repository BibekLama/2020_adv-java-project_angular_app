package bibek.epita.quiz.resources.DTOs;

import java.util.List;

import bibek.epita.quiz.datamodel.MCQAnswer;
import bibek.epita.quiz.datamodel.MCQChoice;
import bibek.epita.quiz.datamodel.Question;
import bibek.epita.quiz.datamodel.User;

public class MCQAnswerDTO {
	private long id;
	private List<MCQChoiceDTO> choices;
	private long question;
	private User user;
	
	public MCQAnswerDTO() {}
	
	public MCQAnswerDTO(MCQAnswer mcqAnswer) {
		this.id = mcqAnswer.getId();
		this.question = mcqAnswer.getQuestion().getId();
		this.user = mcqAnswer.getUser();
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
	public long getQuestion() {
		return question;
	}
	public void setQuestion(long question) {
		this.question = question;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public List<MCQChoiceDTO> getChoices() {
		return choices;
	}
	public void setChoices(List<MCQChoiceDTO> choices) {
		this.choices = choices;
	}

}
