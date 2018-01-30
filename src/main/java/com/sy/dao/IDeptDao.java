package com.sy.dao;

import com.sy.pojo.Dept;

import java.util.List;

/**
 * Created by haswell on 2018/1/25.
 */
public interface IDeptDao {

    Dept selectByPrimaryKey(Integer id);
    List<Dept> getListById(Integer deptId);
}
