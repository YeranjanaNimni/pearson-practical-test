package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import model.Employee;
import service.EmployeeService;

@RestController
public class EmployeeController {

	@Autowired
	EmployeeService employeeService;
	

	
	@GetMapping("/rest/v2/all")
	private List<Employee> getAllEmployees(){
		
		return employeeService.getAllEmployees();
		
		
	}
	
	@GetMapping("/rest/v2/findOne/{empId}")
	private Employee getEmployee(@PathVariable("empId")int empId) {
		
		return employeeService.getEmployeeById(empId);
	}
	
	
	// for both update and create
	@PostMapping("rest/v2/addEmployee")
	private Employee createEmployee(@RequestBody Employee employee) {
		
		employeeService.CreateAemployee(employee);
		return employee;
	}
	
	@DeleteMapping("/rest/v2/delete/{empId}")
	private void deleteEmployee(@PathVariable("empId")int empId) {
		
		employeeService.deleteAemployee(empId);
	}
}
