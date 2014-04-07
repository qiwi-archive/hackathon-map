package ru.qiwi.hackathon.map;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.apache.log4j.Logger;
import ru.osmp.common.db.Database;
import ru.osmp.common.db.Pools;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Singleton
public class AddProcessor extends HttpServlet {

	@Inject
	private Database database;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			response.setCharacterEncoding("utf-8");
			response.setContentType("application/json; charset=utf-8");
			database.call()
					.pooled(Pools.MAIN)
					.sql(SQL.ADD)
					.arguments(
							Double.parseDouble(request.getParameter("x")),
							Double.parseDouble(request.getParameter("y")),
							Integer.parseInt(request.getParameter("floor")),
							request.getParameter("name"),
							Integer.parseInt(request.getParameter("type"))
					)
					.call();
			addLogger.info("Added: " +
					"name: " + request.getParameter("name") +
					"\t, x: " + request.getParameter("x") +
					"\t, y: " + request.getParameter("y") +
					"\t, floor: " + request.getParameter("floor") +
					"\t, type: " + request.getParameter("type")
			);
			response.getWriter().println("{\"success\": \"true\"}");
		} catch (Exception e) {
			log.error("Exception during add: " + e.getLocalizedMessage());
			response.getWriter().println("{\"success\": \"false\", \"error\": \"" + mask(e.getLocalizedMessage()) + "\"}");
		} finally {
			response.getWriter().flush();
		}
	}

	private String mask(String s) {
		return s.replaceAll("\"", "\\\\\"");
	}

	private static final Logger log = Logger.getLogger(AddProcessor.class);
	private static final Logger addLogger = Logger.getLogger("add");
}
