package the_voice_of_people;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class MyListener implements ServletContextListener{
	 
		@Override
		public void contextDestroyed(ServletContextEvent arg0) {
			// on destroy
		}
	 
		@Override
		public void contextInitialized(ServletContextEvent arg0) {
			// at the beggining	
		}
	}