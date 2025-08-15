package com.example.testdemo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.testdemo.entity.employe;

@Repository
public interface employeeRepository extends JpaRepository<employe, Long> {}