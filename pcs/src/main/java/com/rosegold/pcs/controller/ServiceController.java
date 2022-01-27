package com.rosegold.pcs.controller;

import com.rosegold.pcs.entity.Service;
import com.rosegold.pcs.service.ServiceService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/service")
public class ServiceController extends BasicControllerOperations<ServiceService, Service>{

  public ServiceController(ServiceService service) {
    super(service);
  }
}
