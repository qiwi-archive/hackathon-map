package ru.qiwi.hackathon.map;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.mortbay.util.ajax.JSON;
import org.mortbay.util.ajax.JSONObjectConvertor;
import qiwi.core.persistence.EntityCreator;
import qiwi.util.codec.JsonEncoder;
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
public class HQServlet extends HttpServlet {

	@Inject
	private Database database;


	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			List<ObjectEntity> result = database.createBy(
					ListCreator.by(EntityCreator.of(ObjectEntity.class)))
					.pooled(Pools.MAIN)
					.sql(" select * from hq_object o\n" +
							"  join hq_place p\n" +
							"    on p.hqpl_id = o.hqo_place\n" +
							"  join hq_point2place p2p\n" +
							"    on p2p.hq_p2p_place = p.hqpl_id\n" +
							"  join hq_point pt\n" +
							"    on pt.hqpt_id = p2p.hq_p2p_point")
					.call();

			response.getWriter().println();
			response.getWriter().flush();
		} catch (Exception e) {
			System.out.println("Fail hello");
		}
	}
}
