package ru.qiwi.hackathon.map.guice;

import com.google.inject.servlet.ServletModule;
import ru.qiwi.hackathon.map.HQServlet;

public class MyServletModule extends ServletModule {

	@Override
	protected void configureServlets() {
		serve("/request.do").with(HQServlet.class);
	}
}
