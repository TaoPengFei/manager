package com.sy.dao;

import com.sy.pojo.Employee;

import java.util.HashMap;
import java.util.List;

/**
 * Created by haswell on 2018/1/29.
 */
public interface IEmployeeDao {
    /**
     * 登录判断用户名密码是否存在
     * @param employee
     * @return
     */
    boolean ifExist(Employee employee);

    /**
     * 根据用户名密码查询登录人员的信息
     * @param employee
     * @return
     */
    List<Employee> getEmpInfo(Employee employee);

    /**
     * 更改用户密码
     * @param employee
     * @return
     */
    int updatepwd(Employee employee);


    /**
     * 获取查询的所有可用用户列表信息
     * @return
     */
    List<Employee> getEmpList();

    /**
     * 插入一条用户记录
     * @param map
     * @return
     */
    int insertEmp(HashMap<String,Object> map);

    /**
     * 修改用户信息
     * @param record
     * @return
     */
    int updateByPrimaryKey(Employee record);

}
