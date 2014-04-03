package ru.qiwi.hackathon.map.app;

import com.google.inject.Inject;
import ru.osmp.common.db.Pools;
import ru.osmp.common.pool.ConnectionPools;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class App {

	private final ConnectionPools connectionPools;

	@Inject
	protected App(ConnectionPools connectionPools) {
		this.connectionPools = connectionPools;
	}

	public void init() throws IOException {
		final Properties config = loadProperties();
		connectionPools.registerPool(Pools.MAIN, config.getProperty("jdbc.string"), config.getProperty("jdbc.user"), config.getProperty("jdbc.password"));
	}

	public void stop() {
		connectionPools.shutdown();
	}

	protected Properties loadProperties() throws IOException {
		Properties properties = new Properties();
		properties.load(new FileInputStream(System.getProperty("qiwi.app.config")));
		return properties;
	}
}
