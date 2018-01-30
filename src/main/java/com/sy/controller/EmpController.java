package com.sy.controller;

import com.sy.pojo.Employee;
import com.sy.service.IEmployeeService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public HashMap<String,Object> UserLogin(@RequestParam("name") String username, @RequestParam("password") String password,HttpSession session) {

        emp.setEmpName(username);
        emp.setEmpPassword(password);
        boolean EmpExit = iEmpService.EmployeeLogin(emp);
        List<Employee> list = iEmpService.getEmpInfo(emp);
        emp.setEmpId(list.get(0).getEmpId());
        emp.setDeptId(list.get(0).getDeptId());
        emp.setEmpNo(list.get(0).getEmpNo());
        HashMap<String,Object> result = new HashMap<String,Object>();
        System.out.println("存入到对象的数据"+emp);
        result.put("IfExit",EmpExit+"");
        session.setAttribute("User", emp);
        return result;
    }

    /**
     * 将用户的信息放入到employee
     * @return
     */
    @RequestMapping("/getSessionUsername.do")
    @ResponseBody
    public Map<String, Object> getSessionUsername(){
        Map<String, Object> result = new HashMap<String, Object>();
        if(emp == null){
            result.put("code",0);
        }else{
            result.put("code", emp);
        }
        System.out.println(emp);
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
