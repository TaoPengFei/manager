package com.sy.service;

import com.sy.pojo.Dept;

import java.util.List;

/**
 * Created by haswell on 2018/1/25.
 */
public interface IDeptService {
    public Dept getUserById(int id);
    public List<Dept> GetDeptList(int deptid);
}
