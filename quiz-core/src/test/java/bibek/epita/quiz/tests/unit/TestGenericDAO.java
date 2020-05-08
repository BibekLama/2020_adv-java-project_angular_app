package bibek.epita.quiz.tests.unit;

import bibek.epita.quiz.datamodel.Question;
import bibek.epita.quiz.services.dao.QuestionDAO;

public class TestGenericDAO {
	public void testGenericDAO() {
		QuestionDAO dao = new QuestionDAO();
		dao.create(new Question());
	}
}
