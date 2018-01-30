package com.sy.pojo;

/**
 * Created by haswell on 2018/1/25.
 */
public class Dept {
    private int deptId;
    private String deptNo;
    private String deptName;
    private String deptType;

    @Override
    public String toString() {
        return "Dept{" +
                "deptId=" + deptId +
                ", deptNo='" + deptNo + '\'' +
                ", deptName='" + deptName + '\'' +
                ", deptType='" + deptType + '\'' +
                '}';
    }

    public int getDeptId() {
        return deptId;
    }

    public void setDeptId(int deptId) {
        this.deptId = deptId;
    }

    public String getDeptNo() {
        return deptNo;
    }

    public void setDeptNo(String deptNo) {
        this.deptNo = deptNo;
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public String getDeptType() {
        return deptType;
    }

    public void setDeptType(String deptType) {
        this.deptType = deptType;
    }
}
