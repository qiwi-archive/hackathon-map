package ru.qiwi.hackathon.map;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.apache.log4j.Logger;
import qiwi.core.persistence.EntityCreator;
import ru.osmp.common.db.Database;
import ru.osmp.common.db.Pools;
import ru.osmp.common.db.creation.ListCreator;
import ru.qiwi.hackathon.map.domain.ObjectType;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Singleton
public class TypeListProcessor extends HttpServlet {

	@Inject
	private Database database;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			response.setCharacterEncoding("utf-8");
			response.setContentType("application/json; charset=utf-8");
			List<ObjectType> typeList = database.createBy(ListCreator.by(EntityCreator.of(ObjectType.class)))
					.pooled(Pools.MAIN)
					.sql(SQL.TYPE_LIST)
					.call();
			response.getWriter().println(typeList);
		} catch (Exception e) {
			log.error("Exception during list type: " + e.getLocalizedMessage());
			response.getWriter().println("{\"success\": \"false\", \"error\": \"" + mask(e.getLocalizedMessage()) + "\"}");
		} finally {
			response.getWriter().flush();
		}
	}

	private String mask(String s) {
		return s.replaceAll("\"", "\\\\\"");
	}

	private static final Logger log = Logger.getLogger(TypeListProcessor.class);
}
