package com.rosegold.pcs.service;

import com.rosegold.pcs.entity.Receipt;
import com.rosegold.pcs.repository.ReceiptRepository;
import org.springframework.stereotype.Service;

@Service
public class ReceiptService extends BasicServiceOperations<ReceiptRepository, Receipt>{

  public ReceiptService(ReceiptRepository repository) {
    super(repository);
  }


}
