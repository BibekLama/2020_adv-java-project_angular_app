package bibek.epita.quiz.tests.unit;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.transaction.Transactional.TxType;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import bibek.epita.quiz.datamodel.Question;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "/applicationContext.xml")
public class TestHibernate {
	
	@PersistenceContext
	EntityManager em;
	
	@Test
	@Transactional(value = TxType.REQUIRED)
	public void testFirstSessionFactory() {
		Question question = new Question();
		question.setTitle("What is a dependency?");
		em.persist(question);
		
		Assert.assertNotNull(question.getId().longValue());
	}

}
