package com.example.testdemo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.testdemo.entity.employe;
import com.example.testdemo.service.employeeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/employee")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // frontend CORS
public class employeeController {

    private final employeeService employeeService;

    // Create
    @PostMapping
    public employe addEmployee(@RequestBody employe employee) {
        return employeeService.addEmployee(employee);
    }

    // Read All
    @GetMapping
    public List<employe> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    // Read One
    @GetMapping("/{id}")
    public Optional<employe> getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }

    // Update
    @PutMapping("/{id}")
    public employe updateEmployee(@PathVariable Long id, @RequestBody employe employee) {
        return employeeService.updateEmployee(id, employee);
    }

    // Delete
    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Long id) {
        return employeeService.deleteEmployee(id);
    }

    // Search by name
    @GetMapping("/search/{name}")
    public List<employe> searchEmployees(@PathVariable String name) {
        return employeeService.searchEmployees(name);
    }
}
