package ru.qiwi.hackathon.map;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.apache.log4j.Logger;
import qiwi.core.persistence.EntityCreator;
import ru.osmp.common.db.Database;
import ru.osmp.common.db.Pools;
import ru.osmp.common.db.creation.ListCreator;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Singleton
public class SearchProcessor extends HttpServlet {

	@Inject
	private Database database;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			final String query = request.getParameter("query");
			List<ObjectEntity> result = database.createBy(ListCreator.by(EntityCreator.of(ObjectEntity.class)))
					.pooled(Pools.MAIN)
					.sql(SQL.SEARCH)
					.arguments(query)
					.call();
			response.setCharacterEncoding("utf-8");
			response.setContentType("application/json; charset=utf-8");
			response.getWriter().println(result);
			response.getWriter().flush();
		} catch (Exception e) {
			log.error("Exception during search", e);
		}
	}

	private static final Logger log = Logger.getLogger(SearchProcessor.class);
}
