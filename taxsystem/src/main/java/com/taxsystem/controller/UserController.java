package com.taxsystem.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taxsystem.model.User;
import com.taxsystem.service.UserService;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){

        return ResponseEntity.ok(userService.getAllUsers());

    }

    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user){

        User savedUser = userService.createUser(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);

    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id,@RequestBody User user){

        return ResponseEntity.ok(userService.updateUser(id,user));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){

        userService.deleteUser(id);

        return ResponseEntity.ok("User deleted successfully");

    }

}