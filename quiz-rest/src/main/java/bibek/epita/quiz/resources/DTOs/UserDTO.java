package bibek.epita.quiz.resources.DTOs;

import bibek.epita.quiz.datamodel.User;

public class UserDTO {
	String loginName;
	String email;
	
	public UserDTO() {}
	
	public UserDTO(User user) {
		this.loginName = user.getLoginName();
		this.email = user.getEmail();
	}
	public String getLoginName() {
		return loginName;
	}
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
}
