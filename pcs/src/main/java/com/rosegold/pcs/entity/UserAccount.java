package com.rosegold.pcs.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.rosegold.pcs.validation.group.Create;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;
import java.time.LocalDate;

import static com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY;
import static javax.persistence.EnumType.STRING;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class UserAccount extends BaseEntity {

  @Email
  @NotBlank
  @Column(unique = true)
  private String email;

  @NotNull(groups = Create.class)
  @Size(min = 4, max = 20, groups = Create.class)
  @JsonProperty(access = WRITE_ONLY)
  private String password;

  @NotBlank
  private String firstName;

  @NotBlank
  private String lastName;

  @Past
  @NotNull
  private LocalDate dateOfBirth;

  private String phoneNumber;

  @Enumerated(STRING)
  private RoleType role;

  @Valid
  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn
  private Address address;

}
