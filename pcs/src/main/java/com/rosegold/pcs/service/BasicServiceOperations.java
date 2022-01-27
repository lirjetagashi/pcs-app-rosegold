package com.rosegold.pcs.service;

import com.rosegold.pcs.entity.BaseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@RequiredArgsConstructor
public abstract class BasicServiceOperations<R extends JpaRepository<E, Long>, E extends BaseEntity> {

  protected final R repository;

  public E save(E entity) {
    return repository.save(entity);
  }

  public E findById(Long id) {
    return repository.findById(id).orElse(null);
  }

  public List<E> findAll() {
    return repository.findAll();
  }

  public void deleteById(Long id) {
    repository.deleteById(id);
  }

}
