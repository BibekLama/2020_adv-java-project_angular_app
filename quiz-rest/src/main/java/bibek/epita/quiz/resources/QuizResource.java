package bibek.epita.quiz.resources;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PATCH;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.web.bind.annotation.RequestBody;

import bibek.epita.quiz.datamodel.MCQChoice;
import bibek.epita.quiz.datamodel.Question;
import bibek.epita.quiz.datamodel.Quiz;
import bibek.epita.quiz.resources.DTOs.MCQChoiceDTO;
import bibek.epita.quiz.resources.DTOs.QuestionDTO;
import bibek.epita.quiz.resources.DTOs.QuizDTO;
import bibek.epita.quiz.services.business.QuizDataService;

@Path("/quiz")
public class QuizResource {
	@Inject
	QuizDataService quizDataService;
	
	@POST
	@Path("/add")
	@Consumes(value = MediaType.APPLICATION_JSON)
	@Produces(value = MediaType.APPLICATION_JSON)
	public Response addQuiz(@RequestBody QuizDTO quizDTO) {
		try {
			Quiz quiz = new Quiz();
			quiz.setTitle(quizDTO.getTitle());
			quiz.setCode(quizDTO.getCode());
			List<Question> questions = new ArrayList<Question>();
			for(QuestionDTO questDTO: quizDTO.getQuestions()) {
				Question quest = new Question();
				quest.setTitle(questDTO.getTitle());
				quest.setType(questDTO.getType());
				quest.setQuiz(quiz);
				List<MCQChoice> choices = new ArrayList<MCQChoice>();
				for(MCQChoiceDTO mcqChoiceDTO: questDTO.getChoices()) {
					MCQChoice choice = new MCQChoice();
					choice.setChoice(mcqChoiceDTO.getChoice());
					choice.setCorrect(mcqChoiceDTO.getCorrect());
					choice.setQuestion(quest);
					choices.add(choice);
				}
				quest.setMcqChoices(choices);
				questions.add(quest);
			}
			quiz.setQuestions(questions);
			quizDataService.addQuiz(quiz);
			return Response.ok(Arrays.asList(quiz)).build();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return Response.serverError().build();
	
	}
	
	@GET
	@Path("/quizs")
	@Produces(value = MediaType.APPLICATION_JSON)
	public Response allQuizs(){
		try {
			
			List<QuizDTO> quizDTOs = new ArrayList<QuizDTO>();
			for(Quiz quiz: quizDataService.allQuizs()) {
				QuizDTO quizDTO = new QuizDTO(quiz);
				List<QuestionDTO> questionDTOs = new ArrayList<QuestionDTO>();
				for(Question question : quiz.getQuestions()) {
					QuestionDTO questDTO = new QuestionDTO(question);
					List<MCQChoiceDTO> choicesDTOs = new ArrayList<MCQChoiceDTO>();
					for(MCQChoice choice : question.getMcqChoices()) {
						MCQChoiceDTO chs = new MCQChoiceDTO(choice);
						choicesDTOs.add(chs);
					}
					QuizDTO qDTO = new QuizDTO(quiz);
					questDTO.setQuiz(qDTO);
					questDTO.setChoices(choicesDTOs);
					questionDTOs.add(questDTO);
				}
				quizDTO.setQuestions(questionDTOs);
				quizDTOs.add(quizDTO);
			}
			
			return Response.ok(quizDTOs).build();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return Response.serverError().build();
	}
	
	@POST
	@Path("/edit")
	@Consumes(value = MediaType.APPLICATION_JSON)
	@Produces(value = MediaType.APPLICATION_JSON)
	public Response updateQuiz(@RequestBody QuizDTO quizDTO) {
		System.out.println(quizDTO.getId());
		try {
			Quiz quiz = new Quiz();
			quiz.setId(quizDTO.getId());
			quiz.setTitle(quizDTO.getTitle());
			quiz.setCode(quizDTO.getCode());
			List<Question> questions = new ArrayList<Question>();
			for(QuestionDTO questDTO: quizDTO.getQuestions()) {
				Question quest = new Question();
				quest.setId(questDTO.getId());
				quest.setTitle(questDTO.getTitle());
				quest.setType(questDTO.getType());
				List<MCQChoice> choices = new ArrayList<MCQChoice>();
				for(MCQChoiceDTO mcqChoiceDTO: questDTO.getChoices()) {
					MCQChoice choice = new MCQChoice();
					choice.setId(mcqChoiceDTO.getId());
					choice.setChoice(mcqChoiceDTO.getChoice());
					choice.setCorrect(mcqChoiceDTO.getCorrect());
					choices.add(choice);
				}
				quest.setMcqChoices(choices);
				questions.add(quest);
			}
			quiz.setQuestions(questions);
			quizDataService.updateQuiz(quiz);
			return Response.ok(Arrays.asList(quiz)).build();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return Response.serverError().build();
	
	}
	
	@DELETE
	@Path("/delete/{id}")
	@Produces(value = MediaType.APPLICATION_JSON)
	public Response deleteQuestion(@PathParam("id") long id) {
		try {
			quizDataService.deleteQuiz(id);
			return Response.ok(Arrays.asList("success")).build();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return Response.serverError().build();
	}
	
	@GET
	@Path("/search/{title}")
	@Produces(value = MediaType.APPLICATION_JSON)
	public Response searchQuizs(@PathParam("title") String title){
		try {
			
			List<QuizDTO> quizDTOs = new ArrayList<QuizDTO>();
			Quiz q = new Quiz();
			q.setTitle(title);
			for(Quiz quiz: quizDataService.searchQuizs(q)) {
				QuizDTO quizDTO = new QuizDTO(quiz);
				quizDTOs.add(quizDTO);
			}
			
			return Response.ok(quizDTOs).build();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return Response.serverError().build();
	}
	
	@GET
	@Path("/q/{id}")
	@Produces(value = MediaType.APPLICATION_JSON)
	public Response getQuiz(@PathParam("id") long id){
		try {
			Quiz quiz = quizDataService.getQuiz(id);
			List<QuestionDTO> questionDTOs = new ArrayList<QuestionDTO>();
			for(Question question : quiz.getQuestions()) {
				QuestionDTO questDTO = new QuestionDTO(question);
				List<MCQChoiceDTO> choicesDTOs = new ArrayList<MCQChoiceDTO>();
				for(MCQChoice choice : question.getMcqChoices()) {
					MCQChoiceDTO chs = new MCQChoiceDTO(choice);
					choicesDTOs.add(chs);
				}
				questDTO.setChoices(choicesDTOs);
				questionDTOs.add(questDTO);
			}
			QuizDTO quizDTO = new QuizDTO(quiz);
			quizDTO.setQuestions(questionDTOs);
			return Response.ok(quizDTO).build();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return Response.serverError().build();
	}
}
