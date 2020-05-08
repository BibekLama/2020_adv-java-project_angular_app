package bibek.epita.quiz.services.business;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.transaction.Transactional.TxType;

import bibek.epita.quiz.datamodel.User;
import bibek.epita.quiz.services.dao.UserDAO;

public class UserDataService {
	@Inject
	UserDAO userDao;
	
	@Transactional(value = TxType.REQUIRED)
	public void addUser(User user) {
		userDao.create(user);
	}
	
	@Transactional(value = TxType.REQUIRED)
	public void updateUser(User user) {
		userDao.update(user);
	}
	
	@Transactional(value = TxType.REQUIRED)
	public void deleteUser(String id) {
		userDao.delete(id);
	}
	
	@Transactional(value = TxType.REQUIRED)
	public User getUser(String loginName) {
//		System.out.println(loginName);
		return userDao.getById(loginName);
	}
	
	@Transactional(value = TxType.REQUIRED)
	public List<User> getUsers(){
		List<User> users = new ArrayList<User>();
		for(User user: userDao.all()) {
			users.add(user);
		}
		return users;
	}
	
}
