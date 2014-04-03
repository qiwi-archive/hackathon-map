package ru.qiwi.hackathon.map.app;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.servlet.GuiceServletContextListener;
import org.apache.log4j.Logger;
import ru.qiwi.hackathon.map.guice.AppModule;
import ru.qiwi.hackathon.map.guice.MyServletModule;

import javax.servlet.ServletContextEvent;

public class ContextListener extends GuiceServletContextListener {

	private static final Logger logger = Logger.getLogger("app");

	private Injector injector;

	@Override
	public void contextInitialized(ServletContextEvent servletContextEvent) {
		logger.info("Context initialization starting...");
		try {
			injector = Guice.createInjector(new MyServletModule(), new AppModule());
			injector.getInstance(App.class).init();
		} catch (Exception e) {
			logger.error("Context initialization failed", e);
			System.exit(1);
		}
	}

	@Override
	public void contextDestroyed(ServletContextEvent servletContextEvent) {
		injector.getInstance(App.class).stop();
		logger.info("contextDestroyed");
	}

	@Override
	protected Injector getInjector() {
		return injector;
	}
}
