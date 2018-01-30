package com.sy.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.sy.dao.IUserDao;
import com.sy.pojo.User;
import com.sy.service.IUserService;

@Service("userService")
public class UserServiceImpl implements IUserService {
	
	@Resource
	private IUserDao userDao;
	
	/**
	 * ÓÃ»§µÇÂ¼
	 */
	@Override
	public boolean UserLogin(User user) {
		// TODO Auto-generated method stub
		return this.userDao.ifExist(user);
	}
	public User getUserById(int userId) {
		// TODO Auto-generated method stub
		return this.userDao.selectByPrimaryKey(userId);
	}
	@Override
	public HashMap<Object,Object> GdetUserById(int userId) {
		// TODO Auto-generated method stub
		return this.userDao.getAllUser(userId);
	}
	@Override
	public List<User> GetListById(int userId) {
		// TODO Auto-generated method stub
		return  this.userDao.getListById(userId);
	}
	
	
}
