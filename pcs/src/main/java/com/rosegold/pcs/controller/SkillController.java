package com.rosegold.pcs.controller;

import com.rosegold.pcs.entity.Skill;
import com.rosegold.pcs.service.SkillService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/skill")
public class SkillController extends BasicControllerOperations<SkillService, Skill>{

  public SkillController(SkillService service) {
    super(service);
  }
}
