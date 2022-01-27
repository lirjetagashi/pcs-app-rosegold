package com.rosegold.pcs.service;

import com.rosegold.pcs.entity.Service;
import com.rosegold.pcs.repository.ServiceRepository;

@org.springframework.stereotype.Service
public class ServiceService extends BasicServiceOperations<ServiceRepository, Service>{

  public ServiceService(ServiceRepository repository) {
    super(repository);
  }

}
