package bibek.epita.quiz.resources.DTOs;

import bibek.epita.quiz.datamodel.MCQChoice;

public class MCQChoiceDTO {
	private long id;
	
	private String choice;
	
	private Boolean correct;
	
	
	public MCQChoiceDTO() {
	}


	public MCQChoiceDTO(MCQChoice mcqChoice) {
		this.id = mcqChoice.getId();
		this.choice = mcqChoice.getChoice();
		this.correct = mcqChoice.getCorrect();
	}


	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public String getChoice() {
		return choice;
	}


	public void setChoice(String choice) {
		this.choice = choice;
	}


	public Boolean getCorrect() {
		return correct;
	}


	public void setCorrect(Boolean correct) {
		this.correct = correct;
	}
}
