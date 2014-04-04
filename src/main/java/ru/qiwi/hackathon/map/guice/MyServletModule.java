package ru.qiwi.hackathon.map.guice;

import com.google.inject.servlet.ServletModule;
import ru.qiwi.hackathon.map.LoadObjectProcessor;
import ru.qiwi.hackathon.map.LoadPointsProcessor;
import ru.qiwi.hackathon.map.SearchProcessor;

public class MyServletModule extends ServletModule {

	@Override
	protected void configureServlets() {
		serve("/api/load_points").with(LoadPointsProcessor.class);
		serve("/api/load_object").with(LoadObjectProcessor.class);
		serve("/api/search").with(SearchProcessor.class);
	}
}
