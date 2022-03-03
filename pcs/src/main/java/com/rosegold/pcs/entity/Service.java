package com.rosegold.pcs.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Service extends BaseEntity {

  @NotBlank
  private String name;

  @NotNull
  private BigDecimal price;

  @NotNull
  @Positive
  private Long durationInMinutes;

  @Valid
  @NotNull
  @ManyToOne
  @JoinColumn
  private Category category;

  private boolean enabled = true;

}
