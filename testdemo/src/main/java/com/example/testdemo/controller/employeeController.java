package com.example.testdemo.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.testdemo.entity.employe;
import com.example.testdemo.service.employeeService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor

public class employeeController {



    private final employeeService employeeService;


    @PostMapping("/employee")
    public employe postEmployee(@RequestBody employe employee) {
    
        return employeeService.postEmployee(employee);
    }
    

}
