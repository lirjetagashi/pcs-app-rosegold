package com.rosegold.pcs.repository;

import com.rosegold.pcs.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
