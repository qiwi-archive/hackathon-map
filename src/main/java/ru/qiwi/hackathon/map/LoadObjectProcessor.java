package ru.qiwi.hackathon.map;

import com.google.inject.Inject;
import com.google.inject.Singleton;
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
public class LoadObjectProcessor extends HttpServlet {

	@Inject
	private Database database;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			PersonEntity personEntity = database.createBy(
					EntityCreator.of(PersonEntity.class))
					.pooled(Pools.MAIN)
					.sql(SQL.LOAD_OBJECT)
					.arguments(
							request.getParameter("objectId")
					)
					.call();

			response.setCharacterEncoding("utf-8");
			response.setContentType("application/json; charset=utf-8");
			response.getWriter().println(personEntity);
			response.getWriter().flush();
		} catch (Exception e) {
			System.out.println("Failed to load object");
		}
	}
}
