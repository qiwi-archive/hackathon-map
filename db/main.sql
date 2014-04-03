drop table hq_object;

drop table hq_point2place;

drop table hq_place;

drop table hq_point;

drop table hq_object_type;

drop table hq_place_type;

drop sequence hq_point_pk;

drop sequence hq_place_pk;

--

create table hq_place_type
(
  hqplt_id number(3)
    constraint hq_place_type_pk primary key,
  hqplt_name varchar2(100)
    constraint hqplt_id_nn not null
);

insert into hq_place_type
     values (1, 'Point');

insert into hq_place_type
     values (2, 'Polyline');


insert into hq_place_type
     values (3, 'Polygon');

commit;

create table hq_object_type
(
  hqot_id number(10)
    constraint hq_object_type_pk primary key,
  hqot_name varchar2(100)
    constraint hqot_name_nn not null,
  hqot_description varchar2(1000)
);

insert into hq_object_type
     values (1, 'Workplace', 'Рабочее место');

insert into hq_object_type
     values (2, 'Human', 'Сотрудник');

insert into hq_object_type
     values (3, 'Flower Pot', '');

insert into hq_object_type
     values (4, 'Sleep Box', '');

commit;

create table hq_point
(
  hqpt_id number (10)
    constraint hq_point_pk primary key,
  hqpt_X number
    constraint hqpt_X_nn not null,
  hqpt_Y number
    constraint hqpt_Y_nn not null,
  hqpt_floor number
    constraint hqpt_floor_nn not null
);

create sequence hq_point_pk;

create or replace trigger hq_point_b_i
  before insert
  on hq_point for each row
begin
  if :new.hqpt_id is null then
    :new.hqpt_id := hq_point_pk.nextval;
  end if;
end hq_point_b_i;
/

create table hq_place
(
  hqpl_id number (10)
    constraint hq_place_pk primary key,
  hqpl_type number
    constraint hqpl_type_nn not null
    constraint hqpl_type_fk references hq_place_type(hqplt_id)
);

create sequence hq_place_pk;

create or replace trigger hq_place_b_i
  before insert
  on hq_place for each row
begin
  if :new.hqpl_id is null then
    :new.hqpl_id := hq_place_pk.nextval;
  end if;
end hq_place_b_i;
/

create table hq_point2place(
  hq_p2p_place number(10)
    constraint hq_p2p_place_nn not null
    constraint hq_p2p_place_fk references hq_place(hqpl_id),
  hq_p2p_point number(10)
    constraint hq_p2p_point_nn not null
    constraint hq_p2p_point_fk references hq_point(hqpt_id),
  hq_p2p_order number(10)
    constraint hq_p2p_order_nn not null,
  constraint hq_p2p_place_order_uq unique (hq_p2p_place, hq_p2p_order)
);


create table hq_object
(
  hqo_id number (10)
    constraint hq_object_pk primary key,
  hqo_place number(10)
    constraint hqo_place_nn not null
    constraint hqo_place_fk references hq_place(hqpl_id),
  hqo_type number(10) 
    constraint hqo_type_fk references hq_object_type(hqot_id),
  hqo_name varchar2(1000),
  hqo_description varchar2(1000)
);



