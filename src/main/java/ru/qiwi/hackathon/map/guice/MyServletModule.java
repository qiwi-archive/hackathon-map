package ru.qiwi.hackathon.map.guice;

import com.google.inject.servlet.ServletModule;
import ru.qiwi.hackathon.map.HelloServlet;

public class MyServletModule extends ServletModule {

	@Override
	protected void configureServlets() {
		serve("/hello").with(HelloServlet.class);
	}
}
