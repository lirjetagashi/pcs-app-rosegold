package com.rosegold.pcs.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Category extends BaseEntity {

  @NotBlank
  private String name;

  @JsonIgnoreProperties("category")
  @OneToMany(mappedBy = "category")
  private List<Service> services;

}
