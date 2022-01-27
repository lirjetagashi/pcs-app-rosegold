package com.rosegold.pcs.service;

import com.rosegold.pcs.entity.Address;
import com.rosegold.pcs.repository.AddressRepository;
import org.springframework.stereotype.Service;

@Service
public class AddressService extends BasicServiceOperations<AddressRepository, Address> {

  public AddressService(AddressRepository repository) {
    super(repository);
  }

}
