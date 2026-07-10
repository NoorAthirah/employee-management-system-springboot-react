package net.javaguides.ems.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/employees")
@AllArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    // Build Add Employee REST API
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {
        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") long employeeId) {

    System.out.println("GET endpoint reached!");

    EmployeeDto employeeDto = employeeService.getEmployeeById(employeeId);

    return new ResponseEntity<>(employeeDto, HttpStatus.OK);
}

    // Build Get All Employees REST API
    @GetMapping
    public ResponseEntity<java.util.List<EmployeeDto>> getAllEmployees() {
        java.util.List<EmployeeDto> employees = employeeService.getAllEmployees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    // Build Update Employee REST API
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") long employeeId, @RequestBody EmployeeDto employeeDto) {
        EmployeeDto updatedEmployee = employeeService.updateEmployee(employeeId, employeeDto);
        return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
    } 
    
    // Build Delete Employee REST API
    @DeleteMapping("/{id}")
    public ResponseEntity<EmployeeDto> deleteEmployee(@PathVariable("id") long employeeId) {
        EmployeeDto deletedEmployee = employeeService.deleteEmployee(employeeId);
        return new ResponseEntity<>(deletedEmployee, HttpStatus.OK);
    }
}