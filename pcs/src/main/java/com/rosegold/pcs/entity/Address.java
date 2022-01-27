package com.rosegold.pcs.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Address extends BaseEntity {

  @NotBlank
  private String line1;

  private String line2;

  @NotBlank
  private String postalCode;

  @NotBlank
  private String city;

  @NotBlank
  private String province;

  @NotBlank
  private String country;

}
