package com.rosegold.pcs.service;

import com.rosegold.pcs.entity.Skill;
import com.rosegold.pcs.repository.SkillRepository;
import org.springframework.stereotype.Service;

@Service
public class SkillService extends BasicServiceOperations<SkillRepository, Skill>{

  public SkillService(SkillRepository repository) {
    super(repository);
  }

}
