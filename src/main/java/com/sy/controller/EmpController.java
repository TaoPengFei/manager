package com.sy.controller;

import com.sy.pojo.Employee;
import com.sy.service.IEmployeeService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

/**
 * Created by haswell on 2018/1/29.
 */
@Controller
@RequestMapping("/employee")
public class EmpController {
    @Resource
    private IEmployeeService iEmpService;
    Employee emp = new Employee();
    @RequestMapping("/login.do")
    @ResponseBody
    public HashMap<String,Object> UserLogin(@RequestParam("name") String username, @RequestParam("password") String password) {

        System.out.println(username);
        System.out.println(password);
        emp.setEmpName(username);
        emp.setEmpPassword(password);
        boolean EmpExit = iEmpService.EmployeeLogin(emp);

        HashMap<String,Object> result = new HashMap<String,Object>();
        System.out.println(EmpExit);

        result.put("IfExit",EmpExit);
        System.out.println(result);
        return result;
    }

    @RequestMapping("/getEmpInfo.do")
    @ResponseBody
    public List<Employee> getEmpInfo(@RequestParam("name") String username, @RequestParam("password") String password) {
        emp.setEmpName(username);
        emp.setEmpPassword(password);
        List<Employee> list = iEmpService.getEmpInfo(emp);
        System.out.println(list);
        System.out.println("*************"+list.get(0).getCreateTime());
    return list;
    }


    @RequestMapping("/getEmpList.do")
    @ResponseBody
    public List<Employee> getEmpList() {
        List<Employee> list = iEmpService.getEmpList();
        System.out.println("********"+list);
        return list;
    }

    @RequestMapping("/insertEmp.do")
    @ResponseBody
    public int insertEmp() {
        Employee emp2 = new Employee();
        emp2.setEmpName("sfajsd");
        int result = iEmpService.insertEmp(emp2);
        System.out.println("********"+result);
        return result;
    }



}
