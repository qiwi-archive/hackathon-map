package ru.qiwi.hackathon.map;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import ru.osmp.common.db.Database;
import ru.osmp.common.db.Pools;
import ru.osmp.common.db.creation.StringReader;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Singleton
public class HelloServlet extends HttpServlet {

	@Inject
	private Database database;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			response.getWriter().println(database.createBy(StringReader.DEFAULT).pooled(Pools.MAIN).sql("select * from dual").call());
			response.getWriter().flush();
		} catch (Exception e) {
			System.out.println("Fail hello");
		}
	}
}
