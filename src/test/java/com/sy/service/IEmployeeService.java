package com.sy.service;

import com.sy.pojo.Employee;

import java.util.List;

/**
 * Created by haswell on 2018/1/29.
 */
public interface IEmployeeService {

    public boolean EmployeeLogin(Employee employee);

    public List<Employee> getEmpInfo(Employee employee);

    public int updatepwd(Employee employee);

    public List<Employee> getEmpList();

    public int insertEmp(Employee employee);


}
