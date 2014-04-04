package ru.qiwi.hackathon.map;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import qiwi.core.persistence.EntityCreator;
import ru.osmp.common.db.Database;
import ru.osmp.common.db.Pools;
import ru.osmp.common.db.creation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Singleton
public class LoadPointsProcessor extends HttpServlet {

	@Inject
	private Database database;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			List<ObjectEntity> result = database.createBy(
					ListCreator.by(EntityCreator.of(ObjectEntity.class)))
					.pooled(Pools.MAIN)
					.sql(prepareSQL(request))
					.arguments(
							request.getParameter("floor")
					)
					.call();

			response.setCharacterEncoding("utf-8");
			response.setContentType("application/json; charset=utf-8");
			response.getWriter().println(result);
			response.getWriter().flush();
		} catch (Exception e) {
			System.out.println("Failed to load points");
		}
	}

	private String prepareSQL(HttpServletRequest request) {
		String filters = request.getParameter("filters");

		return SQL.LOAD_POINTS
				.replace("{filters}", filters.equals("") ? "" : "and hqo_type not in (" + filters + ")");
	}
}
