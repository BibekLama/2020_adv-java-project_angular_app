package bibek.epita.quiz.services.dao;

import java.util.Map;

import bibek.epita.quiz.datamodel.MCQAnswer;

public class MCQAnswerDAO extends GenericDAO<MCQAnswer, Long>{

	@Override
	public String getQuery() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getAllQuery() {
		// TODO Auto-generated method stub
		return "from MCQAnswer";
	}

	@Override
	public Class<MCQAnswer> getEntityClass() {
		// TODO Auto-generated method stub
		return MCQAnswer.class;
	}

	@Override
	public void setParameters(Map<String, Object> parameters, MCQAnswer criteria) {
		// TODO Auto-generated method stub
		
	}

}
