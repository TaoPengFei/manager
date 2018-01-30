package com.sy.service;

import java.util.HashMap;
import java.util.List;

import com.sy.pojo.User;

public interface IUserService {
	public boolean UserLogin(User user);
	public User getUserById(int userId);
	public HashMap<Object, Object> GdetUserById(int userId);
	
	public List<User> GetListById(int userId);
}
