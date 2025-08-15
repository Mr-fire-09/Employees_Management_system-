package com.example.testdemo.service;

import org.springframework.stereotype.Service;

import com.example.testdemo.entity.employe;
import com.example.testdemo.repository.employeeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class employeeService {


    private final employeeRepository employeeRepository;

    public employe postEmployee(employe employee) {
        return employeeRepository.save(employee);
    }

}
