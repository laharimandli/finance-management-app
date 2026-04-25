package com.finance.finance_backend.service;

import com.finance.finance_backend.entity.FinanceRecord;
import com.finance.finance_backend.exception.ResourceNotFoundException;
import com.finance.finance_backend.repository.FinanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FinanceService {

    private final FinanceRepository financeRepository;

    public List<FinanceRecord> getAllRecords(String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
        return financeRepository.findAll(sort);
    }

    public FinanceRecord getRecordById(Long id) {
        return financeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Record not found with id: " + id));
    }

    public FinanceRecord createRecord(FinanceRecord record) {
        record.setCreatedDate(LocalDateTime.now());
        record.setCreatedBy("admin");
        record.setEditedDate(null);
        record.setEditedBy(null);
        return financeRepository.save(record);
    }

    public FinanceRecord updateRecord(Long id, FinanceRecord updatedRecord) {
        FinanceRecord existing = getRecordById(id);
        existing.setUserName(updatedRecord.getUserName());
        existing.setType(updatedRecord.getType());
        existing.setCategory(updatedRecord.getCategory());
        existing.setAmount(updatedRecord.getAmount());
        existing.setDescription(updatedRecord.getDescription());
        existing.setDate(updatedRecord.getDate());
        existing.setEditedDate(LocalDateTime.now());
        existing.setEditedBy("admin");
        return financeRepository.save(existing);
    }

    public void deleteRecord(Long id) {
        getRecordById(id);
        financeRepository.deleteById(id);
    }
}