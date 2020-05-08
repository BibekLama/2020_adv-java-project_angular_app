package bibek.epita.quiz.resources;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
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
import bibek.epita.quiz.services.business.QuestionDataService;

@Path("/question")
public class QuestionResource {
	
	@Inject
	QuestionDataService questionDataService;
	
	@POST
	@Path("/add")
	@Consumes(value = MediaType.APPLICATION_JSON)
	@Produces(value = MediaType.APPLICATION_JSON)
	public Response addQuestion(@RequestBody QuestionDTO questionDTO) {
		try {
			Question question = new Question();
			question.setTitle(questionDTO.getTitle());
			question.setType(questionDTO.getType());
			questionDataService.addQuestion(question);
			return Response.ok(Arrays.asList(question)).build();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return Response.serverError().build();
	
	}
	
	@GET
	@Path("/questions")
	@Produces(value = MediaType.APPLICATION_JSON)
	public Response allQuestion(){
		try {
			
			List<QuestionDTO> questionDTOs = new ArrayList<QuestionDTO>();
			for(Question question: questionDataService.allQuestions()) {
				QuestionDTO questionDTO = new QuestionDTO(question);
				questionDTOs.add(questionDTO);
			}
			
			return Response.ok(questionDTOs).build();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return Response.serverError().build();
	}
	
	@POST
	@Path("/edit")
	@Consumes(value = MediaType.APPLICATION_JSON)
	@Produces(value = MediaType.APPLICATION_JSON)
	public Response updateQuiz(@RequestBody QuestionDTO questionDTO) {
		try {
			Question question = new Question();
			question.setId(questionDTO.getId());
			question.setTitle(questionDTO.getTitle());
			question.setType(questionDTO.getType());
			questionDataService.updateQuestion(question);
			return Response.ok(Arrays.asList(question)).build();
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
			questionDataService.deleteQuestion(id);
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
			
			List<QuestionDTO> questionDTOs = new ArrayList<QuestionDTO>();
			Question quest = new Question();
			quest.setTitle(title);
			for(Question question: questionDataService.searchQuestion(quest)) {
				QuestionDTO questionDTO = new QuestionDTO(question);
				questionDTOs.add(questionDTO);
			}
			
			return Response.ok(questionDTOs).build();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return Response.serverError().build();
	}
	
	@GET
	@Path("/{id}")
	@Produces(value = MediaType.APPLICATION_JSON)
	public Response getQuiz(@PathParam("id") long id){
		try {
			Question question = questionDataService.getQuestion(id);
			System.out.println(question.getTitle());
			QuestionDTO questionDTO = new QuestionDTO(question);
			return Response.ok(questionDTO).build();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return Response.serverError().build();
	}
}
