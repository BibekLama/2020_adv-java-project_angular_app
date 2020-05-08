package bibek.epita.quiz.resources;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.web.bind.annotation.RequestBody;

import bibek.epita.quiz.datamodel.Answer;
import bibek.epita.quiz.datamodel.MCQAnswer;
import bibek.epita.quiz.datamodel.MCQChoice;
import bibek.epita.quiz.datamodel.Question;
import bibek.epita.quiz.datamodel.User;
import bibek.epita.quiz.resources.DTOs.AnswerDTO;
import bibek.epita.quiz.resources.DTOs.MCQAnswerDTO;
import bibek.epita.quiz.resources.DTOs.MCQChoiceDTO;
import bibek.epita.quiz.services.business.ExamBusinessException;
import bibek.epita.quiz.services.business.ExamDataService;

@Path("/exam")
public class ExamResource {
	
	@Inject
	ExamDataService examDS;
	
	@POST
	@Path("/answer")
	@Consumes(value = MediaType.APPLICATION_JSON)
	public Response addAnswerToQuestion(@RequestBody AnswerDTO answerDTO) {
		try {
			
			Answer answer = new Answer();
			answer.setContent(answerDTO.getContent());
			
			long question = answerDTO.getQuestion();
			
			String user = answerDTO.getUser().getLoginName();
		
			examDS.answerToQuestion(answer,question,user);
			
			return Response.ok("success").build();
			
		} catch (ExamBusinessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return Response.serverError().build();
	
	}
	
	@POST
	@Path("/mcqanswer")
	@Consumes(value = MediaType.APPLICATION_JSON)
	public Response addMcqAnswerToQuestion(@RequestBody MCQAnswerDTO mcqAnswerDTO) {
		try {
			
			MCQAnswer mcqAnswer = new MCQAnswer();
			List<MCQChoice> choices = new ArrayList<MCQChoice>();
			for(MCQChoiceDTO choiceDTO: mcqAnswerDTO.getChoices()) {
				MCQChoice choice = new MCQChoice();
				choice.setChoice(choiceDTO.getChoice());
				choice.setId(choiceDTO.getId());
				choices.add(choice);
			}
			long question = mcqAnswerDTO.getQuestion();
			
			String user = mcqAnswerDTO.getUser().getLoginName();
		
			examDS.mcqAnswerToQuestion(choices,question,user);
			
			return Response.ok("success").build();
			
		} catch (ExamBusinessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return Response.serverError().build();
	
	}
	
	@GET
	@Path("/answer/{id}")
	@Produces(value = MediaType.APPLICATION_JSON)
	public Response getAnswer(@PathParam("id") long answerId) {
		//beginning dummy implementation
		Answer answer = new Answer();
		answer.setContent("This is a sampleAnswer with id " + answerId);
		answer.setId(answerId);
		return Response.ok(answer).build();
	}
	
	@GET
	@Path("/answer")
	@Produces(value = MediaType.APPLICATION_JSON)
	public Response getAnswers() {
		
		//beginning dummy implementation
		Answer answer = new Answer();
		answer.setContent("This is a sampleAnswer");
		
		return Response.ok(Arrays.asList(answer)).build();
	}
	
	@GET
	@Path("/user/{id}/answer")
	@Produces(value = MediaType.APPLICATION_JSON)
	public Response getUserAnswer(@PathParam("id") String userId) {
		List<AnswerDTO> answerDTOs = new ArrayList<AnswerDTO>();
		for(Answer answer: examDS.getUserAnswer(userId)) {
//			System.out.println(answer.getUser().getLoginName());
			AnswerDTO answerDTO = new AnswerDTO(answer);
			answerDTOs.add(answerDTO);
		}
		
		return Response.ok(answerDTOs).build();
	}
	
	@GET
	@Path("/user/{id}/mcqanswer")
	@Produces(value = MediaType.APPLICATION_JSON)
	public Response getUserMCQAnswer(@PathParam("id") String userId) {
		List<MCQAnswerDTO> answerDTOs = new ArrayList<MCQAnswerDTO>();
		for(MCQAnswer answer: examDS.getUserMCQAnswer(userId)) {
//			System.out.println(answer.getUser().getLoginName());
			List<MCQAnswerDTO> choiceDTOs = new ArrayList<MCQAnswerDTO>();
			
			MCQAnswerDTO answerDTO = new MCQAnswerDTO(answer);
			answerDTOs.add(answerDTO);
		}
		
		return Response.ok(answerDTOs).build();
	}
	
	
	//@PUT
	
	//@DELETE
	

}