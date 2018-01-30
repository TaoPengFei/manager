package com.sy.dao;

import java.util.HashMap;
import java.util.List;

import com.sy.pojo.User;

public interface IUserDao {
	boolean ifExist(User user);
	
    int deleteByPrimaryKey(Integer id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
    
    HashMap<Object,Object> getAllUser(Integer id);
    List<User> getListById(Integer id);
}