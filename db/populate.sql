declare
  xDelta number := -9;
  yDelta number := -923;
  xScale number := 87/(4374-9);
  yScale number := -17/(923 - 117);
  
  new_point hq_point.hqpt_id%type;
  new_place hq_place.hqpl_id%type;
  
  c_placetype_point hq_place_type.hqplt_id%type := 1; -- point
  
  c_objtype_workplace hq_object_type.hqot_id%type := 1; -- workplace
  c_objtype_human hq_object_type.hqot_id%type := 2; -- human
begin
  for rec in (select a.*, f.floor 
                from hq_places_tmp a
               cross join (select level + 2 floor from dual connect by level < 6) f) 
  loop
    insert into hq_point (hqpt_x, hqpt_y, hqpt_floor)
                  values ((rec.x + xDelta) * xScale, (rec.y + yDelta) * yScale, rec.floor)
               returning hqpt_id into new_point;
               
    insert into hq_place (hqpl_type) values (c_placetype_point)
      returning hqpl_id into new_place;
    
    insert into hq_point2place (hq_p2p_place, hq_p2p_point, hq_p2p_order)
                        values (new_place, new_point, 1);
                        
    insert into hq_object (hqo_place, hqo_type, hqo_name)
                   values (new_place, c_objtype_workplace, rec.place_num);
  end loop;

  for rec in (select * from hq_people_tmp)
  loop
    begin
      select p.hqpl_id
        into new_place
        from hq_object o
        join hq_place p
          on p.hqpl_id = o.hqo_place
        join hq_point2place p2p
          on p2p.hq_p2p_place = p.hqpl_id
        join hq_point pt
          on pt.hqpt_id = p2p.hq_p2p_point
       where o.hqo_type = c_objtype_workplace
         and pt.hqpt_floor = rec.floor
         and o.hqo_name = nvl(to_number(rec.place), 0);
    exception
      when no_data_found then begin
        null;
      end;
      when too_many_rows then begin
        null;
      end;
      when others then
        dbms_output.put_line(rec.fio);
        null;
    end;
       
    insert into hq_object (hqo_place, hqo_type, hqo_name)
                   values (new_place, c_objtype_human, 
                     rec.fio || '; ' || rec.tlf ||
                     '; ' || rec.email);
  end loop;
end;