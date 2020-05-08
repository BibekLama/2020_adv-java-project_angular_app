package bibek.epita.quiz.services.dao;

import java.util.Map;

import bibek.epita.quiz.datamodel.Answer;

public class AnswerDAO extends GenericDAO<Answer, Long>{

	@Override
	public String getQuery() {
		return "from Answer where loginName = :id";
	}

	@Override
	public void setParameters(Map<String, Object> parameters, Answer criteria) {
		parameters.put("id",criteria.getUser().getLoginName());
	}

	@Override
	public Class<Answer> getEntityClass() {
		return Answer.class;
	}

	@Override
	public String getAllQuery() {
		// TODO Auto-generated method stub
		return "from Answer";
	}

}
