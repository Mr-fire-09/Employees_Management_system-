package com.example.testdemo.service;

import com.example.testdemo.entity.employe;
import com.example.testdemo.repository.employeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class employeeService {

    private final employeeRepository repo;

    public employe addEmployee(employe employee) {
        return repo.save(employee);
    }

    public List<employe> getAllEmployees() {
        return repo.findAll();
    }

    public Optional<employe> getEmployeeById(Long id) {
        return repo.findById(id);
    }

    public employe updateEmployee(Long id, employe updated) {
        return repo.findById(id).map(emp -> {
            emp.setName(updated.getName());
            emp.setDepartment(updated.getDepartment());
            return repo.save(emp);
        }).orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    public String deleteEmployee(Long id) {
        repo.deleteById(id);
        return "Deleted Successfully";
    }

    public List<employe> searchEmployees(String name) {
        return repo.findByNameContainingIgnoreCase(name);
    }
}
