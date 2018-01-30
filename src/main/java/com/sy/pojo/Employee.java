package com.sy.pojo;

import java.util.Date;

/**
 * Created by haswell on 2018/1/29.
 */
public class Employee {
    private int EmpId;
    private String EmpNo;
    private String EmpName;
    private String EmpPassword;
    private int DeptId;
    private String EmpBirth;
    private int EmpStatus1;
    private int EmpStatus2;
    private Date CreateTime;
    private Date UpdateTime;

    @Override
    public String toString() {
        return "Employee{" +
                "EmpId=" + EmpId +
                ", EmpNo='" + EmpNo + '\'' +
                ", EmpName='" + EmpName + '\'' +
                ", EmpPassword='" + EmpPassword + '\'' +
                ", DeptId=" + DeptId +
                ", EmpBirth='" + EmpBirth + '\'' +
                ", EmpStatus1=" + EmpStatus1 +
                ", EmpStatus2=" + EmpStatus2 +
                ", CreateTime=" + CreateTime +
                ", UpdateTime=" + UpdateTime +
                '}';
    }

    public int getEmpId() {
        return EmpId;
    }

    public void setEmpId(int empId) {
        EmpId = empId;
    }

    public String getEmpNo() {
        return EmpNo;
    }

    public void setEmpNo(String empNo) {
        EmpNo = empNo;
    }

    public String getEmpName() {
        return EmpName;
    }

    public void setEmpName(String empName) {
        EmpName = empName;
    }

    public String getEmpPassword() {
        return EmpPassword;
    }

    public void setEmpPassword(String empPassword) {
        EmpPassword = empPassword;
    }

    public int getDeptId() {
        return DeptId;
    }

    public void setDeptId(int deptId) {
        DeptId = deptId;
    }

    public String getEmpBirth() {
        return EmpBirth;
    }

    public void setEmpBirth(String empBirth) {
        EmpBirth = empBirth;
    }

    public int getEmpStatus1() {
        return EmpStatus1;
    }

    public void setEmpStatus1(int empStatus1) {
        EmpStatus1 = empStatus1;
    }

    public int getEmpStatus2() {
        return EmpStatus2;
    }

    public void setEmpStatus2(int empStatus2) {
        EmpStatus2 = empStatus2;
    }

    public Date getCreateTime() {
        return CreateTime;
    }

    public void setCreateTime(Date createTime) {
        CreateTime = createTime;
    }

    public Date getUpdateTime() {
        return UpdateTime;
    }

    public void setUpdateTime(Date updateTime) {
        UpdateTime = updateTime;
    }
}
