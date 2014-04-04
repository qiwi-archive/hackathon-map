package ru.qiwi.hackathon.map.guice;

import com.google.inject.servlet.ServletModule;
import ru.qiwi.hackathon.map.LoadObjectProcessor;
import ru.qiwi.hackathon.map.LoadPointsProcessor;
import ru.qiwi.hackathon.map.SearchProcessor;

public class MyServletModule extends ServletModule {

	@Override
	protected void configureServlets() {
		serve("/load_points").with(LoadPointsProcessor.class);
		serve("/load_object").with(LoadObjectProcessor.class);
		serve("/search").with(SearchProcessor.class);
	}
}
