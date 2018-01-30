package com.sy.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.json.JsonObject;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSON;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sy.pojo.User;
import com.sy.service.IUserService;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/user")
public class UserController {
	@Resource
	private IUserService userService;

	/**
	 *????????true
	 * @return
     */
	@RequestMapping("/login.do")
	@ResponseBody
	public HashMap<String,Object> UserLogin(@RequestParam("name") String username,@RequestParam("password") String password) {
		System.out.println("????:"+username);
		System.out.println("???:"+password);

		User user = new User();
		user.setId(1);
		user.setUserName("shuhx");
		user.setPassword("3044");
		boolean ifexit = this.userService.UserLogin(user);
		System.out.println(ifexit);
		HashMap<String,Object> result = new HashMap<String,Object>();
		result.put("data","deptshuju");
		result.put("ifexit",ifexit+"");
		System.out.println("lasdkadhjafjgwfjsfjsefjsgfs");
		//result.put("ifexit",ifexit);
//		JSONObject jsonObject = JSONObject.fromObject(result);
//		System.out.println("???????" + jsonObject);
		return result;
		
	}
	
	@RequestMapping("/showUser")
	public String toIndex(HttpServletRequest request,Model model){
		System.out.println("????");
		int userId = 2;
		User user = this.userService.getUserById(userId);
		System.out.println(user.toString());
		System.out.println(user);
		model.addAttribute("user", user);
		return "menu";
	}
	
	@RequestMapping("/lsUser")
	public String getIndex(HttpServletRequest request,Model model){
		List list = new ArrayList();
		System.out.println("????");
		int userId = 4;
		HashMap user = this.userService.GdetUserById(userId);
		System.out.println(user.toString());
		System.out.println(user);
		model.addAttribute("user", user);
		return "showUser";
	}

	/**
	 * ??????
	 * @param request
	 * @param model
     * @return
     */
	@RequestMapping("/ksUser")
	public String getListIndex(HttpServletRequest request,Model model){
		List list = new ArrayList();
		System.out.println("??????");
		int userId = 1;
		List<User> user = this.userService.GetListById(userId);
		System.out.println(user.toString());
		//model.addAttribute("user", user);
		return "showUser";
	}
}
