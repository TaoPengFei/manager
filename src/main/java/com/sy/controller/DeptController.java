package com.sy.controller;

import com.sy.pojo.Dept;
import com.sy.pojo.User;
import com.sy.service.IDeptService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

/**
 * Created by haswell on 2018/1/25.
 */
@Controller
@RequestMapping("/dept")
public class DeptController {
    @Resource
    private IDeptService DeptService;
    Dept dept = new Dept();

    @RequestMapping("/list")
    public HashMap<String,Object> GetDeptList(@RequestParam("name") String name){
        int a = Integer.parseInt(name);
       // dept.setDeptId(a);
        List<Dept> list = this.DeptService.GetDeptList(a);
        System.out.println(list);
        HashMap<String,Object> map = new HashMap<String,Object>();
        map.put("data","deptshuju");
        return map;
    }

    @RequestMapping("/showUser")
    public String toIndex(HttpServletRequest request, Model model){
        System.out.println("开始进入");
        int deptid = 1;
        Dept dept = this.DeptService.getUserById(deptid);
        System.out.println(dept.toString());
        System.out.println(dept);
        model.addAttribute("user", dept);
        return "menu";
    }

}
