package ru.qiwi.hackathon.map;

public class SQL {

	static final String LOAD_POINTS = " select * " +
			"from hq_object o\n" +
			"  join hq_place p\n" +
			"    on p.hqpl_id = o.hqo_place\n" +
			"  join hq_point2place p2p\n" +
			"    on p2p.hq_p2p_place = p.hqpl_id\n" +
			"  join hq_point pt\n" +
			"    on pt.hqpt_id = p2p.hq_p2p_point    \n" +
			"    where hqpt_floor = ?";

	static final String LOAD_OBJECT = "select * from hq_people_tmp where id = ?";

}
