package com.sy.service;

import com.sy.pojo.User;

import java.util.HashMap;
import java.util.List;

public interface IUserService {
	public boolean UserLogin(User user);
	public User getUserById(int userId);
	public HashMap<Object, Object> GdetUserById(int userId);
	
	public List<User> GetListById(int userId);
}
