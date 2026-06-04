package com.webpage.model;

import java.util.List;
import java.util.Map;

/**
 * 个人资料模型
 */
public class Profile {
    private String name;
    private String avatar;
    private String title;
    private String bio;
    private List<String> about;
    private Map<String, String> social;
    private String location;
    private String company;

    public Profile() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public List<String> getAbout() { return about; }
    public void setAbout(List<String> about) { this.about = about; }

    public Map<String, String> getSocial() { return social; }
    public void setSocial(Map<String, String> social) { this.social = social; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
}
