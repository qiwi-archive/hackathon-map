package ru.qiwi.hackathon.map.guice;

import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import com.google.inject.name.Named;

public class AppModule extends AbstractModule {

	@Provides
	@Named("qiwi.app.module.name")
	protected String getModuleName() {
		return "map";
	}

	@Override
	protected void configure() {
		// nothing
	}
}
