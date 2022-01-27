package com.rosegold.pcs.controller;

import com.rosegold.pcs.entity.Receipt;
import com.rosegold.pcs.service.ReceiptService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/receipt")
public class ReceiptController extends BasicControllerOperations<ReceiptService, Receipt>{

  public ReceiptController(ReceiptService service) {
    super(service);
  }

}
