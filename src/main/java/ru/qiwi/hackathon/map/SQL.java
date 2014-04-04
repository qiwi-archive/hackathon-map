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

	static final String SEARCH = "select * \n" +
			"  from hq_object o \n" +
			"  join hq_object_type ot on ot.hqot_id = o.hqo_type  \n" +
			"  join hq_place p on p.hqpl_id = o.hqo_place\n" +
			"  join hq_point2place p2p on p2p.hq_p2p_place = p.hqpl_id\n" +
			"  join hq_point pt on pt.hqpt_id = p2p.hq_p2p_point\n" +
			"where lower(o.hqo_name) like lower('%'||?||'%')\n" +
			"order by o.hqo_name, hqpt_floor asc";

	static final String ADD = "begin hq_map_pack.create_object(pi_x => ?, pi_y => ?, pi_floor => ?, pi_name => ?, pi_type => ?); end;";

	static final String TYPE_LIST = "select * from hq_object_type";
}
