package com.rosegold.pcs.service;

import com.rosegold.pcs.entity.Category;
import com.rosegold.pcs.repository.CategoryRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoryService extends BasicServiceOperations<CategoryRepository, Category> {

  public CategoryService(CategoryRepository repository) {
    super(repository);
  }

}
