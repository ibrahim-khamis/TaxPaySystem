package com.taxsystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.taxsystem.model.User;
import com.taxsystem.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {

        this.userRepository = userRepository;

    }

    // ===========================
    // GET ALL USERS
    // ===========================

    public List<User> getAllUsers() {

        return userRepository.findAll();

    }

    // ===========================
    // FIND USER BY USERNAME
    // ===========================

    public User findByUsername(String username) {

        return userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

    }

    // ===========================
    // CREATE USER
    // ===========================

    public User createUser(User user) {

        // Check username

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {

            throw new RuntimeException("Username already exists");

        }

        // Check email

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {

            throw new RuntimeException("Email already exists");

        }

        user.setId(null);

        user.setRole("BUSINESS_OWNER");

        return userRepository.save(user);

    }

    // ===========================
    // UPDATE USER
    // ===========================

    public User updateUser(Long id, User user) {

        User existingUser = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        existingUser.setFirstName(user.getFirstName());

        existingUser.setLastName(user.getLastName());

        existingUser.setEmail(user.getEmail());

        existingUser.setPhone(user.getPhone());

        existingUser.setUsername(user.getUsername());

        existingUser.setPassword(user.getPassword());

        return userRepository.save(existingUser);

    }

    // ===========================
    // DELETE USER
    // ===========================

    public void deleteUser(Long id) {

        userRepository.deleteById(id);

    }

}