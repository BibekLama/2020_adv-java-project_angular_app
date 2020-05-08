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

import bibek.epita.quiz.datamodel.User;
import bibek.epita.quiz.resources.DTOs.UserDTO;
import bibek.epita.quiz.services.business.UserDataService;

@Path("/user")
public class UserResource {
	
	@Inject
	UserDataService ds;
	
	@POST
	@Path("/add")
	@Consumes(value = MediaType.APPLICATION_JSON)
	@Produces(value = MediaType.APPLICATION_JSON)
	public Response addQuestion(@RequestBody UserDTO userDTO) {
		try {
			System.out.println(userDTO.getEmail());
			User user = new User();
			user.setLoginName(userDTO.getLoginName());
			user.setEmail(userDTO.getEmail());
			ds.addUser(user);
			return Response.ok(user).build();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return Response.serverError().build();
	}
	
	@POST
	@Path("/update")
	@Consumes(value = MediaType.APPLICATION_JSON)
	@Produces(value = MediaType.APPLICATION_JSON)
	public Response updateUser(@RequestBody User user) {
		try{
			ds.updateUser(user);	
			return Response.ok(Arrays.asList(user)).build();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return Response.serverError().build();
	}
	
	@GET
	@Path("/{loginName}")
	@Produces(value = MediaType.APPLICATION_JSON)
	public Response getUser(@PathParam("loginName") String loginName) {
		try {
			User user = ds.getUser(loginName);
			UserDTO userDTO = new UserDTO(user);
			return Response.ok(userDTO).build();
		}catch(Exception e) {
			e.printStackTrace();
			return Response.ok(e.getMessage()).build();
		}
		
	}
	
	@DELETE
	@Path("/delete/{id}")
	@Produces(value = MediaType.APPLICATION_JSON)
	public Response deleteUser(@PathParam("id") String id) {
		try {
			ds.deleteUser(id);
			return Response.ok(Arrays.asList(ds.getUser(id))).build();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return Response.serverError().build();
	}
	
	@GET
	@Path("/users")
	@Produces(value = MediaType.APPLICATION_JSON)
	public Response allUsers(){
		try {
			List<UserDTO> userDTOs = new ArrayList<UserDTO>();
			for(User user: ds.getUsers()) {
				UserDTO userDTO = new UserDTO(user);
				userDTOs.add(userDTO);
			}
			return Response.ok(userDTOs).build();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return Response.serverError().build();
	}
}
