package com.rosegold.pcs.controller;

import com.rosegold.pcs.entity.Category;
import com.rosegold.pcs.service.CategoryService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/category")
public class CategoryController extends BasicControllerOperations<CategoryService, Category>{

  public CategoryController(CategoryService service) {
    super(service);
  }

}
