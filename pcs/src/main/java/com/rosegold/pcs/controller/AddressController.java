package com.rosegold.pcs.controller;

import com.rosegold.pcs.entity.Address;
import com.rosegold.pcs.service.AddressService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/address")
public class AddressController extends BasicControllerOperations<AddressService, Address>{

  public AddressController(AddressService service) {
    super(service);
  }

}
