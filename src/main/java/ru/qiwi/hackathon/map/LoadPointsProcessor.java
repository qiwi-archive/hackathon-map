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
					.sql(SQL.LOAD_POINTS)
					.arguments(
						request.getParameter("floor")
					)
					.call();

			response.getWriter().println(result);
			response.getWriter().flush();
		} catch (Exception e) {
			System.out.println("Failed to load points");
		}
	}
}
