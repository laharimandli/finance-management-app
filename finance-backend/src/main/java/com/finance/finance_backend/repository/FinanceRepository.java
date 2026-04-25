package com.finance.finance_backend.repository;

import com.finance.finance_backend.entity.FinanceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinanceRepository extends JpaRepository<FinanceRecord, Long> {

}