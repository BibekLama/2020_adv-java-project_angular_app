package bibek.epita.quiz.services.dao;

import java.util.Map;

import bibek.epita.quiz.datamodel.Question;

public class QuestionDAO extends GenericDAO<Question, Long>{

	@Override
	public String getQuery() {
		return "from Question where LOWER(title) LIKE '%' || :pTitle ||'%'";
	}

	@Override
	public void setParameters(Map<String, Object> parameters, Question criteria) {
		parameters.put("pTitle", criteria.getTitle());
	}

	@Override
	public Class<Question> getEntityClass() {
		return Question.class;
	}

	@Override
	public String getAllQuery() {
		// TODO Auto-generated method stub
		return "from Question";
	}

}
