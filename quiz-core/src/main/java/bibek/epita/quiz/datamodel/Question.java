package bibek.epita.quiz.datamodel;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;


@Entity
@Table(name="QUESTIONS")
public class Question{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(name="Q_TITLE")
	private String title;
	
	@Column(name="Q_TYPE")
	private String type;
	
	@OneToMany(cascade = CascadeType.ALL, targetEntity = MCQChoice.class)
	@JoinTable(name = "QUESTIONS_MCQ_CHOICES")
	List<MCQChoice> mcqChoices;
	
	@ManyToOne
	@JoinColumn(name="Q_QUIZ_FK")
	private Quiz quiz;
	
	public Question(){}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Quiz getQuiz() {
		return quiz;
	}

	public void setQuiz(Quiz quiz) {
		this.quiz = quiz;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<MCQChoice> getMcqChoices() {
		return mcqChoices;
	}

	public void setMcqChoices(List<MCQChoice> mcqChoices) {
		this.mcqChoices = mcqChoices;
	}
}
