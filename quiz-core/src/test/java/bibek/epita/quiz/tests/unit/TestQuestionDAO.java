package bibek.epita.quiz.tests.unit;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.inject.Inject;
import javax.sql.DataSource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;

import bibek.epita.quiz.datamodel.Question;
import bibek.epita.quiz.services.dao.QuestionDAO;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "/applicationContext.xml")
public class TestQuestionDAO {
	
	private static final Logger LOGGER = LogManager.getLogger(TestQuestionDAO.class);

	@Inject
	QuestionDAO dao;

	@Inject
	DataSource ds;
	
	@Test
	public void testCreateMethod() {

		//given
		Question question = new Question();
		
		//when
		dao.create(question);

		LOGGER.info("question id {}", question.getId());
		
		//then
		try (Connection connection = ds.getConnection();
				PreparedStatement stmt = connection.prepareStatement("select count(1) from QUESTIONS");
				ResultSet rs = stmt.executeQuery();) {
			rs.next();
			int count = rs.getInt(1);
			Assert.assertEquals(1, count);
		} catch (Exception e) {
			LOGGER.error("Some exception occured while performing count verification", e);
		}
	
	}
}
